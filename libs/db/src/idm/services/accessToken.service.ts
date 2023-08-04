/**
 * --------------------------------------------------------
 * @file Service Layer: Access Token
 * @description Service layer should be used for data manipulation on/from payload
 * @author Antonio Marasco
 * --------------------------------------------------------
 */
import { Injectable } from '@nestjs/common';
import { AllAccessTokenFilters } from '../dal/models/types';
import { AccessTokenInput, AccessTokenOutput } from '../interfaces';
import * as DAL from '../dal/models/accessToken.dal';

@Injectable()
export class AccessTokenService {
  all(filters: AllAccessTokenFilters): Promise<AccessTokenOutput[]> {
    const queryFilters = {
      // attributes: ['id', 'title', 'sortOrder', 'statusId', 'description', 'icon'],
      includeDeleted: false,
      ...filters
    };
    return DAL.all(queryFilters);
  }

  byId(id: number, filters?: AllAccessTokenFilters): Promise<AccessTokenOutput> {
    return DAL.byId(id, filters);
  }

  create(payload: AccessTokenInput): Promise<AccessTokenOutput> {
    return DAL.create(payload);
  }

  deleteById(id: number): Promise<boolean> {
    return DAL.deleteById(id);
  }

  paginate(filters: AllAccessTokenFilters): Promise<{ rows: AccessTokenOutput[]; count: number }> {
    return DAL.paginate(filters);
  }

  update(id: number, payload: Partial<AccessTokenInput>): Promise<AccessTokenOutput> {
    return DAL.update(id, payload);
  }
}
