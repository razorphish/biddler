import { User, Role } from '.';
export interface UserRole {
  // Primary Key
  userId: number;
  roleId: string;

  // Foreign Key
  statusId: string;

  // Attributes
  effectiveStartDate?: Date;
  effectiveEndDate?: Date;

  // children
  user?: User | null;
  role?: Role | null;

  createdDate?: Date;
  createdBy?: string;
  lastUpdatedDate?: Date | null;
  lastUpdatedBy?: string;
  deletedAt?: Date | null;
}
