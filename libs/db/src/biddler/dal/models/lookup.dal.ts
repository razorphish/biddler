import Lookup, { LookupInput, LookupOutput } from '../../models/lookup.model';

/**
 * @description Gets status by Id(PK)
 * @author Antonio Marasco
 * @date 11/15/2022
 * @param id Id of System
 * @returns {*} System
 */
export const byId = async (id: string, group: string): Promise<LookupOutput> => {
  const model = await Lookup.findOne({ where: { id, group } });

  if (!model) {
    throw new Error('not found');
  }

  return model;
};

/**
 * @description Creates a lookup
 * @author Antonio Marasco
 * @date 11/15/2022
 * @param payload
 * @returns {*} Newly created lookup object
 */
export const create = async (payload: LookupInput): Promise<LookupOutput> => {
  const output = await Lookup.create(payload);
  return output;
};

export const deleteById = async (id: string): Promise<boolean> => {
  const deletedCount = await Lookup.destroy({ where: { id } });

  return !!deletedCount;
};

export const update = async (id: string, payload: Partial<LookupInput>): Promise<LookupOutput> => {
  const model = await Lookup.findByPk(id);
  if (!model) {
    throw new Error('not found');
  }

  const updatedModel = await model.update(payload);
  return updatedModel;
};

export const all = async (): Promise<LookupOutput[]> => {
  return Lookup.findAll({});
};
