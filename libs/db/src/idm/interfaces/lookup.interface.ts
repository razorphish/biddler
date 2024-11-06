import { TimestampAttributes } from '../../global/interfaces';

export interface Lookup extends TimestampAttributes {
  // Primary Key(s)
  id: string;

  // Foreign Key(s)
  // Attribute(s)
  code: string;
  group: string;
  title?: string;
  description?: string;
  isDefault?: boolean;
  sortOrder?: number;
  effectiveStartDate?: Date;
  effectiveEndDate?: Date;
}
