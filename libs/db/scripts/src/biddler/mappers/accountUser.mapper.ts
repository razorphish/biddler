import { AccountUser, AccountUserOutput } from '../interfaces';

export const toAccountUser = (output: AccountUserOutput): AccountUser => {
  return {
    // Primary Key
    accountId: output.accountId,
    userId: output.userId,

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
