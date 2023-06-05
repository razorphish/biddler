import { TimestampAttributes } from '../../global/interfaces/timeStampAttributes.interface';

export interface Status extends Omit<TimestampAttributes, 'lastUpdatedBy' | 'lastUpdatedDate'> {
  // Primary Key
  id: string;

  //Attributes
  description?: string;
}
