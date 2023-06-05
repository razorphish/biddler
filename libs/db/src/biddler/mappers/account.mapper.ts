import { Account, AccountOutput } from '../interfaces';

export const toAccount = (output: AccountOutput): Account => {
  return {
    // Primary Key
    id: output.id,

    // Foreign Key(s)
    statusId: output.statusId,

    // Attribute(s)
    name: output.name,

    // Userstamp(s)
    lastUpdatedBy: output.lastUpdatedBy,
    createdBy: output.createdBy,

    // Timestamp(s)
    createdDate: output.createdDate,
    lastUpdatedDate: output.lastUpdatedDate,
    deletedAt: output.deletedAt
  };
};
