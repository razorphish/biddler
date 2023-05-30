import { TimestampAttributes } from '../../global/interfaces/timeStampAttributes.interface';
import { UserRole } from './userRole.interface';

export interface User extends TimestampAttributes {
  // Primary Key(s)
  id: number;

  // Foreign Key(s)
  statusId: string;

  // Attribute(s)
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  username: string;
  password?: string;

  // Children
  userRoles?: UserRole[] | null;
}
