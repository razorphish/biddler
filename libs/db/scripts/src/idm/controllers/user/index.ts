import * as service from '../../services/user.service';
import {
  CreateUserDTO,
  FilterUserDTO,
  UpdateUserDTO
} from '../../dto/user.dto';
import { User } from '../../interfaces';
import * as mapper from './mapper';

/**
 * @description Gets all User with filters
 * @author Antonio Marasco
 * @date 11/15/2022
 * @param filters Search criteria
 * @returns {*} List of Users
 */
export const all = async (filters: FilterUserDTO): Promise<User[]> => {
  return (await service.all(filters)).map(mapper.toUser);
};

/**
 * @description Gets a User by Id
 * @author Antonio Marasco
 * @date 11/16/2022
 * @param id
 * @returns {*}
 */
export const byId = async (id: number): Promise<User> => {
  return mapper.toUser(await service.byId(id));
};

/**
 * @description Creates a user
 * @author Antonio Marasco
 * @date 11/16/2022
 * @param payload
 * @returns {*}
 */
export const create = async (payload: CreateUserDTO): Promise<User> => {
  return mapper.toUser(await service.create(payload));
};

/**
 * @description Deletes a user by Id
 * @author Antonio Marasco
 * @date 11/16/2022
 * @param id User Id
 * @returns {*} True if delete was successful, otherwise false
 */
export const deleteById = async (id: number): Promise<boolean> => {
  const isDeleted = await service.deleteById(id);

  return isDeleted;
};

/**
 * @description Updates a user
 * @author Antonio Marasco
 * @date 11/16/2022
 * @param id
 * @param payload
 * @returns {*}
 */
export const update = async (
  id: number,
  payload: UpdateUserDTO
): Promise<User> => {
  return mapper.toUser(await service.update(id, payload));
};
