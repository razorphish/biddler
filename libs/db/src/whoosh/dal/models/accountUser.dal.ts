/**
 * --------------------------------------------------------
 * @file Data Access Layer: AccountUser
 * @description DAL should only data-base level logic (i.e. filters, finds, creates, updates)
 * @author Antonio Marasco
 * --------------------------------------------------------
 */
import { isNil } from 'lodash';
import { Op } from 'sequelize';
import { DbConfig } from '../../../common/whoosh.const';
import { AccountUser } from '../../models';
import { AllAccountUserFilters } from './types';
import { AccountUserInput, AccountUserOutput } from '../../models/accountUser.model';

/**
 * @description Gets every [accountUser]
 * @author Antonio Marasco
 * @date 05/22/2023
 * @param [filters]
 * @param [attributes]
 * @returns {*}
 */
export const all = async (filters?: AllAccountUserFilters): Promise<AccountUserOutput[]> => {
  const _date = Date.now();
  return AccountUser.findAll({
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
 * @description Gets [accountUser] by Id(PK)
 * @author Antonio Marasco
 * @date 05/22/2023
 * @param accountId Id of [account]
 * @param userId id of user
 * @returns {*} [accountUser]
 */
export const byId = async (
  accountId: number,
  userId: number,
  filters?: AllAccountUserFilters
): Promise<AccountUserOutput> => {
  const model = await AccountUser.findOne({
    where: { accountId, userId },
    ...(filters?.attributes && { attributes: filters?.attributes }),
    logging: DbConfig.LOGGING
  });

  if (!model) {
    throw new Error(`not found:  cannot find by accountId: ${accountId}, userId: ${userId}`);
  }

  return model;
};

/**
 * @description Creates a [accountUser]
 * @author Antonio Marasco
 * @date 05/22/2023
 * @param payload
 * @returns {*} Newly created [accountUser] object
 */
export const create = async (payload: AccountUserInput): Promise<AccountUserOutput> => {
  const output = await AccountUser.create(payload, { logging: DbConfig.LOGGING });
  return output;
};

/**
 * @description Delete [accountUser] by id
 * @author Antonio Marasco
 * @date 05/22/2023
 * @param accountId id of account
 * @param userId id of user
 * @returns {*}
 */
export const deleteById = async (accountId: number, userId: number): Promise<boolean> => {
  const deletedCount = await AccountUser.destroy({
    where: { accountId, userId },
    logging: DbConfig.LOGGING
  });

  return !!deletedCount;
};

/**
 * @description Finds or creates a [accountUser] based on criteria
 * @author Antonio Marasco
 * @date 05/22/2023
 * @param payload
 * @returns {*}
 */
export const findOrCreate = async (payload: AccountUserInput): Promise<AccountUserOutput> => {
  const [model] = await AccountUser.findOrCreate({
    where: {
      accountId: payload.accountId,
      userId: payload.userId
    },
    defaults: payload
  });

  return model;
};

/**
 * @description Paginates [accountUser] list based on filters
 * @author Antonio Marasco
 * @date 05/22/2023
 * @param [filters]
 * @returns {*}
 */
export const paginate = async (
  filters?: AllAccountUserFilters
): Promise<{ rows: AccountUserOutput[]; count: number }> => {
  if (!isNil(filters?.limit) && !isNil(filters?.offset)) {
    const _date = Date.now();
    return AccountUser.findAndCountAll({
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
 * @description Updates [accountUser]
 * @author Antonio Marasco
 * @date 05/22/2023
 * @param accountId Id of account
 * @param userid id of user
 * @param payload [accountUser] object
 * @returns {*}
 */
export const update = async (
  accountId: number,
  userId: number,
  payload: Partial<AccountUserInput>
): Promise<AccountUserOutput> => {
  const model = await AccountUser.findOne({
    where: { accountId, userId },
    logging: DbConfig.LOGGING
  });
  if (!model) {
    throw new Error(`not found:  cannot find by accountId: ${accountId}, userId: ${userId}`);
  }

  const updatedModel = await model.update(payload);
  return updatedModel;
};
