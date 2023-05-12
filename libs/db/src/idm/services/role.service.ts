import { RoleInput, RoleOutput } from '../models/role.model';
import { AllRoleFilters } from '../dal/types';
import * as DAL from '../dal/role.dal';

export const all = (filters: AllRoleFilters): Promise<RoleOutput[]> => {
  return DAL.all(filters);
};

export const byId = (id: string): Promise<RoleOutput> => {
  return DAL.byId(id);
};

export const create = async (payload: RoleInput): Promise<RoleOutput> => {
  return DAL.create(payload);
};

export const deleteById = (id: string): Promise<boolean> => {
  return DAL.deleteById(id);
};

export const update = async (
  id: string,
  payload: Partial<RoleInput>
): Promise<RoleOutput> => {
  return DAL.update(id, payload);
};
