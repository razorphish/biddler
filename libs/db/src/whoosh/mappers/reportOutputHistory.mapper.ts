import { ReportOutputHistoryOutput } from '../models/reportOutputHistory.model';
import { ReportOutputHistory } from '../interfaces/_index';

export const toReportOutputHistory = (output: ReportOutputHistoryOutput): ReportOutputHistory => {
  return {
    // Primary Key
    id: output.id,

    // Foreign Key(s)
    statusId: output.statusId,
    exportTypeId: output.exportTypeId,
    reportId: output.reportId,
    userId: output.userId,
    outputMetaId: output.outputMetaId,
    fileId: output.fileId,

    // Attribute(s)
    effectiveStartDate: output.effectiveStartDate,
    effectiveEndDate: output.effectiveEndDate,

    // Timestamps
    createdDate: output.createdDate,
    createdBy: output.createdBy,
    lastUpdatedDate: output.lastUpdatedDate,
    lastUpdatedBy: output.lastUpdatedBy,
    deletedAt: output.deletedAt
  };
};
