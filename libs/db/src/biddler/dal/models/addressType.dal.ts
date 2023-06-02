import AddressType, { AddressTypeInput, AddressTypeOutput } from '../../models/addressType.model';

/**
 * @description Gets [addressType] by Id(PK)
 * @author Antonio Marasco
 * @date 05/28/2023
 * @param id Id of [addressType]
 * @returns {*} [addressType]
 */
export const byId = async (id: string): Promise<AddressTypeOutput> => {
  const model = await AddressType.findByPk(id);

  if (!model) {
    throw new Error('not found');
  }

  return model;
};

/**
 * @description Creates a [addressType]
 * @author Antonio Marasco
 * @date 05/28/2023
 * @param payload
 * @returns {*} Newly created [addressType] object
 */
export const create = async (payload: AddressTypeInput): Promise<AddressTypeOutput> => {
  const output = await AddressType.create(payload);
  return output;
};

/**
 * @description Deletes [addressType] by id
 * @author Antonio Marasco
 * @date 05/28/2023
 * @param id
 * @returns {*} True if deletion successful; otherwise false
 */
export const deleteById = async (id: string): Promise<boolean> => {
  const deletedCount = await AddressType.destroy({ where: { id } });

  return !!deletedCount;
};

export const update = async (
  id: string,
  payload: Partial<AddressTypeInput>
): Promise<AddressTypeOutput> => {
  const model = await AddressType.findByPk(id);
  if (!model) {
    throw new Error('not found');
  }

  const updatedModel = await model.update(payload);
  return updatedModel;
};

export const all = async (): Promise<AddressTypeOutput[]> => {
  return AddressType.findAll({});
};
