import { PermissionInput, PermissionOutput } from '../models/permission.model';
import { AllPermissionFilters } from '../dal/types';
import * as DAL from '../dal/permission.dal';

export const all = (
  filters: AllPermissionFilters
): Promise<PermissionOutput[]> => {
  return DAL.all(filters);
};

export const byId = (id: string): Promise<PermissionOutput> => {
  return DAL.byId(id);
};

export const create = async (
  payload: PermissionInput
): Promise<PermissionOutput> => {
  return DAL.create(payload);
};

export const deleteById = (id: string): Promise<boolean> => {
  return DAL.deleteById(id);
};

export const update = async (
  id: string,
  payload: Partial<PermissionInput>
): Promise<PermissionOutput> => {
  return DAL.update(id, payload);
};
