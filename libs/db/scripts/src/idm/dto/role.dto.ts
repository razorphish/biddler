import { Optional } from 'sequelize';

export type CreateRoleDTO = {
  // Primary Key
  id: string;

  //Foreign keys
  statusId: string;

  //Attributes
  description?: string;
};

export type UpdateRoleDTO = Optional<CreateRoleDTO, 'statusId'>;

export type FilterRoleDTO = {
  isActive?: boolean;
  isDeleted?: boolean;
  includeDeleted?: boolean;
};
