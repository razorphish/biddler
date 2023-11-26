/* eslint-disable @nx/enforce-module-boundaries */
import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-oauth2-client-password';
import { ClientPasswordAuthResult } from './client-password.types';
import { ApiClientService } from 'libs/db/src/idm/services';
import { compareSecretKeys } from 'libs/db/src/common/helpers/crypt.helper';
import { ExchangeError } from '../../../../common/interfaces/error.interface';

@Injectable()
export class ClientPasswordAuthStrategy extends PassportStrategy(
  Strategy,
  'oauth2-client-password'
) {
  constructor(private readonly _service: ApiClientService) {
    super();
  }

  async validate(clientID: string, clientSecret: string, done: any) {
    Logger.log('*** validate [Strategy:ClientPassword]');

    if (!clientID) {
      return done(
        {
          message: 'invalid_request',
          error: 'Client ID does not exist',
          statusCode: 400
        } as ExchangeError,
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

    if (!apiClient) {
      done(
        {
          message: 'invalid_client',
          statusCode: 404
        } as ExchangeError,
        null,
        null
      );
    }

    // TODO:
    // Check grant tyupes
    // Check scope
    // Check if client is valid (active)

    // Check the password
    const passwordCheck = await compareSecretKeys(clientSecret, apiClient.clientSecretHash);
    if (!passwordCheck) {
      return done(
        {
          message: 'invalid_client',
          statusCode: 401
        } as ExchangeError,
        null,
        null
      );
    }

    return done(null, {
      clientID: clientID,
      name: apiClient.applicationName
    } as ClientPasswordAuthResult);
  }
}
