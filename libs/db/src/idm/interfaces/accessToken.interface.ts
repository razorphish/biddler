import { ApiClient } from '.';
import { TimestampAttributes } from '../../global/interfaces/timeStampAttributes.interface';

export interface AccessToken extends TimestampAttributes {
  // Primary Key(s)
  id: number;

  // Foreign Key(s)
  userId?: number;
  clientId: number;
  statusId: string;
  tokenTypeId: string;
  schemeTypeId?: string;

  // Attribute(s)
  token: string;
  refreshToken?: string;
  scope?: string;
  expiresIn?: number;
  origin?: string;
  forceRefresh?: boolean;
  ipAddress?: string;
  cookie?: string;
  expireDate?: Date;
  refreshTokenExpireDate?: Date;
  issuedDate?: Date;

  // References
  client?: ApiClient;
}
