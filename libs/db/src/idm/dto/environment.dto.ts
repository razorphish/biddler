import { Optional } from 'sequelize';

export type CreateEnvironmentDTO = {
  //Foreign keys
  statusId: string;

  //Attributes
  name: string;
  description?: string;
};

export type UpdateEnvironmentDTO = Optional<CreateEnvironmentDTO, 'statusId' | 'name'>;

export type FilterEnvironmentDTO = {
  isActive?: boolean;
  isDeleted?: boolean;
  includeDeleted?: boolean;
};
