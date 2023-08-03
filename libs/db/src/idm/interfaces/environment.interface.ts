import { TimestampAttributes } from '../../global/interfaces/timeStampAttributes.interface';

export interface Environment extends TimestampAttributes {
  // Primary Key(s)
  id: string;

  // Foreign Key(s)
  statusId: string;

  // Attribute(s)
  aliases: string;
  description?: string;
}
