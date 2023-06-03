import { Application } from '../../interfaces/application.interface';
import { ApplicationOutput } from '../../models/application.model';

export const toApplication = (application: ApplicationOutput): Application => {
  return {
    id: application.id,
    statusId: application.statusId,
    name: application.name,
    description: application.description,
    createdDate: application.createdDate,
    createdBy: application.createdBy,
    lastUpdatedDate: application.lastUpdatedDate,
    lastUpdatedBy: application.lastUpdatedBy,
    deletedAt: application.deletedAt
  };
};
