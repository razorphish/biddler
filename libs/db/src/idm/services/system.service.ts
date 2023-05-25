import { SystemInput, SystemOutput } from '../models/system.model';
import { AllSystemFilters } from '../dal/types';
import * as SystemDAL from '../dal/models/system.dal';

export const create = async (payload: SystemInput): Promise<SystemOutput> => {
  return SystemDAL.create(payload);
};

export const all = (filters: AllSystemFilters): Promise<SystemOutput[]> => {
  return SystemDAL.all(filters);
};
