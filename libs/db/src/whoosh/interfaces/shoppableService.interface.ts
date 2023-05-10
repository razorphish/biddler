export interface ShoppableService {
  // Primary Key
  id: string;

  //Attributes
  description?: string;
  group?: string;

  //Timestamps
  createdDate?: Date;
  createdBy?: string;
}
