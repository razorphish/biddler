export interface System {
  id: number;
  statusId: string;
  name: string;
  slug: string;
  description?: string;
  url?: string;
  effectiveStartDate?: Date;
  effectiveEndDate?: Date;
  createdDate?: Date;
  createdBy?: string;
  lastUpdatedDate?: Date | null;
  lastUpdatedBy?: string;
  deletedAt?: Date | null;
}
