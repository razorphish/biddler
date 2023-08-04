/**
 * --------------------------------------------------------
 * @file Service Layer: Application
 * @description Service layer should be used for data manipulation on/from payload
 * @author Antonio Marasco
 * --------------------------------------------------------
 */
import { Injectable } from '@nestjs/common';
import { AllApplicationFilters } from '../dal/models/types';
import { ApplicationInput, ApplicationOutput } from '../interfaces';
import * as DAL from '../dal/models/application.dal';

@Injectable()
export class ApplicationService {
  all(filters: AllApplicationFilters): Promise<ApplicationOutput[]> {
    const queryFilters = {
      // attributes: ['id', 'title', 'sortOrder', 'statusId', 'description', 'icon'],
      ...filters
    };
    return DAL.all(queryFilters);
  }

  byId(id: number, filters?: AllApplicationFilters): Promise<ApplicationOutput> {
    return DAL.byId(id, filters);
  }

  create(payload: ApplicationInput): Promise<ApplicationOutput> {
    return DAL.create(payload);
  }

  deleteById(id: number): Promise<boolean> {
    return DAL.deleteById(id);
  }

  paginate(filters: AllApplicationFilters): Promise<{ rows: ApplicationOutput[]; count: number }> {
    return DAL.paginate(filters);
  }

  update(id: number, payload: Partial<ApplicationInput>): Promise<ApplicationOutput> {
    return DAL.update(id, payload);
  }
}
