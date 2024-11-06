/**
 * --------------------------------------------------------
 * @file Service Layer: Account
 * @description Service layer should be used for data manipulation on/from payload
 * @author Antonio Marasco
 * --------------------------------------------------------
 */
import { Injectable } from '@nestjs/common';
import { AllAccountFilters } from '../dal/models/types';
import { Account, AccountInput } from '../interfaces';
import * as DAL from '../dal/models/account.dal';

@Injectable()
export class AccountService {
  all(filters: AllAccountFilters): Promise<Account[]> {
    const queryFilters = {
      attributes: ['id', 'title', 'sortOrder', 'statusId', 'description', 'icon'],
      includeDeleted: false,
      ...filters
    };
    return DAL.all(queryFilters);
  }

  byId(id: number): Promise<Account> {
    return DAL.byId(id);
  }

  create(payload: AccountInput): Promise<Account> {
    return DAL.create(payload);
  }

  deleteById(id: number): Promise<boolean> {
    return DAL.deleteById(id);
  }

  paginate(filters: AllAccountFilters): Promise<{ rows: Account[]; count: number }> {
    return DAL.paginate(filters);
  }

  update(id: number, payload: Partial<AccountInput>): Promise<Account> {
    return DAL.update(id, payload);
  }
}
