import { Op } from 'sequelize';
import Address, { AddressInput, AddressOutput } from '../../models/address.model';
import { AllAddressFilters } from './types';

/**
 * @description Gets all addresses
 * @author Antonio Marasco
 * @date 02/09/2023
 * @param [filters]
 * @returns {*}
 */
export const all = async (filters?: AllAddressFilters): Promise<AddressOutput[]> => {
  return Address.findAll({
    where: {
      ...(filters?.isDeleted && { deletedAt: { [Op.not]: null } }),
      ...(filters?.status && { statusId: { [Op.eq]: filters.status } })
    },
    ...((filters?.isDeleted || filters?.includeDeleted) && { paranoid: false })
  });
};

/**
 * @description Gets address by Id(PK)
 * @author Antonio Marasco
 * @date 02/07/2023
 * @param id Id of address
 * @returns {*} Address
 */
export const byId = async (id: number): Promise<AddressOutput> => {
  const model = await Address.findByPk(id);

  if (!model) {
    throw new Error('not found');
  }

  return model;
};

/**
 * @description Creates Address
 * @author Antonio Marasco
 * @date 02/07/2023
 * @param payload
 * @returns {*} Newly created address object
 */
export const create = async (payload: AddressInput): Promise<AddressOutput> => {
  const output = await Address.create(payload);
  return output;
};

/**
 * @description Delete address by id
 * @author Antonio Marasco
 * @date 02/09/2023
 * @param id
 * @returns {*}
 */
export const deleteById = async (id: number): Promise<boolean> => {
  const deletedCount = await Address.destroy({ where: { id } });

  return !!deletedCount;
};

export const findOrCreate = async (payload: AddressInput): Promise<AddressOutput> => {
  const [address] = await Address.findOrCreate({
    where: {
      id: payload.id
    },
    defaults: payload
  });

  return address;
};

/**
 * @description Updates address
 * @author Antonio Marasco
 * @date 02/09/2023
 * @param id Id of address to update
 * @param payload address object
 * @returns {*}
 */
export const update = async (
  id: number,
  payload: Partial<AddressInput>
): Promise<AddressOutput> => {
  const model = await Address.findByPk(id);
  if (!model) {
    throw new Error('not found');
  }

  const updatedModel = await model.update(payload);
  return updatedModel;
};
