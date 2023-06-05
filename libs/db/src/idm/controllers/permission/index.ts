import * as service from '../../services/permission.service';
import {
  CreatePermissionDTO,
  FilterPermissionDTO,
  UpdatePermissionDTO
} from '../../dto/permission.dto';
import { Permission } from '../../interfaces';
import * as mapper from './mapper';

/**
 * @description Gets all Permission with filters
 * @author Antonio Marasco
 * @date 11/15/2022
 * @param filters Search criteria
 * @returns {*} List of Permissions
 */
export const all = async (
  filters: FilterPermissionDTO
): Promise<Permission[]> => {
  return (await service.all(filters)).map(mapper.toPermission);
};

/**
 * @description Gets a Permission by Id
 * @author Antonio Marasco
 * @date 11/16/2022
 * @param id
 * @returns {*}
 */
export const byId = async (id: string): Promise<Permission> => {
  return mapper.toPermission(await service.byId(id));
};

/**
 * @description Creates a Permission
 * @author Antonio Marasco
 * @date 11/16/2022
 * @param payload
 * @returns {*}
 */
export const create = async (
  payload: CreatePermissionDTO
): Promise<Permission> => {
  return mapper.toPermission(await service.create(payload));
};

/**
 * @description Deletes a Permission by Id
 * @author Antonio Marasco
 * @date 11/16/2022
 * @param id Permission Id
 * @returns {*} True if delete was successful, otherwise false
 */
export const deleteById = async (id: string): Promise<boolean> => {
  const isDeleted = await service.deleteById(id);

  return isDeleted;
};

/**
 * @description Updates a Permission
 * @author Antonio Marasco
 * @date 11/16/2022
 * @param id
 * @param payload
 * @returns {*}
 */
export const update = async (
  id: string,
  payload: UpdatePermissionDTO
): Promise<Permission> => {
  return mapper.toPermission(await service.update(id, payload));
};
