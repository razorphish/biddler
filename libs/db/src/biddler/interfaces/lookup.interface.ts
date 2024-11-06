import { TimestampAttributes } from '../../global/interfaces';

export interface Lookup extends TimestampAttributes {
  // Primary Key
  id: string;
  group: string;

  // Foreign Key(s)
  // Attribute(s)
  title?: string;
  description?: string;
  isDefault?: boolean;
  sortOrder?: number;
  effectiveStartDate?: Date;
  effectiveEndDate?: Date;
}
