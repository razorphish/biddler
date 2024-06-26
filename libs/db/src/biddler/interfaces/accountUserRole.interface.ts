import { TimestampAttributes } from '../../global/interfaces';

export interface AccountUserRole extends TimestampAttributes {
  // Primary Key(s)
  accountId: number;
  userId: number;
  roleId: string;

  // Foreign Key(s)
  statusId: string;

  // Attribute(s)
  effectiveStartDate: Date;
  effectiveEndDate: Date;
}
