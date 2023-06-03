import { TimestampAttributes } from '../../global/interfaces/timeStampAttributes.interface';

export interface System extends Omit<TimestampAttributes, 'lastUpdatedDate' | 'lastUpdatedBy'> {
  // Primary Key(s)
  id: number;

  // Attribute(s)
  description?: string;
}