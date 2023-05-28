export interface Status {
  // Primary Key
  id: string;

  //Attributes
  description?: string;

  //Timestamps
  createdDate?: Date;
  createdBy?: string;
  deletedAt?: Date;
}
