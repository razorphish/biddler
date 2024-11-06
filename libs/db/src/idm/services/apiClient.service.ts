/**
 * --------------------------------------------------------
 * @file Service Layer: ApiClientService
 * @description Service layer should be used for data manipulation on/from payload
 * @author Antonio Marasco
 * --------------------------------------------------------
 */
import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { AllApiClientFilters } from '../dal/models/types';
import { ApiClientInput, ApiClientOutput } from '../interfaces';
import * as DAL from '../dal/models/apiClient.dal';
import {
  compareSecretKeys,
  generateRandomID,
  generateSecretKeyWithHash
} from '../../common/helpers/crypt.helper';
import { mapLookup } from '../../common/helpers/util.hellper';
import { AuthenticateApiClientDTO } from '../dto/apiClient.dto';
import { SystemIssuer } from '../models';

@Injectable()
export class ApiClientService {
  all(filters: AllApiClientFilters): Promise<ApiClientOutput[]> {
    const queryFilters = {
      // attributes: ['id', 'title', 'sortOrder', 'statusId', 'description', 'icon'],
      ...filters
    };
    return DAL.all(queryFilters);
  }

  async authenticate(
    clientID: string,
    clientSecret: string,
    grantType: string,
    request?: Request
  ): Promise<AuthenticateApiClientDTO> {
    Logger.log('[Strategy:ClientPassword] authenticate(): Checking for ClientID');
    if (!clientID) {
      return {
        error: new BadRequestException('Missing "clientID" parameter', {
          description: 'invalid_request'
        })
      };
    }

    Logger.log('[Strategy:ClientPassword] authenticate(): Check for grant type');
    if (!grantType) {
      return {
        error: new BadRequestException('Missing "grant_type" parameter', {
          description: 'invalid_request'
        })
      };
    }

    // Get Api client
    const apiClient = await DAL.byClientID(clientID, {
      attributes: {
        include: ['clientSecretHash', 'grantTypeId', 'statusId', 'scopes']
      }
    });

    Logger.log('[Strategy:ClientPassword] authenticate(): Make sure client exists in system');
    if (!apiClient) {
      return {
        error: new NotFoundException('Client not found in system', {
          description: 'invalid_client'
        })
      };
    }

    // Status check
    Logger.log('[Strategy:ClientPassword] authenticate(): Determine client is active');
    if (!mapLookup(apiClient.statusId, 'active')) {
      return {
        error: new BadRequestException(`Client has either expired or has been suspended`, {
          description: 'invalid_client'
        })
      };
    }

    // Grant type match
    Logger.log(
      '[Strategy:ClientPassword] authenticate(): Ensure grant type matches requested grant type'
    );
    if (!(apiClient.grants.indexOf(grantType) > -1)) {
      return {
        error: new BadRequestException(`invalid_grant: Grant type '${grantType}' not supported`, {
          description: 'invalid_grant'
        })
      };
    }

    // TODO:
    // Check scope

    // Check the password
    Logger.log('[Strategy:ClientPassword] authenticate(): Validate Credentials');
    const passwordCheck = await compareSecretKeys(clientSecret, apiClient.clientSecretHash);
    if (!passwordCheck) {
      return {
        error: new UnauthorizedException(`Access denied`, {
          description: 'invalid_client'
        })
      };
    }

    Logger.log('[Strategy:ClientPassword] authenticate(): OK SUCCESS');
    return {
      user: {
        clientID: clientID,
        name: apiClient.applicationName
      },
      info: request
    };
  }

  byId(id: number, filters?: AllApiClientFilters): Promise<ApiClientOutput> {
    return DAL.byId(id, filters);
  }

  byClientID(clientID: string, filters?: AllApiClientFilters): Promise<ApiClientOutput> {
    filters = filters || {
      include: [
        {
          model: SystemIssuer,
          as: 'systemIssuer'
        }
      ]
    };
    return DAL.byClientID(clientID, filters);
  }

  async create(payload: ApiClientInput): Promise<ApiClientOutput> {
    payload.clientID = generateRandomID();

    // Key with secret
    const { key, hash, salt } = generateSecretKeyWithHash();

    // No real need to store the salt here since its appended to hash
    // but it is simply for ease of access
    (payload.salt = salt), (payload.clientSecret = key), (payload.clientSecretHash = hash);
    const apiClient = await DAL.create(payload);
    apiClient.key = key;
    return apiClient;
  }

  deleteById(id: number): Promise<boolean> {
    return DAL.deleteById(id);
  }

  paginate(filters: AllApiClientFilters): Promise<{ rows: ApiClientOutput[]; count: number }> {
    return DAL.paginate(filters);
  }

  update(id: number, payload: Partial<ApiClientInput>): Promise<ApiClientOutput> {
    return DAL.update(id, payload);
  }
}
