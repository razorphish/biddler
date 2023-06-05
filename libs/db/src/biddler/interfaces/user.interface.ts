import { TimestampAttributes } from './timestampAttributes.interface';

export interface User extends TimestampAttributes {
  // Primary Key(s)
  id: number;

  // Foreign Key(s)
  statusId: string;

  // Attribute(s)
  firstName: string;
  lastName: string;
  email: string;
}
