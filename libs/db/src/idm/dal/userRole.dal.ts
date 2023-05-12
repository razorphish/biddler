import { Op } from 'sequelize';
import UserRole, { UserRoleInput, UserRoleOutput } from '../models/userRole.model';
import { AllUserRoleFilters } from './types';

/**
 * @description Gets all UserRoles
 * @author Antonio Marasco
 * @date 11/16/2022
 * @param [filters] Criteria to search
 * @returns {*}
 */
export const all = async (filters?: AllUserRoleFilters): Promise<UserRoleOutput[]> => {
  return UserRole.findAll({
    where: {
      ...(filters?.isDeleted && { deletedAt: { [Op.not]: null } }),
      ...(filters?.isActive && { statusId: { [Op.eq]: 'active' } })
    },
    ...((filters?.isDeleted || filters?.includeDeleted) && { paranoid: false })
  });
};

/**
 * @description Creates userRoles from an array
 * @author Antonio Marasco
 * @date 11/16/2022
 * @param userRoles Array of userRoles
 * @returns {*} Newly created userRoles
 */
export const bulkCreate = async (userRoles: UserRoleInput[]): Promise<UserRoleOutput[]> => {
  return UserRole.bulkCreate(userRoles);
};

/**
 * @description Gets UserRoles by Id(PK)
 * @author Antonio Marasco
 * @date 11/15/2022
 * @param id Id of UserRole
 * @returns {*} UserRole
 */
export const byId = async (
  userId: number,
  roleId: string,
  filters: AllUserRoleFilters
): Promise<UserRoleOutput> => {
  const currentDate = Date.now();

  const model = await UserRole.findOne({
    where: {
      userId,
      roleId,
      ...(filters?.isDeleted && { deletedAt: { [Op.not]: null } }),
      ...(filters?.isActive && { statusId: { [Op.eq]: 'active' } }),
      ...(filters?.isInEffectiveDateRange && {
        [Op.and]: {
          effectiveStartDate: { [Op.lte]: currentDate },
          effectiveEndDate: { [Op.gte]: currentDate }
        }
      })
    },
    ...((filters?.isDeleted || filters?.includeDeleted) && { paranoid: false })
  });

  if (!model) {
    throw new Error('not found');
  }

  return model;
};

/**
 * @description Gets UserRole(s) by User Id
 * @author Antonio Marasco
 * @date 11/16/2022
 * @param userId
 * @param [filters]
 * @returns {*}
 */
export const byUserId = async (
  userId: number,
  filters?: AllUserRoleFilters
): Promise<UserRoleOutput[]> => {
  const currentDate = Date.now();

  return UserRole.findAll({
    where: {
      userId,
      ...(filters?.isDeleted && { deletedAt: { [Op.not]: null } }),
      ...(filters?.isActive && { statusId: { [Op.eq]: 'active' } }),
      ...(filters?.isInEffectiveDateRange && {
        [Op.and]: {
          effectiveStartDate: { [Op.lte]: currentDate },
          effectiveEndDate: { [Op.gte]: currentDate }
        }
      })
    },
    ...((filters?.isDeleted || filters?.includeDeleted) && { paranoid: false })
  });
};

/**
 * @description Gets UserRole(s) by User Id
 * @author Antonio Marasco
 * @date 11/16/2022
 * @param roleId
 * @param [filters]
 * @returns {*}
 */
export const byRoleId = async (
  roleId: string,
  filters?: AllUserRoleFilters
): Promise<UserRoleOutput[]> => {
  const currentDate = Date.now();

  return UserRole.findAll({
    where: {
      roleId,
      ...(filters?.isDeleted && { deletedAt: { [Op.not]: null } }),
      ...(filters?.isActive && { statusId: { [Op.eq]: 'active' } }),
      ...(filters?.isInEffectiveDateRange && {
        [Op.and]: {
          effectiveStartDate: { [Op.lte]: currentDate },
          effectiveEndDate: { [Op.gte]: currentDate }
        }
      })
    },
    ...((filters?.isDeleted || filters?.includeDeleted) && { paranoid: false })
  });
};

/**
 * @description Creates UserRole
 * @author Antonio Marasco
 * @date 11/15/2022
 * @param payload
 * @returns {*} Newly created UserRole object
 */
export const create = async (payload: UserRoleInput): Promise<UserRoleOutput> => {
  const output = await UserRole.create(payload);
  return output;
};

/**
 * @description Deletes UserRole by Id
 * @author Antonio Marasco
 * @date 11/16/2022
 * @param id Id of UserRole
 * @returns {*} True if delete was successful, otherwise false
 */
export const deleteById = async (userId: number, roleId: string): Promise<boolean> => {
  const deletedCount = await UserRole.destroy({ where: { userId, roleId } });

  return !!deletedCount;
};

/**
 * @description Deletes UserRoles by User Id
 * @author Antonio Marasco
 * @date 11/16/2022
 * @param id Id of UserRole
 * @returns {*} True if delete was successful, otherwise false
 */
export const deleteByUserId = async (userId: number): Promise<boolean> => {
  const deletedCount = await UserRole.destroy({ where: { userId } });

  return !!deletedCount;
};

/**
 * @description Deletes UserRoles by Role Id
 * @author Antonio Marasco
 * @date 11/16/2022
 * @param id Id of UserRole
 * @returns {*} True if delete was successful, otherwise false
 */
export const deleteByRoleId = async (roleId: string): Promise<boolean> => {
  const deletedCount = await UserRole.destroy({ where: { roleId } });

  return !!deletedCount;
};

/**
 * @description Updates UserRole
 * @author Antonio Marasco
 * @date 11/16/2022
 * @param id
 * @param payload
 * @returns {*}
 */
export const update = async (
  userId: number,
  roleId: string,
  payload: Partial<UserRoleInput>
): Promise<UserRoleOutput> => {
  const model = await UserRole.findOne({ where: { userId, roleId } });
  if (!model) {
    throw new Error('not found');
  }

  const updatedModel = await model.update(payload);
  return updatedModel;
};
