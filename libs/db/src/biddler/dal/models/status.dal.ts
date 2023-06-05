import Status, { StatusInput, StatusOutput } from '../../models/status.model';

/**
 * @description Gets status by Id(PK)
 * @author Antonio Marasco
 * @date 11/15/2022
 * @param id Id of System
 * @returns {*} System
 */
export const byId = async (id: string): Promise<StatusOutput> => {
  const model = await Status.findByPk(id);

  if (!model) {
    throw new Error('not found');
  }

  return model;
};

/**
 * @description Creates a status
 * @author Antonio Marasco
 * @date 11/15/2022
 * @param payload
 * @returns {*} Newly created status object
 */
export const create = async (payload: StatusInput): Promise<StatusOutput> => {
  const output = await Status.create(payload);
  return output;
};

export const deleteById = async (id: string): Promise<boolean> => {
  const deletedCount = await Status.destroy({ where: { id } });

  return !!deletedCount;
};

export const update = async (id: string, payload: Partial<StatusInput>): Promise<StatusOutput> => {
  const model = await Status.findByPk(id);
  if (!model) {
    throw new Error('not found');
  }

  const updatedModel = await model.update(payload);
  return updatedModel;
};

export const all = async (): Promise<StatusOutput[]> => {
  return Status.findAll({});
};
