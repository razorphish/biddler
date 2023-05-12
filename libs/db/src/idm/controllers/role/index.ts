import * as service from '../../services/role.service';
import {
  CreateRoleDTO,
  FilterRoleDTO,
  UpdateRoleDTO
} from '../../dto/role.dto';
import { Role } from '../../interfaces';
import * as mapper from './mapper';

/**
 * @description Gets all Role with filters
 * @author Antonio Marasco
 * @date 11/15/2022
 * @param filters Search criteria
 * @returns {*} List of Roles
 */
export const all = async (filters: FilterRoleDTO): Promise<Role[]> => {
  return (await service.all(filters)).map(mapper.toRole);
};

/**
 * @description Gets a Role by Id
 * @author Antonio Marasco
 * @date 11/16/2022
 * @param id
 * @returns {*}
 */
export const byId = async (id: string): Promise<Role> => {
  return mapper.toRole(await service.byId(id));
};

/**
 * @description Creates a Role
 * @author Antonio Marasco
 * @date 11/16/2022
 * @param payload
 * @returns {*}
 */
export const create = async (payload: CreateRoleDTO): Promise<Role> => {
  return mapper.toRole(await service.create(payload));
};

/**
 * @description Deletes a Role by Id
 * @author Antonio Marasco
 * @date 11/16/2022
 * @param id Role Id
 * @returns {*} True if delete was successful, otherwise false
 */
export const deleteById = async (id: string): Promise<boolean> => {
  const isDeleted = await service.deleteById(id);

  return isDeleted;
};

/**
 * @description Updates a Role
 * @author Antonio Marasco
 * @date 11/16/2022
 * @param id
 * @param payload
 * @returns {*}
 */
export const update = async (
  id: string,
  payload: UpdateRoleDTO
): Promise<Role> => {
  return mapper.toRole(await service.update(id, payload));
};
