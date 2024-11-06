/**
 * --------------------------------------------------------
 * @file Service Layer: AccountUserRole
 * @description Service layer should be used for data manipulation on/from payload
 * @author Antonio Marasco
 * --------------------------------------------------------
 */
import { Injectable } from '@nestjs/common';
import { AllAccountUserRoleFilters } from '../dal/models/types';
import { AccountUserRole, AccountUserRoleInput } from '../interfaces';
import * as DAL from '../dal/models/accountUserRole.dal';

@Injectable()
export class AccountUserRoleService {
  all(filters: AllAccountUserRoleFilters): Promise<AccountUserRole[]> {
    const queryFilters = {
      attributes: ['id', 'title', 'sortOrder', 'statusId', 'description', 'icon'],
      includeDeleted: false,
      ...filters
    };
    return DAL.all(queryFilters);
  }

  byId(accountId: number, userId: number, roleId: string): Promise<AccountUserRole> {
    return DAL.byId(accountId, userId, roleId);
  }

  create(payload: AccountUserRoleInput): Promise<AccountUserRole> {
    return DAL.create(payload);
  }

  deleteById(accountId: number, userId: number, roleId: string): Promise<boolean> {
    return DAL.deleteById(accountId, userId, roleId);
  }

  paginate(
    filters: AllAccountUserRoleFilters
  ): Promise<{ rows: AccountUserRole[]; count: number }> {
    return DAL.paginate(filters);
  }

  update(
    accountId: number,
    userId: number,
    roleId: string,
    payload: Partial<AccountUserRoleInput>
  ): Promise<AccountUserRole> {
    return DAL.update(accountId, userId, roleId, payload);
  }
}
