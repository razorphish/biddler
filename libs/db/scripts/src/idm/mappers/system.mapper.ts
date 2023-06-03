import { System, SystemOutput } from '../interfaces';

export const toSystem = (output: SystemOutput): System => {
  return {
    // Primary Key(s)
    id: output.id,

    // Attribute(s)
    description: output.description,

    // Userstamp(s)
    createdBy: output.createdBy,

    // Timestamp(s)
    createdDate: output.createdDate,
    deletedAt: output.deletedAt
  };
};
