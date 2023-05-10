import { FindAttributeOptions, Order } from 'sequelize';

export type FilterQALevel1And2DTO = {
  limit?: number;
  offset?: number;
  status?: string;
  attribrutes?: FindAttributeOptions;
  order?: Order;
};
