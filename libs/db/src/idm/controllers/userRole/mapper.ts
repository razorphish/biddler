import { UserRole } from '../../interfaces/userRole.interface';
import { UserRoleOutput } from '../../models/userRole.model';

export const toUserRole = (userRole: UserRoleOutput): UserRole => {
  return {
    userId: userRole.userId,
    roleId: userRole.roleId,
    statusId: userRole.statusId,
    effectiveStartDate: userRole.effectiveStartDate,
    effectiveEndDate: userRole.effectiveEndDate,
    createdDate: userRole.createdDate,
    createdBy: userRole.createdBy,
    lastUpdatedDate: userRole.lastUpdatedDate,
    lastUpdatedBy: userRole.lastUpdatedBy,
    deletedAt: userRole.deletedAt
  };
};
