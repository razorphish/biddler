/**
 * --------------------------------------------------------
 * @file Service Layer: ApiClientService
 * @description Service layer should be used for data manipulation on/from payload
 * @author Antonio Marasco
 * --------------------------------------------------------
 */
import { Injectable } from '@nestjs/common';
import { AllApiClientFilters } from '../dal/models/types';
import { ApiClientInput, ApiClientOutput } from '../interfaces';
import * as DAL from '../dal/models/apiClient.dal';

@Injectable()
export class ApiClientService {
  all(filters: AllApiClientFilters): Promise<ApiClientOutput[]> {
    const queryFilters = {
      // attributes: ['id', 'title', 'sortOrder', 'statusId', 'description', 'icon'],
      ...filters
    };
    return DAL.all(queryFilters);
  }

  byId(id: number, filters?: AllApiClientFilters): Promise<ApiClientOutput> {
    return DAL.byId(id, filters);
  }

  create(payload: ApiClientInput): Promise<ApiClientOutput> {
    return DAL.create(payload);
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
