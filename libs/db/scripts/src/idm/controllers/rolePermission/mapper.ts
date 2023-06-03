import { RolePermission } from '../../interfaces/rolePermission.interface';
import { RolePermissionOutput } from '../../models/rolePermission.model';

export const toRolePermission = (
  rolePermission: RolePermissionOutput
): RolePermission => {
  return {
    roleId: rolePermission.roleId,
    permissionId: rolePermission.permissionId,
    statusId: rolePermission.statusId,
    effectiveStartDate: rolePermission.effectiveStartDate,
    effectiveEndDate: rolePermission.effectiveEndDate,
    createdDate: rolePermission.createdDate,
    createdBy: rolePermission.createdBy,
    lastUpdatedDate: rolePermission.lastUpdatedDate,
    lastUpdatedBy: rolePermission.lastUpdatedBy,
    deletedAt: rolePermission.deletedAt
  };
};
