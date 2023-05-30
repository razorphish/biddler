import { Permission, Role } from '.';
import { TimestampAttributes } from '../../global/interfaces/timeStampAttributes.interface';
export interface RolePermission extends TimestampAttributes {
  // Primary Key(s)
  roleId: string;
  permissionId: string;

  // Foreign Key(s)
  statusId: string;

  // Attribute(s)
  effectiveStartDate?: Date;
  effectiveEndDate?: Date;

  // children
  role?: Role | null;
  permission?: Permission | null;
}
