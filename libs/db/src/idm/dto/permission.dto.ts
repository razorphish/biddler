import { Optional } from 'sequelize';

export type CreatePermissionDTO = {
  // Primary Key
  id: string;

  //Foreign keys
  statusId: string;

  //Attributes
  description?: string;
};

export type UpdatePermissionDTO = Optional<CreatePermissionDTO, 'statusId'>;

export type FilterPermissionDTO = {
  isActive?: boolean;
  isDeleted?: boolean;
  includeDeleted?: boolean;
};
