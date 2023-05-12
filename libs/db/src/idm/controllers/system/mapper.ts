import { System } from '../../interfaces/system.interface';
import { SystemOutput } from '../../models/system.model';

export const toSystem = (system: SystemOutput): System => {
  return {
    id: system.id,
    statusId: system.statusId,
    name: system.name,
    slug: system.slug,
    description: system.description,
    url: system.url,
    effectiveStartDate: system.effectiveStartDate,
    effectiveEndDate: system.effectiveEndDate,
    createdDate: system.createdDate,
    createdBy: system.createdBy,
    lastUpdatedDate: system.lastUpdatedDate,
    lastUpdatedBy: system.lastUpdatedBy,
    deletedAt: system.deletedAt
  };
};
