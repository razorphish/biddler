import * as service from '../../services/rolePermission.service';
import {
  CreateRolePermissionDTO,
  FilterRolePermissionDTO,
  UpdateRolePermissionDTO
} from '../../dto/rolePermission.dto';
import { RolePermission } from '../../interfaces';
import * as mapper from './mapper';

/**
 * @description Gets all RolePermission with filters
 * @author Antonio Marasco
 * @date 11/17/2022
 * @param filters Search criteria
 * @returns {*} List of RolePermissions
 */
export const all = async (
  filters: FilterRolePermissionDTO
): Promise<RolePermission[]> => {
  return (await service.all(filters)).map(mapper.toRolePermission);
};

/**
 * @description Gets a RolePermission by Id
 * @author Antonio Marasco
 * @date 11/17/2022
 * @param roleId Id of the role
 * @param permissionId Id of the permission
 * @returns {*}
 */
export const byId = async (
  roleId: string,
  permissionId: string,
  filters: FilterRolePermissionDTO
): Promise<RolePermission> => {
  return mapper.toRolePermission(
    await service.byId(roleId, permissionId, filters)
  );
};

/**
 * @description Gets a RolePermission by Permission Id
 * @author Antonio Marasco
 * @date 11/17/2022
 * @param permissionId Id of the permission
 * @returns {*}
 */
export const byPermissionId = async (
  permissionId: string,
  filters: FilterRolePermissionDTO
): Promise<RolePermission[]> => {
  return (await service.byPermissionId(permissionId, filters)).map(
    mapper.toRolePermission
  );
};

/**
 * @description Gets a RolePermission by User Id
 * @author Antonio Marasco
 * @date 11/17/2022
 * @param roleId Id of the user
 * @returns {*}
 */
export const byRoleId = async (
  roleId: string,
  filters: FilterRolePermissionDTO
): Promise<RolePermission[]> => {
  return (await service.byRoleId(roleId, filters)).map(mapper.toRolePermission);
};

/**
 * @description Creates a RolePermission
 * @author Antonio Marasco
 * @date 11/17/2022
 * @param payload RolePermission object
 * @returns {*} Newly created RolePermission object
 */
export const create = async (
  payload: CreateRolePermissionDTO
): Promise<RolePermission> => {
  return mapper.toRolePermission(await service.create(payload));
};

/**
 * @description Deletes a RolePermission by Id
 * @author Antonio Marasco
 * @date 11/17/2022
 * @param roleId Id of the role
 * @param permissionId Id of the permission
 * @returns {*} True if delete was successful, otherwise false
 */
export const deleteById = async (
  roleId: string,
  permissionId: string
): Promise<boolean> => {
  const isDeleted = await service.deleteById(roleId, permissionId);

  return isDeleted;
};

/**
 * @description Deletes a RolePermission by Role Id
 * @author Antonio Marasco
 * @date 11/17/2022
 * @param permissionId Id of the user
 * @returns {*} True if delete was successful, otherwise false
 */
export const deleteBypermissionId = async (
  permissionId: string
): Promise<boolean> => {
  const isDeleted = await service.deleteByPermissionId(permissionId);

  return isDeleted;
};

/**
 * @description Deletes a RolePermission by Role Id
 * @author Antonio Marasco
 * @date 11/17/2022
 * @param roleId Id of the role
 * @returns {*} True if delete was successful, otherwise false
 */
export const deleteByRoleId = async (roleId: string): Promise<boolean> => {
  const isDeleted = await service.deleteByRoleId(roleId);

  return isDeleted;
};

/**
 * @description Updates a RolePermission
 * @author Antonio Marasco
 * @date 11/17/2022
 * @param roleId Id of the role
 * @param permissionId Id of the permission
 * @param payload RolePermission object
 * @returns {*} Newly updated RolePermission object
 */
export const update = async (
  roleId: string,
  permissionId: string,
  payload: UpdateRolePermissionDTO
): Promise<RolePermission> => {
  return mapper.toRolePermission(
    await service.update(roleId, permissionId, payload)
  );
};
