import { Lookup, LookupOutput } from '../interfaces';

export const toLookup = (output: LookupOutput): Lookup => {
  return {
    // Primary Key
    id: output.id,

    // Foreign Key(s)

    // Attribute(s)
    code: output.code,
    group: output.group,
    title: output.title,
    description: output.description,
    isDefault: output.isDefault,
    sortOrder: output.sortOrder,
    effectiveEndDate: output.effectiveEndDate,
    effectiveStartDate: output.effectiveStartDate,

    // Userstamp(s)
    createdBy: output.createdBy,
    lastUpdatedBy: output.lastUpdatedBy,

    // Timestamp(s)
    createdDate: output.createdDate,
    lastUpdatedDate: output.lastUpdatedDate,
    deletedAt: output.deletedAt
  };
};
