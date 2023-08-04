import { TimestampAttributes } from '../../global/interfaces/timeStampAttributes.interface';

export interface User extends TimestampAttributes {
  // Primary Key(s)
  id: number;

  // Foreign Key(s)
  statusId: string;

  // Attribute(s)
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  salt: string;
  password?: string;

  // Children
  //userRoles?: UserRole[] | null;
}
