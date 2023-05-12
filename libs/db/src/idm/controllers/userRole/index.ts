import * as service from '../../services/userRole.service';
import {
  CreateUserRoleDTO,
  FilterUserRoleDTO,
  UpdateUserRoleDTO
} from '../../dto/userRole.dto';
import { UserRole } from '../../interfaces';
import * as mapper from './mapper';

/**
 * @description Gets all UserRole with filters
 * @author Antonio Marasco
 * @date 11/15/2022
 * @param filters Search criteria
 * @returns {*} List of UserRoles
 */
export const all = async (filters: FilterUserRoleDTO): Promise<UserRole[]> => {
  return (await service.all(filters)).map(mapper.toUserRole);
};

/**
 * @description Gets a UserRole by Id
 * @author Antonio Marasco
 * @date 11/16/2022
 * @param userId Id of the user
 * @param roleId Id of the role
 * @returns {*}
 */
export const byId = async (
  userId: number,
  roleId: string,
  filters: FilterUserRoleDTO
): Promise<UserRole> => {
  return mapper.toUserRole(await service.byId(userId, roleId, filters));
};

/**
 * @description Gets a UserRole by User Id
 * @author Antonio Marasco
 * @date 11/16/2022
 * @param userId Id of the user
 * @returns {*}
 */
export const byUserId = async (
  userId: number,
  filters: FilterUserRoleDTO
): Promise<UserRole[]> => {
  return (await service.byUserId(userId, filters)).map(mapper.toUserRole);
};

/**
 * @description Gets a UserRole by User Id
 * @author Antonio Marasco
 * @date 11/16/2022
 * @param roleId Id of the user
 * @returns {*}
 */
export const byRoleId = async (
  roleId: string,
  filters: FilterUserRoleDTO
): Promise<UserRole[]> => {
  return (await service.byRoleId(roleId, filters)).map(mapper.toUserRole);
};

/**
 * @description Creates a UserRole
 * @author Antonio Marasco
 * @date 11/16/2022
 * @param payload UserRole object
 * @returns {*} Newly created UserRole object
 */
export const create = async (payload: CreateUserRoleDTO): Promise<UserRole> => {
  return mapper.toUserRole(await service.create(payload));
};

/**
 * @description Deletes a UserRole by Id
 * @author Antonio Marasco
 * @date 11/16/2022
 * @param userId Id of the user
 * @param roleId Id of the role
 * @returns {*} True if delete was successful, otherwise false
 */
export const deleteById = async (
  userId: number,
  roleId: string
): Promise<boolean> => {
  const isDeleted = await service.deleteById(userId, roleId);

  return isDeleted;
};

/**
 * @description Deletes a UserRole by Role Id
 * @author Antonio Marasco
 * @date 11/16/2022
 * @param userId Id of the user
 * @returns {*} True if delete was successful, otherwise false
 */
export const deleteByUserId = async (userId: number): Promise<boolean> => {
  const isDeleted = await service.deleteByUserId(userId);

  return isDeleted;
};

/**
 * @description Deletes a UserRole by Role Id
 * @author Antonio Marasco
 * @date 11/16/2022
 * @param roleId Id of the role
 * @returns {*} True if delete was successful, otherwise false
 */
export const deleteByRoleId = async (roleId: string): Promise<boolean> => {
  const isDeleted = await service.deleteByRoleId(roleId);

  return isDeleted;
};

/**
 * @description Updates a UserRole
 * @author Antonio Marasco
 * @date 11/16/2022
 * @param userId Id of the user
 * @param roleId Id of the role
 * @param payload UserRole object
 * @returns {*} Newly updated UserRole object
 */
export const update = async (
  userId: number,
  roleId: string,
  payload: UpdateUserRoleDTO
): Promise<UserRole> => {
  return mapper.toUserRole(await service.update(userId, roleId, payload));
};
