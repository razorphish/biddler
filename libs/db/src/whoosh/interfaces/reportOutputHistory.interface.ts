import { Report } from './report.interface';
import { FileMeta } from './fileMeta.interface';
export interface ReportOutputHistory {
  // Primary Key(s)
  id: number;

  // Foreign Key(s)
  statusId: string;
  exportTypeId: string;
  reportId?: number;
  userId?: number;
  outputMetaId?: number;
  fileId?: number;

  // Attribute(s)
  effectiveStartDate: Date;
  effectiveEndDate: Date;

  // User Stamps
  createdBy?: string;
  lastUpdatedBy?: string;

  // Timestamps
  createdDate?: Date;
  lastUpdatedDate?: Date | null;
  deletedAt?: Date | null;

  // References
  report?: Report | null;
  fileMeta?: FileMeta | null;
}
