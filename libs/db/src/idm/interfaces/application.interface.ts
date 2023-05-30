import { TimestampAttributes } from '../../global/interfaces/timeStampAttributes.interface';

export interface Application extends TimestampAttributes {
  // Primary Key(s)
  id: string;

  // Foreign Key(s)
  statusId: string;

  // Attribute(s)
  name: string;
  description?: string;
}
