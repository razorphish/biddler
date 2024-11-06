import { Op } from 'sequelize';
import { LookupInput, LookupOutput } from '../../models/lookup.model';
import { AllLookupFilters } from './types';
import { DbConfig } from '../../common/idm.const';
import { Lookup } from '../../models';
import { isNil } from 'lodash';

/**
 * @description Gets all lookup records
 * @author Antonio Marasco
 * @date 08/04/2023
 * @param [filters]
 * @returns {*}
 */
export const all = async (filters?: AllLookupFilters): Promise<LookupOutput[]> => {
  return Lookup.findAll({
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
 * @description Gets environment by id
 * @author Antonio Marasco
 * @date 08/04/2023
 * @param id
 * @param [filters]
 * @returns {*}
 */
export const byId = async (id: number, filters?: AllLookupFilters): Promise<LookupOutput> => {
  const model = await Lookup.findByPk(id, {
    ...(filters?.attributes && { attributes: filters?.attributes }),
    logging: DbConfig.LOGGING
  });

  if (!model) {
    throw new Error(`not found:  cannot find by id: ${id}`);
  }

  return model;
};

/**
 * @description Creates environment
 * @author Antonio Marasco
 * @date 08/04/2023
 * @param payload
 * @returns {*} Newly created environment
 */
export const create = async (payload: LookupInput): Promise<LookupOutput> => {
  const output = await Lookup.create(payload, { logging: DbConfig.LOGGING });
  return output;
};

/**
 * @description Delete by environment id
 * @author Antonio Marasco
 * @date 03/22/2023
 * @param id
 * @returns {*}
 */
export const deleteById = async (id: number): Promise<boolean> => {
  const deletedCount = await Lookup.destroy({ where: { id }, logging: DbConfig.LOGGING });

  return !!deletedCount;
};

/**
 * @description Finds or creates a environment based on criteria
 * @author Antonio Marasco
 * @date 08/04/2023
 * @param payload
 * @returns {*}
 */
export const findOrCreate = async (payload: LookupInput): Promise<LookupOutput> => {
  const [model] = await Lookup.findOrCreate({
    where: {
      id: payload.id
    },
    defaults: payload
  });

  return model;
};

/**
 * @description Paginates environment(s) based on filters
 * @author Antonio Marasco
 * @date 08/04/2023
 * @param [filters]
 * @returns {*}
 */
export const paginate = async (
  filters?: AllLookupFilters
): Promise<{ rows: LookupOutput[]; count: number }> => {
  if (!isNil(filters?.limit) && !isNil(filters?.offset)) {
    return Lookup.findAndCountAll({
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
 * @description Updates environment
 * @author Antonio Marasco
 * @date 08/04/2023
 * @param id Id of environment to update
 * @param payload environment object
 * @returns {*}
 */
export const update = async (id: number, payload: Partial<LookupInput>): Promise<LookupOutput> => {
  const model = await Lookup.findByPk(id, { logging: DbConfig.LOGGING });
  if (!model) {
    throw new Error(`not found:  cannot find by id: ${id}`);
  }

  const updatedModel = await model.update(payload);
  return updatedModel;
};
