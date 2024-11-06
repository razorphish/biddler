/**
 * --------------------------------------------------------
 * @file Service Layer: LookupService
 * @description Service layer should be used for data manipulation on/from payload
 * @author Antonio Marasco
 * --------------------------------------------------------
 */
import { Injectable } from '@nestjs/common';
import { AllLookupFilters } from '../dal/models/types';
import { LookupInput, LookupOutput } from '../interfaces';
import * as DAL from '../dal/models/lookup.dal';

@Injectable()
export class LookupService {
  all(filters: AllLookupFilters): Promise<LookupOutput[]> {
    const queryFilters = {
      // attributes: ['id', 'title', 'sortOrder', 'statusId', 'description', 'icon'],
      ...filters
    };
    return DAL.all(queryFilters);
  }

  byId(id: number, filters?: AllLookupFilters): Promise<LookupOutput> {
    return DAL.byId(id, filters);
  }

  create(payload: LookupInput): Promise<LookupOutput> {
    return DAL.create(payload);
  }

  deleteById(id: number): Promise<boolean> {
    return DAL.deleteById(id);
  }

  paginate(filters: AllLookupFilters): Promise<{ rows: LookupOutput[]; count: number }> {
    return DAL.paginate(filters);
  }

  update(id: number, payload: Partial<LookupInput>): Promise<LookupOutput> {
    return DAL.update(id, payload);
  }
}
