import { TimestampAttributes } from '../../global/interfaces/timeStampAttributes.interface';
import { Permission } from './permission.interface';

export interface Role extends Omit<TimestampAttributes, 'lastUpdatedDate' | 'lastUpdatedBy'> {
  // Primary Key(s)
  id: string;

  // Foreign Key(s)
  statusId: string;

  // Attribute(s)
  description?: string;

  // Children
  permission?: Permission[];
}
