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
import * as crypter from '../../common/helpers/crypt.helper';

@Injectable()
export class UserService {
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
    if (!payload.salt) {
      payload.salt = crypter.generateSaltSync();
    }
    return DAL.create(payload);
  }

  deleteById(id: number): Promise<boolean> {
    return DAL.deleteById(id);
  }

  findOrCreate(payload: UserInput): Promise<UserOutput> {
    if (!payload.salt) {
      payload.salt = crypter.generateSaltSync();
    }
    return DAL.findOrCreate(payload);
  }

  paginate(filters: AllUserFilters): Promise<{ rows: UserOutput[]; count: number }> {
    return DAL.paginate(filters);
  }

  update(id: number, payload: Partial<UserInput>): Promise<UserOutput> {
    return DAL.update(id, payload);
  }
}
