import { Optional } from 'sequelize';

export type CreateApiClientDTO = {
  // Foreign Key(s)
  applicationId: number;
  systemIssuerId: number;
  tokenTypeId: string;
  statusId: string;

  // Attribute(s)
  audience?: string;
  subject?: string;
  secret?: string;
  salt?: string;
  scopes?: string;
  allowedIps?: string;
  restrictedIps?: string;
  timeToLive?: number;
  refreshTimeToLive?: number;
};

export type UpdateApiClientDTO = Optional<
  CreateApiClientDTO,
  'applicationId' | 'systemIssuerId' | 'tokenTypeId' | 'statusId'
>;

export type FilterApiClientDTO = {
  isActive?: boolean;
  isDeleted?: boolean;
  includeDeleted?: boolean;
};
