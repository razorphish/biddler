import { FindAttributeOptions, Order } from 'sequelize';

interface ListFilters {
  limit?: number;
  offset?: number;
  status?: string;
  attribrutes?: FindAttributeOptions;
  order?: Order;
}

export interface AllQALevel1And2Filters extends ListFilters {}
export interface AllCreateEditsRequestedFilters extends ListFilters {}
