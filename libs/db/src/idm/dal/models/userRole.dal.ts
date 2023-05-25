import { Op } from 'sequelize';
import { UserRoleInput, UserRoleOutput } from '../../models/userRole.model';
import { AllUserRoleFilters } from '../types';
import { DbConfig } from '../../common/idm.const';
import { UserRole } from '../../models';
import { isNil } from 'lodash';

/**
 * @description Export all user role(s)
 * @author Antonio Marasco
 * @date 05/25/2023
 * @param [filters]
 * @returns {*}
 */
export const all = async (filters?: AllUserRoleFilters): Promise<UserRoleOutput[]> => {
  return UserRole.findAll({
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
 * @description Gets user role by id
 * @author Antonio Marasco
 * @date 05/25/2023
 * @param userId
 * @param roleId
 * @param [filters]
 * @returns {*}
 */
export const byId = async (
  userId: number,
  roleId: string,
  filters?: AllUserRoleFilters
): Promise<UserRoleOutput> => {
  const model = await UserRole.findOne({
    where: { userId, roleId },
    ...(filters?.attributes && { attributes: filters?.attributes }),
    logging: DbConfig.LOGGING
  });

  if (!model) {
    throw new Error(`not found:  cannot find by userId: ${userId}, roleId: ${roleId}`);
  }

  return model;
};

/**
 * @description Creates user role
 * @author Antonio Marasco
 * @date 05/25/2023
 * @param payload
 * @returns {*} Newly created user role
 */
export const create = async (payload: UserRoleInput): Promise<UserRoleOutput> => {
  const output = await UserRole.create(payload, { logging: DbConfig.LOGGING });
  return output;
};

/**
 * @description Delete user role by id
 * @author Antonio Marasco
 * @date 03/22/2023
 * @param userId
 * @param roleId
 * @returns {*}
 */
export const deleteById = async (userId: number, roleId: string): Promise<boolean> => {
  const deletedCount = await UserRole.destroy({
    where: { userId, roleId },
    logging: DbConfig.LOGGING
  });

  return !!deletedCount;
};

/**
 * @description Finds or creates a user role based on criteria
 * @author Antonio Marasco
 * @date 05/25/2023
 * @param payload
 * @returns {*}
 */
export const findOrCreate = async (payload: UserRoleInput): Promise<UserRoleOutput> => {
  const [model] = await UserRole.findOrCreate({
    where: {
      userId: payload.userId,
      roleId: payload.roleId
    },
    defaults: payload
  });

  return model;
};

/**
 * @description Paginates user role(s) based on filters
 * @author Antonio Marasco
 * @date 05/25/2023
 * @param [filters]
 * @returns {*}
 */
export const paginate = async (
  filters?: AllUserRoleFilters
): Promise<{ rows: UserRoleOutput[]; count: number }> => {
  if (!isNil(filters?.limit) && !isNil(filters?.offset)) {
    return UserRole.findAndCountAll({
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
 * @description Updates user role
 * @author Antonio Marasco
 * @date 05/25/2023
 * @param userId Id of user
 * @param roleId Id of role
 * @param payload user role object
 * @returns {*}
 */
export const update = async (
  userId: number,
  roleId: string,
  payload: Partial<UserRoleInput>
): Promise<UserRoleOutput> => {
  const model = await UserRole.findOne({
    where: {
      userId,
      roleId
    },
    logging: DbConfig.LOGGING
  });
  if (!model) {
    throw new Error(`not found:  cannot find by userId: ${userId}, roleId: ${roleId}`);
  }

  const updatedModel = await model.update(payload);
  return updatedModel;
};
