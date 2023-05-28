/**
 * --------------------------------------------------------
 * @file Data Access Layer: AccountUserRole
 * @description DAL should only data-base level logic (i.e. filters, finds, creates, updates)
 * @author Antonio Marasco
 * --------------------------------------------------------
 */
import { isNil } from 'lodash';
import { Op } from 'sequelize';
import { DbConfig } from '../../../common/whoosh.const';
import { AccountUserRole } from '../../models';
import { AllAccountUserRoleFilters } from './types';
import { AccountUserRoleInput, AccountUserRoleOutput } from '../../models/accountUserRole.model';

/**
 * @description Gets every [accountUserRole]
 * @author Antonio Marasco
 * @date 05/22/2023
 * @param [filters]
 * @param [attributes]
 * @returns {*}
 */
export const all = async (
  filters?: AllAccountUserRoleFilters
): Promise<AccountUserRoleOutput[]> => {
  const _date = Date.now();
  return AccountUserRole.findAll({
    ...(filters?.attributes && { attributes: filters?.attributes }),
    where: {
      ...(filters?.isDeleted && { deletedAt: { [Op.not]: null } }),
      ...(filters?.status && { statusId: { [Op.eq]: filters.status } }),
      ...(filters?.checkEffectiveDate && {
        [Op.and]: {
          effectiveStartDate: { [Op.lte]: { _date } },
          effectiveEndDate: { [Op.gte]: { _date } }
        }
      })
    },
    //...(filters?.orderBySortOrder && { order: [['sortOrder', 'ASC']] }),
    ...((filters?.isDeleted || filters?.includeDeleted) && { paranoid: false }),
    logging: DbConfig.LOGGING
  });
};

/**
 * @description Gets [accountUserRole] by Id(PK)
 * @author Antonio Marasco
 * @date 05/22/2023
 * @param accountId id of account
 * @param userId id of user
 * @param roleId id of role
 * @returns {*} [accountUserRole]
 */
export const byId = async (
  accountId: number,
  userId: number,
  roleId: string,
  filters?: AllAccountUserRoleFilters
): Promise<AccountUserRoleOutput> => {
  const model = await AccountUserRole.findOne({
    where: { accountId, userId, roleId },
    ...(filters?.attributes && { attributes: filters?.attributes }),
    logging: DbConfig.LOGGING
  });

  if (!model) {
    throw new Error(
      `not found:  cannot find by accountId: ${accountId}, userId: ${userId}, roleId: ${roleId}`
    );
  }

  return model;
};

/**
 * @description Creates a [accountUserRole]
 * @author Antonio Marasco
 * @date 05/22/2023
 * @param payload
 * @returns {*} Newly created [accountUserRole] object
 */
export const create = async (payload: AccountUserRoleInput): Promise<AccountUserRoleOutput> => {
  const output = await AccountUserRole.create(payload, { logging: DbConfig.LOGGING });
  return output;
};

/**
 * @description Delete [accountUserRole] by id
 * @author Antonio Marasco
 * @date 05/22/2023
 * @param accountId id of account
 * @param userId id of user
 * @param roleId id of role
 * @returns {*}
 */
export const deleteById = async (
  accountId: number,
  userId: number,
  roleId: string
): Promise<boolean> => {
  const deletedCount = await AccountUserRole.destroy({
    where: { accountId, userId, roleId },
    logging: DbConfig.LOGGING
  });

  return !!deletedCount;
};

/**
 * @description Finds or creates a [accountUserRole] based on criteria
 * @author Antonio Marasco
 * @date 05/22/2023
 * @param payload
 * @returns {*}
 */
export const findOrCreate = async (
  payload: AccountUserRoleInput
): Promise<AccountUserRoleOutput> => {
  const [model] = await AccountUserRole.findOrCreate({
    where: {
      accountId: payload.accountId,
      userId: payload.userId,
      roleId: payload.roleId
    },
    defaults: payload
  });

  return model;
};

/**
 * @description Paginates [accountUserRole] list based on filters
 * @author Antonio Marasco
 * @date 05/22/2023
 * @param [filters]
 * @returns {*}
 */
export const paginate = async (
  filters?: AllAccountUserRoleFilters
): Promise<{ rows: AccountUserRoleOutput[]; count: number }> => {
  if (!isNil(filters?.limit) && !isNil(filters?.offset)) {
    const _date = Date.now();
    return AccountUserRole.findAndCountAll({
      ...(filters?.attributes && { attributes: filters?.attributes }),
      limit: filters.limit,
      offset: (filters.offset - 1) * filters.limit,
      where: {
        ...(filters?.isDeleted && { deletedAt: { [Op.not]: null } }),
        ...(filters?.status && { statusId: { [Op.eq]: filters.status } }),
        ...(filters?.checkEffectiveDate && {
          [Op.and]: {
            effectiveStartDate: { [Op.lte]: { _date } },
            effectiveEndDate: { [Op.gte]: { _date } }
          }
        })
      },
      //...(filters?.orderBySortOrder && { order: [['sortOrder', 'ASC']] }),
      ...((filters?.isDeleted || filters?.includeDeleted) && { paranoid: false }),
      logging: DbConfig.LOGGING
    });
  }
  throw new Error(`bad request:  missing parameters => ${JSON.stringify(filters)}`);
};

/**
 * @description Updates [accountUserRole]
 * @author Antonio Marasco
 * @date 05/22/2023
 * @param accountId id of account
 * @param userId id of user
 * @param roleId id of role
 * @param payload [accountUserRole] object
 * @returns {*}
 */
export const update = async (
  accountId: number,
  userId: number,
  roleId: string,
  payload: Partial<AccountUserRoleInput>
): Promise<AccountUserRoleOutput> => {
  const model = await AccountUserRole.findOne({
    where: { accountId, userId, roleId },
    logging: DbConfig.LOGGING
  });
  if (!model) {
    throw new Error(
      `not found:  cannot find by accountId: ${accountId}, userId: ${userId}, roleId: ${roleId}`
    );
  }

  const updatedModel = await model.update(payload);
  return updatedModel;
};
