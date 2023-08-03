import { TimestampAttributes } from '../../global/interfaces/timeStampAttributes.interface';

export interface AccessToken extends TimestampAttributes {
  // Primary Key(s)
  id: number;

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
}
