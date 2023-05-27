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
