import { TimestampAttributes } from '../../global/interfaces/timeStampAttributes.interface';

export interface AccessToken extends TimestampAttributes {
  // Primary Key(s)
  id: number;

  // Foreign Key(s)
  userId: number;
  statusId: string;

  // Attribute(s)
  name: string;
  accessToken: string;
  timeToLive?: number;
  scope?: string;
  type?: string;
  expiresIn?: number;
  origin?: string;
  forceRefresh?: boolean;
  cookie?: string;
  ipAddress?: string;
  expireDate?: Date;
}
