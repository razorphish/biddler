/**
 * --------------------------------------------------------
 * @file Service Layer: Lookup
 * @description Service layer should be used for data manipulation on/from payload
 * @author Antonio Marasco
 * --------------------------------------------------------
 */
import { Injectable } from '@nestjs/common';
import { AllLookupFilters } from '../dal/models/types';
import { Lookup, LookupInput } from '../interfaces';
import * as DAL from '../dal/models/lookup.dal';

@Injectable()
export class LookupService {
  all(filters: AllLookupFilters): Promise<Lookup[]> {
    const queryFilters = {
      attributes: ['id', 'code', 'groupName', 'sortOrder', 'title', 'description'],
      includeDeleted: false,
      ...filters
    };
    return DAL.all(queryFilters);
  }

  byId(id: string, group: string): Promise<Lookup> {
    return DAL.byId(id, group);
  }

  create(payload: LookupInput): Promise<Lookup> {
    return DAL.create(payload);
  }

  deleteById(id: string): Promise<boolean> {
    return DAL.deleteById(id);
  }

  update(id: string, payload: Partial<LookupInput>): Promise<Lookup> {
    return DAL.update(id, payload);
  }
}
