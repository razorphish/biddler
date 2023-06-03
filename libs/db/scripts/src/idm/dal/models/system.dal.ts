import { Op } from 'sequelize';
import { SystemInput, SystemOutput } from '../../models/system.model';
import { AllSystemFilters } from '../types';
import { DbConfig } from '../../common/idm.const';
import { System } from '../../models';
import { isNil } from 'lodash';

/**
 * @description Export all system(s)
 * @author Antonio Marasco
 * @date 05/25/2023
 * @param [filters]
 * @returns {*}
 */
export const all = async (filters?: AllSystemFilters): Promise<SystemOutput[]> => {
  return System.findAll({
    ...(filters?.attributes && { attributes: filters?.attributes }),
    where: {
      ...(filters?.isDeleted && { deletedAt: { [Op.not]: null } }),
      ...(filters?.status && { statusId: { [Op.eq]: filters.status } })
    },
    ...(filters?.orderBySortOrder && { order: [['sortOrder', 'ASC']] }),
    ...((filters?.isDeleted || filters?.includeDeleted) && { paranoid: false }),
    logging: DbConfig.LOGGING
  });
};

/**
 * @description Gets system by id
 * @author Antonio Marasco
 * @date 05/25/2023
 * @param id
 * @param [filters]
 * @returns {*}
 */
export const byId = async (id: number, filters?: AllSystemFilters): Promise<SystemOutput> => {
  const model = await System.findByPk(id, {
    ...(filters?.attributes && { attributes: filters?.attributes }),
    logging: DbConfig.LOGGING
  });

  if (!model) {
    throw new Error(`not found:  cannot find by id: ${id}`);
  }

  return model;
};

/**
 * @description Creates system
 * @author Antonio Marasco
 * @date 05/25/2023
 * @param payload
 * @returns {*} Newly created system
 */
export const create = async (payload: SystemInput): Promise<SystemOutput> => {
  const output = await System.create(payload, { logging: DbConfig.LOGGING });
  return output;
};

/**
 * @description Delete system by id
 * @author Antonio Marasco
 * @date 03/22/2023
 * @param id
 * @returns {*}
 */
export const deleteById = async (id: number): Promise<boolean> => {
  const deletedCount = await System.destroy({ where: { id }, logging: DbConfig.LOGGING });

  return !!deletedCount;
};

/**
 * @description Finds or creates a system based on criteria
 * @author Antonio Marasco
 * @date 05/25/2023
 * @param payload
 * @returns {*}
 */
export const findOrCreate = async (payload: SystemInput): Promise<SystemOutput> => {
  const [model] = await System.findOrCreate({
    where: {
      id: payload.id
    },
    defaults: payload
  });

  return model;
};

/**
 * @description Paginates system(s) based on filters
 * @author Antonio Marasco
 * @date 05/25/2023
 * @param [filters]
 * @returns {*}
 */
export const paginate = async (
  filters?: AllSystemFilters
): Promise<{ rows: SystemOutput[]; count: number }> => {
  if (!isNil(filters?.limit) && !isNil(filters?.offset)) {
    return System.findAndCountAll({
      ...(filters?.attributes && { attributes: filters?.attributes }),
      limit: filters.limit,
      offset: (filters.offset - 1) * filters.limit,
      where: {
        ...(filters?.isDeleted && { deletedAt: { [Op.not]: null } }),
        ...(filters?.status && { statusId: { [Op.eq]: filters.status } })
      },
      ...(filters?.orderBySortOrder && { order: [['sortOrder', 'ASC']] }),
      ...((filters?.isDeleted || filters?.includeDeleted) && { paranoid: false }),
      logging: DbConfig.LOGGING
    });
  }
  throw new Error(`bad request:  missing parameters => ${JSON.stringify(filters)}`);
};

/**
 * @description Updates system
 * @author Antonio Marasco
 * @date 05/25/2023
 * @param id Id of system to update
 * @param payload system object
 * @returns {*}
 */
export const update = async (id: number, payload: Partial<SystemInput>): Promise<SystemOutput> => {
  const model = await System.findByPk(id, { logging: DbConfig.LOGGING });
  if (!model) {
    throw new Error(`not found:  cannot find by id: ${id}`);
  }

  const updatedModel = await model.update(payload);
  return updatedModel;
};
