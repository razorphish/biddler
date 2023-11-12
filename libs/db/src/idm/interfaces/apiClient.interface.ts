import { TimestampAttributes } from '../../global/interfaces/timeStampAttributes.interface';

export interface ApiClient extends TimestampAttributes {
  // Primary Key(s)
  id: string;

  // Foreign Key(s)
  applicationId: number;
  systemIssuerId: number;
  tokenTypeId: string;
  clientTypeId: string;
  grantTypeId: string;
  statusId: string;

  // Attribute(s)
  applicationName: string;
  homepageURL?: string;
  clientID?: string;
  clientSecret?: string;
  salt?: string;
  scopes?: string;
  key?: string;
}
