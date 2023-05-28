import { TimestampAttributes } from './timestampAttributes.interface';

export interface Role extends Omit<TimestampAttributes, 'lastUpdatedBy' | 'lastUpdatedDate'> {
  // Primary Key(s)
  id: number;

  // Foreign Key(s)
  statusId: string;

  // Attribute(s)
  description: string;
}
