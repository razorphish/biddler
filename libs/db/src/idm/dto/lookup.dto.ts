import { Optional } from 'sequelize';

export type CreateLookupDTO = {
  // Foreign Key(s)
  // Attribute(s)
  code: string;
  group: string;
  title?: string;
  description?: string;
  isDefault?: boolean;
  sortOrder?: number;
  effectiveStartDate?: Date;
  effectiveEndDate?: Date;
};

export type UpdateLookupDTO = Optional<CreateLookupDTO, 'code' | 'group'>;

export type FilterLookupDTO = {
  isActive?: boolean;
  isDeleted?: boolean;
  includeDeleted?: boolean;
};
