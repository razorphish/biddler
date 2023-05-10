export interface FileMeta {
  // Primary Key(s)
  id: number;

  // Foreign Key(s)
  docTypeId: string;
  statusId: string;

  // Attribute(s)
  originalFileName?: string;
  displayName?: string;
  targetFilename?: string;
  targetLocation?: string;
  fileSize?: number;
  fileStatus?: string;
  fileExtension?: string;
  details?: string;
  fileInfoJson?: string;

  // User Stamps
  createdBy?: string;
  lastUpdatedBy?: string;

  // Timestamps
  createdDate?: Date;
  lastUpdatedDate?: Date | null;
  deletedAt?: Date | null;
}
