import * as service from '../../services/application.service';
import {
  CreateApplicationDTO,
  FilterApplicationDTO,
  UpdateApplicationDTO
} from '../../dto/application.dto';
import { Application } from '../../interfaces';
import * as mapper from './mapper';

/**
 * @description Gets all Application with filters
 * @author Antonio Marasco
 * @date 11/23/2022
 * @param filters Search criteria
 * @returns {*} List of Applications
 */
export const all = async (
  filters: FilterApplicationDTO
): Promise<Application[]> => {
  return (await service.all(filters)).map(mapper.toApplication);
};

/**
 * @description Gets a Application by Id
 * @author Antonio Marasco
 * @date 11/23/2022
 * @param id
 * @returns {*}
 */
export const byId = async (id: string): Promise<Application> => {
  return mapper.toApplication(await service.byId(id));
};

/**
 * @description Creates a Application
 * @author Antonio Marasco
 * @date 11/23/2022
 * @param payload
 * @returns {*}
 */
export const create = async (
  payload: CreateApplicationDTO
): Promise<Application> => {
  return mapper.toApplication(await service.create(payload));
};

/**
 * @description Deletes a Application by Id
 * @author Antonio Marasco
 * @date 11/23/2022
 * @param id Application Id
 * @returns {*} True if delete was successful, otherwise false
 */
export const deleteById = async (id: string): Promise<boolean> => {
  const isDeleted = await service.deleteById(id);

  return isDeleted;
};

/**
 * @description Updates a Application
 * @author Antonio Marasco
 * @date 11/23/2022
 * @param id
 * @param payload
 * @returns {*}
 */
export const update = async (
  id: string,
  payload: UpdateApplicationDTO
): Promise<Application> => {
  return mapper.toApplication(await service.update(id, payload));
};
