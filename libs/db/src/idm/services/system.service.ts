/**
 * --------------------------------------------------------
 * @file Service Layer: System
 * @description Service layer should be used for data manipulation on/from payload
 * @author Antonio Marasco
 * --------------------------------------------------------
 */
import { Injectable } from '@nestjs/common';
import { AllSystemFilters } from '../dal/models/types';
import { SystemInput, SystemOutput } from '../interfaces';
import * as DAL from '../dal/models/system.dal';

@Injectable()
export class SystemService {
  all(filters: AllSystemFilters): Promise<SystemOutput[]> {
    const queryFilters = {
      // attributes: ['id', 'title', 'sortOrder', 'statusId', 'description', 'icon'],
      ...filters
    };
    return DAL.all(queryFilters);
  }

  byId(id: number, filters?: AllSystemFilters): Promise<SystemOutput> {
    return DAL.byId(id, filters);
  }

  create(payload: SystemInput): Promise<SystemOutput> {
    return DAL.create(payload);
  }

  deleteById(id: number): Promise<boolean> {
    return DAL.deleteById(id);
  }

  paginate(filters: AllSystemFilters): Promise<{ rows: SystemOutput[]; count: number }> {
    return DAL.paginate(filters);
  }

  update(id: number, payload: Partial<SystemInput>): Promise<SystemOutput> {
    return DAL.update(id, payload);
  }
}
