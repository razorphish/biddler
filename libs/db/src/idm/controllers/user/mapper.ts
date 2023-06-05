import { User } from '../../interfaces/user.interface';
import { UserOutput } from '../../models/user.model';

export const toUser = (user: UserOutput): User => {
  return {
    id: user.id,
    statusId: user.statusId,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    username: user.username,
    password: user.password,
    userRoles: user.userRoles,
    createdDate: user.createdDate,
    createdBy: user.createdBy,
    lastUpdatedDate: user.lastUpdatedDate,
    lastUpdatedBy: user.lastUpdatedBy,
    deletedAt: user.deletedAt
  };
};
