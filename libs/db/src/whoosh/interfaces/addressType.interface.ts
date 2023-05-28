import { TimestampAttributes } from './timestampAttributes.interface';

export interface AddressType
  extends Omit<TimestampAttributes, 'lastUpdatedDate' | 'lastUpdatedBy'> {
  // Primary Key(s)
  id: string;

  // Attribute(s)
  description?: string;
}
