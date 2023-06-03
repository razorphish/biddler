import { Optional } from 'sequelize';
import { CreatePermissionDTO } from './permission.dto';
import { CreateRoleDTO } from './role.dto';

export type CreateRolePermissionDTO = {
  // Primary Key
  roleId: string;
  permissionId: string;

  //Foreign keys
  statusId: string;

  //Attributes
  effectiveStartDate?: Date;
  effectiveEndDate?: Date;

  // Children
  role?: CreateRoleDTO;
  permission?: CreatePermissionDTO;
};

export type UpdateRolePermissionDTO = Optional<
  CreateRolePermissionDTO,
  'roleId' | 'permissionId' | 'statusId'
>;

export type FilterRolePermissionDTO = {
  isActive?: boolean;
  isDeleted?: boolean;
  includeDeleted?: boolean;
  isInEffectiveDateRange?: boolean;
};
