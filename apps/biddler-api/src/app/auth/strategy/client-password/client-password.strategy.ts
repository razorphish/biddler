/* eslint-disable @nx/enforce-module-boundaries */
import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-oauth2-client-password';
import { ClientPasswordAuthModuleOptions, ClientPasswordAuthResult } from './client-password.types';
import { ApiClientService } from 'libs/db/src/idm/services';
import { compareSecretKeys } from 'libs/db/src/common/helpers/crypt.helper';
import { merge } from 'lodash';
import { CLIENTPASSWORD_HYBRID_AUTH_OPTIONS } from './client-password.constants';
import { mapLookup } from '../../../../common/helpers/util/lookup.util';

@Injectable()
export class ClientPasswordAuthStrategy extends PassportStrategy(
  Strategy,
  'oauth2-client-password'
) {
  constructor(
    private readonly _service: ApiClientService,
    @Inject(CLIENTPASSWORD_HYBRID_AUTH_OPTIONS) options: ClientPasswordAuthModuleOptions
  ) {
    super(
      merge(options, {
        passReqToCallback: true
      }) as ClientPasswordAuthModuleOptions
    );
  }

  async validate(request: any, clientID: string, clientSecret: string, issued: any) {
    Logger.log('[Strategy:ClientPassword] validate()');

    //     {
    //   error: 'invalid_request',
    //   message: 'invalid_request: Missing "clientID" parameter',
    //   statusCode: 400
    // } as ExchangeError,
    Logger.log('[Strategy:ClientPassword] validate(): Checking for ClientID');
    if (!clientID) {
      return issued(
        new BadRequestException('Missing "clientID" parameter', {
          description: 'invalid_request',
          cause: 'ClientID missing from request body'
        }),
        null,
        null
      );
    }

    Logger.log('[Strategy:ClientPassword] validate(): Check for grant type');
    if (!request.body['grant_type']) {
      return issued(
        new BadRequestException('Missing "grant_type" parameter', {
          description: 'invalid_request',
          cause: 'Grant type missing from request body'
        }),
        null,
        null
      );
    }

    // Get Api client
    const apiClient = await this._service.byClientID(clientID, {
      attributes: {
        include: ['clientSecretHash', 'grantTypeId', 'statusId', 'scopes']
      }
    });

    Logger.log('[Strategy:ClientPassword] validate(): Make sure client exists in system');
    if (!apiClient) {
      return issued(
        new NotFoundException('Client not found in system', {
          description: 'invalid_client',
          cause: 'Grant type missing from request body'
        }),
        null,
        null
      );
    }

    // Status check
    Logger.log('[Strategy:ClientPassword] validate(): Determine client is active');
    if (!mapLookup(apiClient.statusId, 'active')) {
      return issued(
        new BadRequestException(`Client has either expired or has been suspended`, {
          description: 'invalid_client',
          cause: 'Client is not active in the system'
        }),
        null,
        null
      );
    }

    // Grant type match
    Logger.log(
      '[Strategy:ClientPassword] validate(): Ensure grant type matches requested grant type'
    );
    if (!mapLookup(apiClient.grantTypeId, request.body['grant_type'])) {
      return issued(
        new BadRequestException(
          `invalid_grant: Grant type '${request.body['grant_type']}' not supported`,
          {
            description: 'invalid_grant',
            cause: 'Grant type of client not supported by requested grant type'
          }
        ),
        null,
        null
      );
    }

    // TODO:
    // Check scope
    // const requestScopes = typeof request.scopes === 'string' ? [request.scopes] : request.scopes;

    // Check the password
    Logger.log('[Strategy:ClientPassword] validate(): Validate Credentials');
    const passwordCheck = await compareSecretKeys(clientSecret, apiClient.clientSecretHash);
    if (!passwordCheck) {
      return issued(
        new UnauthorizedException(`Access denied`, {
          description: 'invalid_client',
          cause: 'Invalid password'
        }),
        null,
        null
      );
    }

    Logger.log('[Strategy:ClientPassword] validate(): OK SUCCESS');
    return issued(
      null,
      {
        clientID: clientID,
        name: apiClient.applicationName,
        user: request['user']
      } as ClientPasswordAuthResult,
      request
    );
  }
}
