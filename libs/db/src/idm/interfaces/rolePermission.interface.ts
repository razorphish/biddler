import { Permission, Role } from '.';
export interface RolePermission {
  // Primary Key
  roleId: string;
  permissionId: string;

  // Foreign Key
  statusId: string;

  // Attributes
  effectiveStartDate?: Date;
  effectiveEndDate?: Date;

  // children
  role?: Role | null;
  permission?: Permission | null;

  createdDate?: Date;
  createdBy?: string;
  lastUpdatedDate?: Date | null;
  lastUpdatedBy?: string;
  deletedAt?: Date | null;
}
