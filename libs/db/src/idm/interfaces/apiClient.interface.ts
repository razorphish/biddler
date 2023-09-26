import { TimestampAttributes } from '../../global/interfaces/timeStampAttributes.interface';

export interface ApiClient extends TimestampAttributes {
  // Primary Key(s)
  id: string;

  // Foreign Key(s)
  applicationId: number;
  systemIssuerId: number;
  tokenTypeId: string;
  statusId: string;

  // Attribute(s)
  homepageURL?: string;
  clientID?: string;
  clientSecret?: string;
  salt?: string;
  scopes?: string;
}
