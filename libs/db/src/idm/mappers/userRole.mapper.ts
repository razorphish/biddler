import { UserRole, UserRoleOutput } from '../interfaces';

export const toUserRole = (output: UserRoleOutput): UserRole => {
  return {
    // Primary Key(s)
    // Foreign Key(s)
    userId: output.userId,
    roleId: output.roleId,

    // Foreign Key(s)
    statusId: output.statusId,

    // Attribute(s)
    effectiveStartDate: output.effectiveStartDate,
    effectiveEndDate: output.effectiveEndDate,

    // children
    user: output.user,
    role: output.role,

    // Userstamp(s)
    lastUpdatedBy: output.lastUpdatedBy,
    createdBy: output.createdBy,

    // Timestamp(s)
    createdDate: output.createdDate,
    lastUpdatedDate: output.lastUpdatedDate,
    deletedAt: output.deletedAt
  };
};
