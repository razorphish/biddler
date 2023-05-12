import { Optional } from 'sequelize';

export type CreateSystemDTO = {
  statusId: string;
  name: string;
  slug: string;
  description?: string;
  url?: string;
  effectiveStartDate?: Date;
  effectiveEndDate?: Date;
};

export type UpdateUserDTO = Optional<CreateSystemDTO, 'name' | 'slug' | 'statusId'>;

export type FilterSystemDTO = {
  isActive?: boolean;
  isDeleted?: boolean;
  includeDeleted?: boolean;
};
