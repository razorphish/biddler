import { Op } from 'sequelize';
import { ApplicationInput, ApplicationOutput } from '../../models/application.model';
import { AllApplicationFilters } from '../types';
import { DbConfig } from '../../common/idm.const';
import { Application } from '../../models';
import { isNil } from 'lodash';

/**
 * @description Gets all application records
 * @author Antonio Marasco
 * @date 05/25/2023
 * @param [filters]
 * @returns {*}
 */
export const all = async (filters?: AllApplicationFilters): Promise<ApplicationOutput[]> => {
  return Application.findAll({
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
 * @description Gets api client by id
 * @author Antonio Marasco
 * @date 05/25/2023
 * @param id
 * @param [filters]
 * @returns {*}
 */
export const byId = async (
  id: number,
  filters?: AllApplicationFilters
): Promise<ApplicationOutput> => {
  const model = await Application.findByPk(id, {
    ...(filters?.attributes && { attributes: filters?.attributes }),
    logging: DbConfig.LOGGING
  });

  if (!model) {
    throw new Error(`not found:  cannot find by id: ${id}`);
  }

  return model;
};

/**
 * @description Creates api client
 * @author Antonio Marasco
 * @date 05/25/2023
 * @param payload
 * @returns {*} Newly created api client
 */
export const create = async (payload: ApplicationInput): Promise<ApplicationOutput> => {
  const output = await Application.create(payload, { logging: DbConfig.LOGGING });
  return output;
};

/**
 * @description Delete by api client
 * @author Antonio Marasco
 * @date 03/22/2023
 * @param id
 * @returns {*}
 */
export const deleteById = async (id: number): Promise<boolean> => {
  const deletedCount = await Application.destroy({ where: { id }, logging: DbConfig.LOGGING });

  return !!deletedCount;
};

/**
 * @description Finds or creates a api client based on criteria
 * @author Antonio Marasco
 * @date 05/25/2023
 * @param payload
 * @returns {*}
 */
export const findOrCreate = async (payload: ApplicationInput): Promise<ApplicationOutput> => {
  const [model] = await Application.findOrCreate({
    where: {
      id: payload.id
    },
    defaults: payload
  });

  return model;
};

/**
 * @description Paginates api client(s) based on filters
 * @author Antonio Marasco
 * @date 05/25/2023
 * @param [filters]
 * @returns {*}
 */
export const paginate = async (
  filters?: AllApplicationFilters
): Promise<{ rows: ApplicationOutput[]; count: number }> => {
  if (!isNil(filters?.limit) && !isNil(filters?.offset)) {
    return Application.findAndCountAll({
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
 * @description Updates api client
 * @author Antonio Marasco
 * @date 05/25/2023
 * @param id Id of api client to update
 * @param payload api client object
 * @returns {*}
 */
export const update = async (
  id: number,
  payload: Partial<ApplicationInput>
): Promise<ApplicationOutput> => {
  const model = await Application.findByPk(id, { logging: DbConfig.LOGGING });
  if (!model) {
    throw new Error(`not found:  cannot find by id: ${id}`);
  }

  const updatedModel = await model.update(payload);
  return updatedModel;
};
