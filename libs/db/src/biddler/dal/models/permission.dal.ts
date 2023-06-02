/**
 * --------------------------------------------------------
 * @file Data Access Layer: Permission
 * @description DAL should only data-base level logic (i.e. filters, finds, creates, updates)
 * @author Antonio Marasco
 * --------------------------------------------------------
 */
import { isNil } from 'lodash';
import { Op } from 'sequelize';
import { DbConfig } from '../../../common/biddler.const';
import { AllPermissionFilters } from './types';
import Permission, { PermissionInput, PermissionOutput } from '../../models/permission.model';

/**
 * @description Gets every [permission]
 * @author Antonio Marasco
 * @date 05/22/2023
 * @param [filters]
 * @param [attributes]
 * @returns {*}
 */
export const all = async (filters?: AllPermissionFilters): Promise<PermissionOutput[]> => {
  //const _date = Date.now();
  return Permission.findAll({
    ...(filters?.attributes && { attributes: filters?.attributes }),
    where: {
      ...(filters?.isDeleted && { deletedAt: { [Op.not]: null } }),
      ...(filters?.status && { statusId: { [Op.eq]: filters.status } })
      // ...(filters?.checkEffectiveDate && {
      //   [Op.and]: {
      //     effectiveStartDate: { [Op.lte]: { _date } },
      //     effectiveEndDate: { [Op.gte]: { _date } }
      //   }
      // })
    },
    //...(filters?.orderBySortOrder && { order: [['sortOrder', 'ASC']] }),
    ...((filters?.isDeleted || filters?.includeDeleted) && { paranoid: false }),
    logging: DbConfig.LOGGING
  });
};

/**
 * @description Gets [permission] by Id(PK)
 * @author Antonio Marasco
 * @date 05/22/2023
 * @param id Id of [permission]
 * @returns {*} [permission]
 */
export const byId = async (
  id: string,
  filters?: AllPermissionFilters
): Promise<PermissionOutput> => {
  const model = await Permission.findByPk(id, {
    ...(filters?.attributes && { attributes: filters?.attributes }),
    logging: DbConfig.LOGGING
  });

  if (!model) {
    throw new Error(`not found:  cannot find by id: ${id}`);
  }

  return model;
};

/**
 * @description Creates a [permission]
 * @author Antonio Marasco
 * @date 05/22/2023
 * @param payload
 * @returns {*} Newly created [permission] object
 */
export const create = async (payload: PermissionInput): Promise<PermissionOutput> => {
  const output = await Permission.create(payload, { logging: DbConfig.LOGGING });
  return output;
};

/**
 * @description Delete [permission] by id
 * @author Antonio Marasco
 * @date 05/22/2023
 * @param id
 * @returns {*}
 */
export const deleteById = async (id: string): Promise<boolean> => {
  const deletedCount = await Permission.destroy({ where: { id }, logging: DbConfig.LOGGING });

  return !!deletedCount;
};

/**
 * @description Finds or creates a [permission] based on criteria
 * @author Antonio Marasco
 * @date 05/22/2023
 * @param payload
 * @returns {*}
 */
export const findOrCreate = async (payload: PermissionInput): Promise<PermissionOutput> => {
  const [model] = await Permission.findOrCreate({
    where: {
      id: payload.id
    },
    defaults: payload
  });

  return model;
};

/**
 * @description Paginates [permission] list based on filters
 * @author Antonio Marasco
 * @date 05/22/2023
 * @param [filters]
 * @returns {*}
 */
export const paginate = async (
  filters?: AllPermissionFilters
): Promise<{ rows: PermissionOutput[]; count: number }> => {
  if (!isNil(filters?.limit) && !isNil(filters?.offset)) {
    //const _date = Date.now();
    return Permission.findAndCountAll({
      ...(filters?.attributes && { attributes: filters?.attributes }),
      limit: filters.limit,
      offset: (filters.offset - 1) * filters.limit,
      where: {
        ...(filters?.isDeleted && { deletedAt: { [Op.not]: null } }),
        ...(filters?.status && { statusId: { [Op.eq]: filters.status } })
        // ...(filters?.checkEffectiveDate && {
        //   [Op.and]: {
        //     effectiveStartDate: { [Op.lte]: { _date } },
        //     effectiveEndDate: { [Op.gte]: { _date } }
        //   }
        // })
      },
      //...(filters?.orderBySortOrder && { order: [['sortOrder', 'ASC']] }),
      ...((filters?.isDeleted || filters?.includeDeleted) && { paranoid: false }),
      logging: DbConfig.LOGGING
    });
  }
  throw new Error(`bad request:  missing parameters => ${JSON.stringify(filters)}`);
};

/**
 * @description Updates [permission]
 * @author Antonio Marasco
 * @date 05/22/2023
 * @param id Id of [permission] to update
 * @param payload [permission] object
 * @returns {*}
 */
export const update = async (
  id: string,
  payload: Partial<PermissionInput>
): Promise<PermissionOutput> => {
  const model = await Permission.findByPk(id, { logging: DbConfig.LOGGING });
  if (!model) {
    throw new Error(`not found:  cannot find by id: ${id}`);
  }

  const updatedModel = await model.update(payload);
  return updatedModel;
};
