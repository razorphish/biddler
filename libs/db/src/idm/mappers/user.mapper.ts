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
    email: output.email,
    phone: output.phone,
    username: output.username,
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
