import { TimestampAttributes } from './timestampAttributes.interface';

export interface RolePermission extends TimestampAttributes {
  // Primary Key(s)
  roleId: string;
  permissionId: string;

  // Foreign Key(s)
  statusId: string;

  // Attribute(s)
  effectiveStartDate: Date;
  effectiveEndDate: Date;
}
