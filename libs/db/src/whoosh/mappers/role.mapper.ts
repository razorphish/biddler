import { Role, RoleOutput } from '../interfaces';

export const toRole = (output: RoleOutput): Role => {
  return {
    // Primary Key
    id: output.id,

    // Foreign Key(s)
    statusId: output.statusId,

    // Attribute(s)
    description: output.description,

    // Userstamp(s)
    createdBy: output.createdBy,

    // Timestamp(s)
    createdDate: output.createdDate,
    deletedAt: output.deletedAt
  };
};
