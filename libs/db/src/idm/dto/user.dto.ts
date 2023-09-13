import { Optional } from 'sequelize';
export type CreateUserDTO = {
  //Foreign keys
  statusId: string;

  //Attributes
  firstName?: string;
  lastName?: string;
  username: string;
  email: string;
  salt?: string;
  password?: string;

  //Foreign keys
  // userRoles?: CreateUserRoleDTO[];
};

export type UpdateUserDTO = Optional<
  CreateUserDTO,
  'statusId' | 'username' | 'email' | 'salt' | 'password'
>;

export type FilterUserDTO = {
  isActive?: boolean;
  isDeleted?: boolean;
  includeDeleted?: boolean;
};
