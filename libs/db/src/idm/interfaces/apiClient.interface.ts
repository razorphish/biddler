import { TimestampAttributes } from '../../global/interfaces/timeStampAttributes.interface';

export interface ApiClient extends TimestampAttributes {
  // Primary Key(s)
  id: number;

  // References

  // Foreign Key(s)
  applicationId: number;
  systemIssuerId: number;
  tokenTypeId: string;
  clientTypeId: string;
  statusId: string;
  userId: number;

  // Attribute(s)
  grants: string;
  applicationName: string;
  homepageURL?: string;
  clientID?: string;
  clientSecret?: string;
  salt?: string;
  scopes?: string;
  key?: string;
}
