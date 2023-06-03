import { RolePermissionInput, RolePermissionOutput } from '../models/rolePermission.model';
import { AllRolePermissionFilters } from '../dal/types';
import * as DAL from '../dal/models/rolePermission.dal';

export const all = (filters: AllRolePermissionFilters): Promise<RolePermissionOutput[]> => {
  return DAL.all(filters);
};

export const byId = (
  roleId: string,
  permissionId: string,
  filters: AllRolePermissionFilters
): Promise<RolePermissionOutput> => {
  return DAL.byId(roleId, permissionId, filters);
};

export const byPermissionId = (
  permissionId: string,
  filters: AllRolePermissionFilters
): Promise<RolePermissionOutput[]> => {
  return DAL.byPermissionId(permissionId, filters);
};

export const byRoleId = (
  roleId: string,
  filters: AllRolePermissionFilters
): Promise<RolePermissionOutput[]> => {
  return DAL.byRoleId(roleId, filters);
};

export const create = async (payload: RolePermissionInput): Promise<RolePermissionOutput> => {
  return DAL.create(payload);
};

export const deleteById = (roleId: string, permissionId: string): Promise<boolean> => {
  return DAL.deleteById(roleId, permissionId);
};

export const deleteByPermissionId = (permissionId: string): Promise<boolean> => {
  return DAL.deleteByPermissionId(permissionId);
};

export const deleteByRoleId = (roleId: string): Promise<boolean> => {
  return DAL.deleteByRoleId(roleId);
};

export const update = async (
  roleId: string,
  permissionId: string,
  payload: Partial<RolePermissionInput>
): Promise<RolePermissionOutput> => {
  return DAL.update(roleId, permissionId, payload);
};
