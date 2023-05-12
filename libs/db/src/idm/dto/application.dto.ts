import { Optional } from 'sequelize';

export type CreateApplicationDTO = {
  // Primary Key
  id: string;

  //Foreign keys
  statusId: string;

  //Attributes
  name: string;
  description?: string;
};

export type UpdateApplicationDTO = Optional<CreateApplicationDTO, 'statusId' | 'name'>;

export type FilterApplicationDTO = {
  isActive?: boolean;
  isDeleted?: boolean;
  includeDeleted?: boolean;
};
