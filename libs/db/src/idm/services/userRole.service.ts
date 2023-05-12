import { UserRoleInput, UserRoleOutput } from '../models/userRole.model';
import { AllUserRoleFilters } from '../dal/types';
import * as DAL from '../dal/userRole.dal';

export const all = (filters: AllUserRoleFilters): Promise<UserRoleOutput[]> => {
  return DAL.all(filters);
};

export const byId = (
  userId: number,
  roleId: string,
  filters: AllUserRoleFilters
): Promise<UserRoleOutput> => {
  return DAL.byId(userId, roleId, filters);
};

export const byUserId = (
  userId: number,
  filters: AllUserRoleFilters
): Promise<UserRoleOutput[]> => {
  return DAL.byUserId(userId, filters);
};

export const byRoleId = (
  roleId: string,
  filters: AllUserRoleFilters
): Promise<UserRoleOutput[]> => {
  return DAL.byRoleId(roleId, filters);
};

export const create = async (
  payload: UserRoleInput
): Promise<UserRoleOutput> => {
  return DAL.create(payload);
};

export const deleteById = (
  userId: number,
  roleId: string
): Promise<boolean> => {
  return DAL.deleteById(userId, roleId);
};

export const deleteByUserId = (userId: number): Promise<boolean> => {
  return DAL.deleteByUserId(userId);
};

export const deleteByRoleId = (roleId: string): Promise<boolean> => {
  return DAL.deleteByRoleId(roleId);
};

export const update = async (
  userId: number,
  roleId: string,
  payload: Partial<UserRoleInput>
): Promise<UserRoleOutput> => {
  return DAL.update(userId, roleId, payload);
};
