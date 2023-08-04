import { User, UserOutput } from '../interfaces';

export const toUser = (output: UserOutput): User => {
  return {
    // Primary Key(s)
    id: output.id,

    // Foreign Key(s)
    statusId: output.statusId,

    // Attribute(s)
    firstName: output.firstName,
    lastName: output.lastName,
    username: output.username,
    email: output.email,
    salt: output.salt,
    password: output.password,

    // Userstamp(s)
    lastUpdatedBy: output.lastUpdatedBy,
    createdBy: output.createdBy,

    // Timestamp(s)
    createdDate: output.createdDate,
    lastUpdatedDate: output.lastUpdatedDate,
    deletedAt: output.deletedAt
  };
};
