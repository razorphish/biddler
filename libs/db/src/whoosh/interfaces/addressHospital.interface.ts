import { Address } from './address.interface';
export interface RolePermission {
  // Primary Key
  addressId: string;
  hospitalId: string;

  // Foreign Key

  // Attributes

  // children
  address?: Address | null;
  //hospital?: Hospital | null;

  createdDate?: Date;
  createdBy?: string;
  lastUpdatedDate?: Date | null;
  lastUpdatedBy?: string;
  deletedAt?: Date | null;
}
