import { Optional } from 'sequelize';
import { CreateUserRoleDTO } from './userRole.dto';

export type CreateUserDTO = {
  //Foreign keys
  statusId: string;
  //Attributes
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  username: string;
  password?: string;

  //Foreign keys
  userRoles?: CreateUserRoleDTO[];
};

export type UpdateUserDTO = Optional<
  CreateUserDTO,
  'statusId' | 'firstName' | 'lastName' | 'email' | 'username'
>;

export type FilterUserDTO = {
  isActive?: boolean;
  isDeleted?: boolean;
  includeDeleted?: boolean;
};
