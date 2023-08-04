/**
 * --------------------------------------------------------
 * @file Service Layer: User
 * @description Service layer should be used for data manipulation on/from payload
 * @author Antonio Marasco
 * --------------------------------------------------------
 */
import { Injectable } from '@nestjs/common';
import { AllUserFilters } from '../dal/models/types';
import { UserInput, UserOutput } from '../interfaces';
import * as DAL from '../dal/models/user.dal';

@Injectable()
export class ApplicationService {
  all(filters: AllUserFilters): Promise<UserOutput[]> {
    const queryFilters = {
      // attributes: ['id', 'title', 'sortOrder', 'statusId', 'description', 'icon'],
      ...filters
    };
    return DAL.all(queryFilters);
  }

  byId(id: number, filters?: AllUserFilters): Promise<UserOutput> {
    return DAL.byId(id, filters);
  }

  create(payload: UserInput): Promise<UserOutput> {
    return DAL.create(payload);
  }

  deleteById(id: number): Promise<boolean> {
    return DAL.deleteById(id);
  }

  paginate(filters: AllUserFilters): Promise<{ rows: UserOutput[]; count: number }> {
    return DAL.paginate(filters);
  }

  update(id: number, payload: Partial<UserInput>): Promise<UserOutput> {
    return DAL.update(id, payload);
  }
}
