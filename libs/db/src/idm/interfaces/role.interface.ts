import { Permission } from './permission.interface';

export interface Role {
  // Primary Key
  id: string;

  // Foreign keys
  statusId: string;

  // Attributes
  description?: string;

  // Children
  permissions?: Permission[];

  // Timestamps
  createdDate?: Date;
  createdBy?: string;
  lastUpdatedDate?: Date | null;
  lastUpdatedBy?: string;
  deletedAt?: Date | null;
}
