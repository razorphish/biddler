import { TimestampAttributes } from './timestampAttributes.interface';

export interface Status extends Omit<TimestampAttributes, 'lastUpdatedBy' | 'lastUpdatedDate'> {
  // Primary Key
  id: string;

  //Attributes
  description?: string;
}
