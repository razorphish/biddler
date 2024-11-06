import { System, SystemOutput } from '../interfaces';

export const toSystem = (output: SystemOutput): System => {
  return {
    // Primary Key(s)
    id: output.id,

    // Foreign Key(s)
    statusId: output.statusId,

    // Attribute(s)
    name: output.name,
    slug: output.slug,
    description: output.description,
    url: output.url,
    effectiveStartDate: output.effectiveStartDate,
    effectiveEndDate: output.effectiveEndDate,

    // Userstamp(s)
    createdBy: output.createdBy,

    // Timestamp(s)
    createdDate: output.createdDate,
    deletedAt: output.deletedAt
  };
};
