import { TimestampAttributes } from '../../global/interfaces/timeStampAttributes.interface';

export interface System extends TimestampAttributes {
  // Primary Key(s)
  id: string;

  // Foreign Key(s)
  statusId: string;

  // Attribute(s)
  name: string;
  slug: string;
  description?: string;
  url?: string;
  effectiveStartDate?: Date;
  effectiveEndDate?: Date;
}
