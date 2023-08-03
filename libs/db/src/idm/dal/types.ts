/* eslint-disable @typescript-eslint/no-empty-interface */
import { FindAttributeOptions, Includeable } from 'sequelize';

interface ListFilters {
  limit?: number;
  offset?: number;
  isDeleted?: boolean;
  includeDeleted?: boolean;
  status?: string;
  include?: Includeable | Includeable[];
  attributes?: FindAttributeOptions;
  orderBySortOrder?: boolean;
}

export interface AllEnvironmentFilters extends ListFilters {}
export interface AllApplicationFilters extends ListFilters {}
export interface AllLookupFilters extends ListFilters {}
export interface AllAccessTokenFilters extends ListFilters {}
export interface AllSystemFilters extends ListFilters {}
export interface AllApiClientFilters extends ListFilters {}
export interface AllUserFilters extends ListFilters {}
