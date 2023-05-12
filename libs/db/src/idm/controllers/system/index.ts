import * as service from '../../services/system.service';
import { CreateSystemDTO, FilterSystemDTO } from '../../dto/system.dto';
import { System } from '../../interfaces';
import * as mapper from './mapper';

export const create = async (payload: CreateSystemDTO): Promise<System> => {
  return mapper.toSystem(await service.create(payload));
};

/**
 * @description Gets all System with filters
 * @author Antonio Marasco
 * @date 11/15/2022
 * @param filters Search criteria
 * @returns {*} List of Systems
 */
export const all = async (filters: FilterSystemDTO): Promise<System[]> => {
  return (await service.all(filters)).map(mapper.toSystem);
};
