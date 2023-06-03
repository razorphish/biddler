import { TimestampAttributes } from './timestampAttributes.interface';

export interface AccountUser extends TimestampAttributes {
  // Primary Key(s)
  userId: number;
  accountId: number;

  // Foreign Key(s)
  statusId: string;

  // Attribute(s)
  effectiveStartDate: Date;
  effectiveEndDate: Date;
}
