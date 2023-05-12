export interface Permission {
  // Primary Key
  id: string;

  //Foreign keys
  statusId: string;

  //Attributes
  description?: string;

  //Timestamps
  createdDate?: Date;
  createdBy?: string;
  lastUpdatedDate?: Date | null;
  lastUpdatedBy?: string;
  deletedAt?: Date | null;
}
