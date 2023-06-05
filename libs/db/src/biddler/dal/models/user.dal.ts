/**
 * --------------------------------------------------------
 * @file Data Access Layer: User
 * @description DAL should only data-base level logic (i.e. filters, finds, creates, updates)
 * @author Antonio Marasco
 * --------------------------------------------------------
 */
import { isNil } from 'lodash';
import { Op } from 'sequelize';
import { DbConfig } from '../../../common/biddler.const';
import { AllUserFilters } from './types';
import User, { UserInput, UserOutput } from '../../models/user.model';

/**
 * @description Gets every [user]
 * @author Antonio Marasco
 * @date 05/22/2023
 * @param [filters]
 * @param [attributes]
 * @returns {*}
 */
export const all = async (filters?: AllUserFilters): Promise<UserOutput[]> => {
  //const _date = Date.now();
  return User.findAll({
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
 * @description Gets [user] by Id(PK)
 * @author Antonio Marasco
 * @date 05/22/2023
 * @param id Id of [user]
 * @returns {*} [user]
 */
export const byId = async (id: number, filters?: AllUserFilters): Promise<UserOutput> => {
  const model = await User.findByPk(id, {
    ...(filters?.attributes && { attributes: filters?.attributes }),
    logging: DbConfig.LOGGING
  });

  if (!model) {
    throw new Error(`not found:  cannot find by id: ${id}`);
  }

  return model;
};

/**
 * @description Creates a [user]
 * @author Antonio Marasco
 * @date 05/22/2023
 * @param payload
 * @returns {*} Newly created [user] object
 */
export const create = async (payload: UserInput): Promise<UserOutput> => {
  const output = await User.create(payload, { logging: DbConfig.LOGGING });
  return output;
};

/**
 * @description Delete [user] by id
 * @author Antonio Marasco
 * @date 05/22/2023
 * @param id
 * @returns {*}
 */
export const deleteById = async (id: number): Promise<boolean> => {
  const deletedCount = await User.destroy({ where: { id }, logging: DbConfig.LOGGING });

  return !!deletedCount;
};

/**
 * @description Finds or creates a [user] based on criteria
 * @author Antonio Marasco
 * @date 05/22/2023
 * @param payload
 * @returns {*}
 */
export const findOrCreate = async (payload: UserInput): Promise<UserOutput> => {
  const [model] = await User.findOrCreate({
    where: {
      id: payload.id
    },
    defaults: payload
  });

  return model;
};

/**
 * @description Paginates [user] list based on filters
 * @author Antonio Marasco
 * @date 05/22/2023
 * @param [filters]
 * @returns {*}
 */
export const paginate = async (
  filters?: AllUserFilters
): Promise<{ rows: UserOutput[]; count: number }> => {
  if (!isNil(filters?.limit) && !isNil(filters?.offset)) {
    //const _date = Date.now();
    return User.findAndCountAll({
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
 * @description Updates [user]
 * @author Antonio Marasco
 * @date 05/22/2023
 * @param id Id of [user] to update
 * @param payload [user] object
 * @returns {*}
 */
export const update = async (id: number, payload: Partial<UserInput>): Promise<UserOutput> => {
  const model = await User.findByPk(id, { logging: DbConfig.LOGGING });
  if (!model) {
    throw new Error(`not found:  cannot find by id: ${id}`);
  }

  const updatedModel = await model.update(payload);
  return updatedModel;
};
