import { UserRole } from './userRole.interface';

export interface User {
  // Primary Key
  id: number;

  // Foreign keys
  statusId: string;

  // Attributes
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  username: string;
  password?: string;

  // Children
  userRoles?: UserRole[] | null;

  // Timestamps
  createdDate?: Date;
  createdBy?: string;
  lastUpdatedDate?: Date | null;
  lastUpdatedBy?: string;
  deletedAt: Date | null;
}
