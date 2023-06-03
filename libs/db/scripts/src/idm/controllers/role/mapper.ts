import { Role } from '../../interfaces/role.interface';
import { RoleOutput } from '../../models/role.model';

export const toRole = (role: RoleOutput): Role => {
  return {
    id: role.id,
    statusId: role.statusId,
    description: role.description,
    createdDate: role.createdDate,
    createdBy: role.createdBy,
    lastUpdatedDate: role.lastUpdatedDate,
    lastUpdatedBy: role.lastUpdatedBy,
    deletedAt: role.deletedAt
  };
};
