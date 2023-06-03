import { User, Role } from '.';
import { TimestampAttributes } from '../../global/interfaces/timeStampAttributes.interface';
export interface UserRole extends TimestampAttributes {
  // Primary Key(s)
  // Foreign Key(s)
  userId: number;
  roleId: string;

  // Foreign Key(s)
  statusId: string;

  // Attribute(s)
  effectiveStartDate?: Date;
  effectiveEndDate?: Date;

  // children
  user?: User | null;
  role?: Role | null;
}
