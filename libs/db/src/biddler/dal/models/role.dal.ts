/**
 * --------------------------------------------------------
 * @file Data Access Layer: Role
 * @description DAL should only data-base level logic (i.e. filters, finds, creates, updates)
 * @author Antonio Marasco
 * --------------------------------------------------------
 */
import { isNil } from 'lodash';
import { Op } from 'sequelize';
import { DbConfig } from '../../../common/constants/biddler.const';
import { AllRoleFilters } from './types';
import Role, { RoleInput, RoleOutput } from '../../models/role.model';

/**
 * @description Gets every [role]
 * @author Antonio Marasco
 * @date 05/22/2023
 * @param [filters]
 * @param [attributes]
 * @returns {*}
 */
export const all = async (filters?: AllRoleFilters): Promise<RoleOutput[]> => {
  //const _date = Date.now();
  return Role.findAll({
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
 * @description Gets [role] by Id(PK)
 * @author Antonio Marasco
 * @date 05/22/2023
 * @param id Id of [role]
 * @returns {*} [role]
 */
export const byId = async (id: string, filters?: AllRoleFilters): Promise<RoleOutput> => {
  const model = await Role.findByPk(id, {
    ...(filters?.attributes && { attributes: filters?.attributes }),
    logging: DbConfig.LOGGING
  });

  if (!model) {
    throw new Error(`not found:  cannot find by id: ${id}`);
  }

  return model;
};

/**
 * @description Creates a [role]
 * @author Antonio Marasco
 * @date 05/22/2023
 * @param payload
 * @returns {*} Newly created [role] object
 */
export const create = async (payload: RoleInput): Promise<RoleOutput> => {
  const output = await Role.create(payload, { logging: DbConfig.LOGGING });
  return output;
};

/**
 * @description Delete [role] by id
 * @author Antonio Marasco
 * @date 05/22/2023
 * @param id
 * @returns {*}
 */
export const deleteById = async (id: string): Promise<boolean> => {
  const deletedCount = await Role.destroy({ where: { id }, logging: DbConfig.LOGGING });

  return !!deletedCount;
};

/**
 * @description Finds or creates a [role] based on criteria
 * @author Antonio Marasco
 * @date 05/22/2023
 * @param payload
 * @returns {*}
 */
export const findOrCreate = async (payload: RoleInput): Promise<RoleOutput> => {
  const [model] = await Role.findOrCreate({
    where: {
      id: payload.id
    },
    defaults: payload
  });

  return model;
};

/**
 * @description Paginates [role] list based on filters
 * @author Antonio Marasco
 * @date 05/22/2023
 * @param [filters]
 * @returns {*}
 */
export const paginate = async (
  filters?: AllRoleFilters
): Promise<{ rows: RoleOutput[]; count: number }> => {
  if (!isNil(filters?.limit) && !isNil(filters?.offset)) {
    //const _date = Date.now();
    return Role.findAndCountAll({
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
 * @description Updates [role]
 * @author Antonio Marasco
 * @date 05/22/2023
 * @param id Id of [role] to update
 * @param payload [role] object
 * @returns {*}
 */
export const update = async (id: string, payload: Partial<RoleInput>): Promise<RoleOutput> => {
  const model = await Role.findByPk(id, { logging: DbConfig.LOGGING });
  if (!model) {
    throw new Error(`not found:  cannot find by id: ${id}`);
  }

  const updatedModel = await model.update(payload);
  return updatedModel;
};
