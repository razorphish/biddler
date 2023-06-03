export interface TimestampAttributes {
  // User Stamps
  createdBy?: string;
  lastUpdatedBy?: string;

  // Timestamps
  createdDate?: Date;
  lastUpdatedDate?: Date;
  deletedAt?: Date;
}
