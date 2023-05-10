import { ReportOutput } from '../models/report.model';
import { Report } from '../interfaces/_index';

export const toReport = (output: ReportOutput): Report => {
  return {
    // Primary Key
    id: output.id,

    // Foreign Key(s)
    statusId: output.statusId,
    outputMetaId: output.outputMetaId,

    // Attribute(s)
    icon: output.icon,
    title: output.title,
    description: output.description,
    sortOrder: output.sortOrder,
    meta: output.meta,
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
