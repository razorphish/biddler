import { RolePermission, RolePermissionOutput } from '../interfaces';

export const toRolePermission = (output: RolePermissionOutput): RolePermission => {
  return {
    // Primary Key(s)
    roleId: output.roleId,
    permissionId: output.permissionId,

    // Foreign Key(s)
    statusId: output.statusId,

    // Attribute(s)
    effectiveStartDate: output.effectiveStartDate,
    effectiveEndDate: output.effectiveEndDate,

    // children
    role: output.role,
    permission: output.permission,

    // Userstamp(s)
    lastUpdatedBy: output.lastUpdatedBy,
    createdBy: output.createdBy,

    // Timestamp(s)
    createdDate: output.createdDate,
    lastUpdatedDate: output.lastUpdatedDate,
    deletedAt: output.deletedAt
  };
};
