/* eslint-disable @typescript-eslint/no-empty-interface */
import { FindAttributeOptions } from 'sequelize';

interface ListFilters {
  limit?: number;
  offset?: number;
  isDeleted?: boolean;
  includeDeleted?: boolean;
  status?: string;
  attributes?: FindAttributeOptions;
}

export interface AllAddressFilters extends ListFilters {
  typeId?: string;
}

export interface AllAccountFilters extends ListFilters {}
export interface AllAccountUserFilters extends ListFilters {
  checkEffectiveDate?: boolean;
}
export interface AllAccountUserRoleFilters extends ListFilters {
  checkEffectiveDate?: boolean;
}
export interface AllAddressTypeFilters extends ListFilters {}
export interface AllPermissionFilters extends ListFilters {}
export interface AllRoleFilters extends ListFilters {}
export interface AllRolePermissionFilters extends ListFilters {}
export interface AllStatusFilters extends ListFilters {}
export interface AllUserFilters extends ListFilters {}
