/**
 * --------------------------------------------------------
 * @file Service Layer: Environment
 * @description Service layer should be used for data manipulation on/from payload
 * @author Antonio Marasco
 * --------------------------------------------------------
 */
import { Injectable } from '@nestjs/common';
import { AllEnvironmentFilters } from '../dal/models/types';
import { EnvironmentInput, EnvironmentOutput } from '../interfaces';
import * as DAL from '../dal/models/environment.dal';

@Injectable()
export class EnvironmentService {
  all(filters: AllEnvironmentFilters): Promise<EnvironmentOutput[]> {
    const queryFilters = {
      // attributes: ['id', 'title', 'sortOrder', 'statusId', 'description', 'icon'],
      ...filters
    };
    return DAL.all(queryFilters);
  }

  byId(id: number, filters?: AllEnvironmentFilters): Promise<EnvironmentOutput> {
    return DAL.byId(id, filters);
  }

  create(payload: EnvironmentInput): Promise<EnvironmentOutput> {
    return DAL.create(payload);
  }

  deleteById(id: number): Promise<boolean> {
    return DAL.deleteById(id);
  }

  paginate(filters: AllEnvironmentFilters): Promise<{ rows: EnvironmentOutput[]; count: number }> {
    return DAL.paginate(filters);
  }

  update(id: number, payload: Partial<EnvironmentInput>): Promise<EnvironmentOutput> {
    return DAL.update(id, payload);
  }
}
