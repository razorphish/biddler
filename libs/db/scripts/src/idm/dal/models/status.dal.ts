import { Op } from 'sequelize';
import { StatusInput, StatusOutput } from '../../models/status.model';
import { AllStatusFilters } from '../types';
import { DbConfig } from '../../common/idm.const';
import { Status } from '../../models';
import { isNil } from 'lodash';

/**
 * @description Export all status(s)
 * @author Antonio Marasco
 * @date 05/25/2023
 * @param [filters]
 * @returns {*}
 */
export const all = async (filters?: AllStatusFilters): Promise<StatusOutput[]> => {
  return Status.findAll({
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
 * @description Gets status by id
 * @author Antonio Marasco
 * @date 05/25/2023
 * @param id
 * @param [filters]
 * @returns {*}
 */
export const byId = async (id: number, filters?: AllStatusFilters): Promise<StatusOutput> => {
  const model = await Status.findByPk(id, {
    ...(filters?.attributes && { attributes: filters?.attributes }),
    logging: DbConfig.LOGGING
  });

  if (!model) {
    throw new Error(`not found:  cannot find by id: ${id}`);
  }

  return model;
};

/**
 * @description Creates status
 * @author Antonio Marasco
 * @date 05/25/2023
 * @param payload
 * @returns {*} Newly created status
 */
export const create = async (payload: StatusInput): Promise<StatusOutput> => {
  const output = await Status.create(payload, { logging: DbConfig.LOGGING });
  return output;
};

/**
 * @description Delete status by id
 * @author Antonio Marasco
 * @date 03/22/2023
 * @param id
 * @returns {*}
 */
export const deleteById = async (id: number): Promise<boolean> => {
  const deletedCount = await Status.destroy({ where: { id }, logging: DbConfig.LOGGING });

  return !!deletedCount;
};

/**
 * @description Finds or creates a status based on criteria
 * @author Antonio Marasco
 * @date 05/25/2023
 * @param payload
 * @returns {*}
 */
export const findOrCreate = async (payload: StatusInput): Promise<StatusOutput> => {
  const [model] = await Status.findOrCreate({
    where: {
      id: payload.id
    },
    defaults: payload
  });

  return model;
};

/**
 * @description Paginates status(s) based on filters
 * @author Antonio Marasco
 * @date 05/25/2023
 * @param [filters]
 * @returns {*}
 */
export const paginate = async (
  filters?: AllStatusFilters
): Promise<{ rows: StatusOutput[]; count: number }> => {
  if (!isNil(filters?.limit) && !isNil(filters?.offset)) {
    return Status.findAndCountAll({
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
 * @description Updates status
 * @author Antonio Marasco
 * @date 05/25/2023
 * @param id Id of status to update
 * @param payload status object
 * @returns {*}
 */
export const update = async (id: number, payload: Partial<StatusInput>): Promise<StatusOutput> => {
  const model = await Status.findByPk(id, { logging: DbConfig.LOGGING });
  if (!model) {
    throw new Error(`not found:  cannot find by id: ${id}`);
  }

  const updatedModel = await model.update(payload);
  return updatedModel;
};
