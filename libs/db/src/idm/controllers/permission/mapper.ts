import { Permission } from '../../interfaces/permission.interface';
import { PermissionOutput } from '../../models/permission.model';

export const toPermission = (permission: PermissionOutput): Permission => {
  return {
    id: permission.id,
    statusId: permission.statusId,
    description: permission.description,
    createdDate: permission.createdDate,
    createdBy: permission.createdBy,
    lastUpdatedDate: permission.lastUpdatedDate,
    lastUpdatedBy: permission.lastUpdatedBy,
    deletedAt: permission.deletedAt
  };
};
