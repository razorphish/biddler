/**
 * --------------------------------------------------------
 * @file Service Layer: AccountUser
 * @description Service layer should be used for data manipulation on/from payload
 * @author Antonio Marasco
 * --------------------------------------------------------
 */
import { Injectable } from '@nestjs/common';
import { AllAccountUserFilters } from '../dal/models/types';
import { AccountUser, AccountUserInput } from '../interfaces';
import * as DAL from '../dal/models/accountUser.dal';

@Injectable()
export class AccountUserService {
  all(filters: AllAccountUserFilters): Promise<AccountUser[]> {
    const queryFilters = {
      attributes: ['id', 'title', 'sortOrder', 'statusId', 'description', 'icon'],
      includeDeleted: false,
      ...filters
    };
    return DAL.all(queryFilters);
  }

  byId(accountId: number, userId: number): Promise<AccountUser> {
    return DAL.byId(accountId, userId);
  }

  create(payload: AccountUserInput): Promise<AccountUser> {
    return DAL.create(payload);
  }

  deleteById(accountId: number, userId: number): Promise<boolean> {
    return DAL.deleteById(accountId, userId);
  }

  paginate(filters: AllAccountUserFilters): Promise<{ rows: AccountUser[]; count: number }> {
    return DAL.paginate(filters);
  }

  update(
    accountId: number,
    userId: number,
    payload: Partial<AccountUserInput>
  ): Promise<AccountUser> {
    return DAL.update(accountId, userId, payload);
  }
}
