import { Optional } from 'sequelize';
import { CreateRoleDTO } from './role.dto';
import { CreateUserDTO } from './user.dto';

export type CreateUserRoleDTO = {
  // Primary Key
  userId: number;
  roleId: string;

  // Foreign keys
  statusId: string;

  // Attributes
  effectiveStartDate?: Date;
  effectiveEndDate?: Date;

  // Children
  role?: CreateRoleDTO;
  user?: CreateUserDTO;
};

export type UpdateUserRoleDTO = Optional<CreateUserRoleDTO, 'userId' | 'roleId' | 'statusId'>;

export type FilterUserRoleDTO = {
  isActive?: boolean;
  isDeleted?: boolean;
  includeDeleted?: boolean;
  isInEffectiveDateRange?: boolean;
};
