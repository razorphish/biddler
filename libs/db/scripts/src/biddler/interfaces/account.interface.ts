import { TimestampAttributes } from './timestampAttributes.interface';

export interface Account extends TimestampAttributes {
  // Primary Key(s)
  id: number;

  // Foreign Key(s)
  statusId: string;

  // Attribute(s)
  name: string;
}
