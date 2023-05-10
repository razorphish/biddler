import { Order } from 'sequelize';

export interface PaginationArgs {
  limit?: number;
  offset?: number;
  filters?: any;
  order?: Order;
  isDeleted?: boolean;
  includeDeleted?: boolean;
}

export interface PaginationFindAllOutput<T> {
  count: number;
  rows: T[];
  totalCount: number;
}
