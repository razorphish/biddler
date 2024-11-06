/**
 * --------------------------------------------------------
 * @file Data Access Layer: Address
 * @description DAL should only data-base level logic (i.e. filters, finds, creates, updates)
 * @author Antonio Marasco
 * --------------------------------------------------------
 */
import { isNil } from 'lodash';
import { Op } from 'sequelize';
import { DbConfig } from '../../../common/constants/biddler.const';
import Address from '../../models/address.model';
import { AllAddressFilters } from './types';
import { AddressInput, AddressOutput } from '../../interfaces';

/**
 * @description Gets all [address]
 * @author Antonio Marasco
 * @date 03/22/2023
 * @param [filters]
 * @param [attributes]
 * @returns {*}
 */
export const all = async (filters?: AllAddressFilters): Promise<AddressOutput[]> => {
  //const _date = Date.now();
  return Address.findAll({
    ...(filters?.attributes && { attributes: filters?.attributes }),
    where: {
      ...(filters?.isDeleted && { deletedAt: { [Op.not]: null } }),
      ...(filters?.status && { statusId: { [Op.eq]: filters.status } }),
      ...(filters?.typeId && { typeId: { [Op.eq]: filters.typeId } })
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
 * @description Gets [address] by Id(PK)
 * @author Antonio Marasco
 * @date 03/22/2023
 * @param id Id of [address]
 * @returns {*} [address]
 */
export const byId = async (id: number, filters?: AllAddressFilters): Promise<AddressOutput> => {
  const model = await Address.findByPk(id, {
    ...(filters?.attributes && { attributes: filters?.attributes }),
    logging: DbConfig.LOGGING
  });

  if (!model) {
    throw new Error(`not found:  cannot find by id: ${id}`);
  }

  return model;
};

/**
 * @description Creates a [address]
 * @author Antonio Marasco
 * @date 03/22/2023
 * @param payload
 * @returns {*} Newly created [address] object
 */
export const create = async (payload: AddressInput): Promise<AddressOutput> => {
  const output = await Address.create(payload, { logging: DbConfig.LOGGING });
  return output;
};

/**
 * @description Delete [address] by id
 * @author Antonio Marasco
 * @date 03/22/2023
 * @param id
 * @returns {*}
 */
export const deleteById = async (id: number): Promise<boolean> => {
  const deletedCount = await Address.destroy({ where: { id }, logging: DbConfig.LOGGING });

  return !!deletedCount;
};

/**
 * @description Finds or creates a [address] based on criteria
 * @author Antonio Marasco
 * @date 03/22/2023
 * @param payload
 * @returns {*}
 */
export const findOrCreate = async (payload: AddressInput): Promise<AddressOutput> => {
  const [model] = await Address.findOrCreate({
    where: {
      id: payload.id
    },
    defaults: payload
  });

  return model;
};

/**
 * @description Paginates [address] list based on filters
 * @author Antonio Marasco
 * @date 03/22/2023
 * @param [filters]
 * @returns {*}
 */
export const paginate = async (
  filters?: AllAddressFilters
): Promise<{ rows: AddressOutput[]; count: number }> => {
  if (!isNil(filters?.limit) && !isNil(filters?.offset)) {
    //const _date = Date.now();
    return Address.findAndCountAll({
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
      // ...(filters?.orderBySortOrder && { order: [['sortOrder', 'ASC']] }),
      ...((filters?.isDeleted || filters?.includeDeleted) && { paranoid: false }),
      logging: DbConfig.LOGGING
    });
  }
  throw new Error(`bad request:  missing parameters => ${JSON.stringify(filters)}`);
};

/**
 * @description Updates [address]
 * @author Antonio Marasco
 * @date 03/22/2023
 * @param id Id of [address] to update
 * @param payload [address] object
 * @returns {*}
 */
export const update = async (
  id: number,
  payload: Partial<AddressInput>
): Promise<AddressOutput> => {
  const model = await Address.findByPk(id, { logging: DbConfig.LOGGING });
  if (!model) {
    throw new Error(`not found:  cannot find by id: ${id}`);
  }

  const updatedModel = await model.update(payload);
  return updatedModel;
};
