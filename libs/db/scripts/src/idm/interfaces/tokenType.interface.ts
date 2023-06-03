import { TimestampAttributes } from '../../global/interfaces/timeStampAttributes.interface';

export interface TokenType extends Omit<TimestampAttributes, 'lastUpdatedDate' | 'lastUpdatedBy'> {
  // Primary Key(s)
  id: string;

  // Attribute(s)
  description?: string;
}
