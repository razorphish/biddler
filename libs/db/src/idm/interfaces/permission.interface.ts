import { TimestampAttributes } from '../../global/interfaces/timeStampAttributes.interface';

export interface Permission extends TimestampAttributes {
  // Primary Key(s)
  id: string;

  // Foreign Key(s)
  statusId: string;

  // Attribute(s)
  description?: string;
}
