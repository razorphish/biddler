/**
 * --------------------------------------------------------
 * @file Data Access Layer: Account
 * @description DAL should only data-base level logic (i.e. filters, finds, creates, updates)
 * @author Antonio Marasco
 * --------------------------------------------------------
 */
import { isNil } from 'lodash';
import { Op } from 'sequelize';
import { DbConfig } from '../../../common/constants/biddler.const';
import { AllAccountFilters } from './types';
import Account, { AccountInput, AccountOutput } from '../../models/account.model';

/**
 * @description Gets every [account]
 * @author Antonio Marasco
 * @date 05/22/2023
 * @param [filters]
 * @param [attributes]
 * @returns {*}
 */
export const all = async (filters?: AllAccountFilters): Promise<AccountOutput[]> => {
  //const _date = Date.now();
  return Account.findAll({
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
 * @description Gets [account] by Id(PK)
 * @author Antonio Marasco
 * @date 05/22/2023
 * @param id Id of [account]
 * @returns {*} [account]
 */
export const byId = async (id: number, filters?: AllAccountFilters): Promise<AccountOutput> => {
  const model = await Account.findByPk(id, {
    ...(filters?.attributes && { attributes: filters?.attributes }),
    logging: DbConfig.LOGGING
  });

  if (!model) {
    throw new Error(`not found:  cannot find by id: ${id}`);
  }

  return model;
};

/**
 * @description Creates a [account]
 * @author Antonio Marasco
 * @date 05/22/2023
 * @param payload
 * @returns {*} Newly created [account] object
 */
export const create = async (payload: AccountInput): Promise<AccountOutput> => {
  const output = await Account.create(payload, { logging: DbConfig.LOGGING });
  return output;
};

/**
 * @description Delete [account] by id
 * @author Antonio Marasco
 * @date 05/22/2023
 * @param id
 * @returns {*}
 */
export const deleteById = async (id: number): Promise<boolean> => {
  const deletedCount = await Account.destroy({ where: { id }, logging: DbConfig.LOGGING });

  return !!deletedCount;
};

/**
 * @description Finds or creates a [account] based on criteria
 * @author Antonio Marasco
 * @date 05/22/2023
 * @param payload
 * @returns {*}
 */
export const findOrCreate = async (payload: AccountInput): Promise<AccountOutput> => {
  const [model] = await Account.findOrCreate({
    where: {
      id: payload.id
    },
    defaults: payload
  });

  return model;
};

/**
 * @description Paginates [account] list based on filters
 * @author Antonio Marasco
 * @date 05/22/2023
 * @param [filters]
 * @returns {*}
 */
export const paginate = async (
  filters?: AllAccountFilters
): Promise<{ rows: AccountOutput[]; count: number }> => {
  if (!isNil(filters?.limit) && !isNil(filters?.offset)) {
    //const _date = Date.now();
    return Account.findAndCountAll({
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
 * @description Updates [account]
 * @author Antonio Marasco
 * @date 05/22/2023
 * @param id Id of [account] to update
 * @param payload [account] object
 * @returns {*}
 */
export const update = async (
  id: number,
  payload: Partial<AccountInput>
): Promise<AccountOutput> => {
  const model = await Account.findByPk(id, { logging: DbConfig.LOGGING });
  if (!model) {
    throw new Error(`not found:  cannot find by id: ${id}`);
  }

  const updatedModel = await model.update(payload);
  return updatedModel;
};
