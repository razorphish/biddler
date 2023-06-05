import { Op } from 'sequelize';
import { RoleInput, RoleOutput } from '../../models/role.model';
import { AllRoleFilters } from '../types';
import { DbConfig } from '../../common/idm.const';
import { Role } from '../../models';
import { isNil } from 'lodash';

/**
 * @description Gets all role records
 * @author Antonio Marasco
 * @date 05/25/2023
 * @param [filters]
 * @returns {*}
 */
export const all = async (filters?: AllRoleFilters): Promise<RoleOutput[]> => {
  return Role.findAll({
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
 * @description Gets role by id
 * @author Antonio Marasco
 * @date 05/25/2023
 * @param id
 * @param [filters]
 * @returns {*}
 */
export const byId = async (id: number, filters?: AllRoleFilters): Promise<RoleOutput> => {
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
 * @description Creates role
 * @author Antonio Marasco
 * @date 05/25/2023
 * @param payload
 * @returns {*} Newly created role
 */
export const create = async (payload: RoleInput): Promise<RoleOutput> => {
  const output = await Role.create(payload, { logging: DbConfig.LOGGING });
  return output;
};

/**
 * @description Delete role by id
 * @author Antonio Marasco
 * @date 03/22/2023
 * @param id
 * @returns {*}
 */
export const deleteById = async (id: number): Promise<boolean> => {
  const deletedCount = await Role.destroy({ where: { id }, logging: DbConfig.LOGGING });

  return !!deletedCount;
};

/**
 * @description Finds or creates a role based on criteria
 * @author Antonio Marasco
 * @date 05/25/2023
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
 * @description Paginates role(s) based on filters
 * @author Antonio Marasco
 * @date 05/25/2023
 * @param [filters]
 * @returns {*}
 */
export const paginate = async (
  filters?: AllRoleFilters
): Promise<{ rows: RoleOutput[]; count: number }> => {
  if (!isNil(filters?.limit) && !isNil(filters?.offset)) {
    return Role.findAndCountAll({
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
 * @description Updates role
 * @author Antonio Marasco
 * @date 05/25/2023
 * @param id Id of role to update
 * @param payload role object
 * @returns {*}
 */
export const update = async (id: number, payload: Partial<RoleInput>): Promise<RoleOutput> => {
  const model = await Role.findByPk(id, { logging: DbConfig.LOGGING });
  if (!model) {
    throw new Error(`not found:  cannot find by id: ${id}`);
  }

  const updatedModel = await model.update(payload);
  return updatedModel;
};
