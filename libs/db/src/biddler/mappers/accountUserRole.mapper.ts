import { AccountUserRole, AccountUserRoleOutput } from '../interfaces';

export const toAccountUserRole = (output: AccountUserRoleOutput): AccountUserRole => {
  return {
    // Primary Key
    accountId: output.accountId,
    userId: output.userId,
    roleId: output.roleId,

    // Foreign Key(s)
    statusId: output.statusId,

    // Attribute(s)
    effectiveStartDate: output.effectiveStartDate,
    effectiveEndDate: output.effectiveEndDate,

    // Userstamp(s)
    lastUpdatedBy: output.lastUpdatedBy,
    createdBy: output.createdBy,

    // Timestamp(s)
    createdDate: output.createdDate,
    lastUpdatedDate: output.lastUpdatedDate,
    deletedAt: output.deletedAt
  };
};
