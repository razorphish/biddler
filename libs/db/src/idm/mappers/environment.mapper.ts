import { Environment, EnvironmentOutput } from '../interfaces';

export const toEnvironment = (output: EnvironmentOutput): Environment => {
  return {
    // Primary Key(s)
    id: output.id,

    // Foreign Key(s)
    statusId: output.statusId,

    // Attribute(s)
    aliases: output.aliases,
    description: output.description,

    // Userstamp(s)
    lastUpdatedBy: output.lastUpdatedBy,
    createdBy: output.createdBy,

    // Timestamp(s)
    createdDate: output.createdDate,
    lastUpdatedDate: output.lastUpdatedDate,
    deletedAt: output.deletedAt
  };
};
