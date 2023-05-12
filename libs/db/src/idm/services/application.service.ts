import {
  ApplicationInput,
  ApplicationOutput
} from '../models/application.model';
import { AllApplicationFilters } from '../dal/types';
import * as DAL from '../dal/application.dal';

export const all = (
  filters: AllApplicationFilters
): Promise<ApplicationOutput[]> => {
  return DAL.all(filters);
};

export const byId = (id: string): Promise<ApplicationOutput> => {
  return DAL.byId(id);
};

export const create = async (
  payload: ApplicationInput
): Promise<ApplicationOutput> => {
  return DAL.create(payload);
};

export const deleteById = (id: string): Promise<boolean> => {
  return DAL.deleteById(id);
};

export const update = async (
  id: string,
  payload: Partial<ApplicationInput>
): Promise<ApplicationOutput> => {
  return DAL.update(id, payload);
};
