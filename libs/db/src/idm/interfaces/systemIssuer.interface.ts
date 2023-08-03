import { TimestampAttributes } from '../../global/interfaces/timeStampAttributes.interface';

export interface SystemIssuer extends TimestampAttributes {
  // Primary Key(s)
  id: string;

  // Foreign Key(s)
  statusId: string;
  systemId: number;
  tokenTypeId: string;

  // Attribute(s)
  name: string;
  tokenTimeToLive: number;
  refreshTokenTimeToLive?: number;
  hashAlgorithm?: string;
  origin?: string;
  restrictedIps?: string;
  allowedIps?: string;
  methods?: string;
  allowedHeaders?: string;
  exposedHeaders?: string;
  allowCredentials?: boolean;
  maxAgeInSeconds?: number;
}
