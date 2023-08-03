import { Optional } from 'sequelize';

export type CreateAccessTokenDTO = {
  // Foreign Key(s)
  userId?: number;
  statusId: string;
  tokenTypeId: string;
  schemeTypeId: string;

  // Attribute(s)
  token: string;
  secret?: string;
  scope?: string;
  expiresIn?: number;
  origin?: string;
  forceRefresh?: boolean;
  ipAddress?: string;
  cookie?: string;
  expireDate?: Date;
};

export type UpdateAccessTokenDTO = Optional<
  CreateAccessTokenDTO,
  'statusId' | 'tokenTypeId' | 'schemeTypeId' | 'token'
>;

export type FilterAccessTokenDTO = {
  isActive?: boolean;
  isDeleted?: boolean;
  includeDeleted?: boolean;
};
