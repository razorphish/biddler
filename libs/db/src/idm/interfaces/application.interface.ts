export interface Application {
  // Primary Key
  id: string;

  //Foreign keys
  statusId: string;

  //Attributes
  name: string;
  description?: string;

  //Timestamps
  createdDate?: Date;
  createdBy?: string;
  lastUpdatedDate?: Date | null;
  lastUpdatedBy?: string;
  deletedAt?: Date | null;
}
