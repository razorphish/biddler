import ShoppableService, {
  ShoppableServiceInput,
  ShoppableServiceOutput
} from '../../models/shoppableService.model';

/**
 * @description Gets shoppable service by Id(PK)
 * @author Antonio Marasco
 * @date 11/15/2022
 * @param id Id of shoppable service
 * @returns {*} shoppable service
 */
export const byId = async (id: string): Promise<ShoppableServiceOutput> => {
  const model = await ShoppableService.findByPk(id);

  if (!model) {
    throw new Error('not found');
  }

  return model;
};

/**
 * @description Creates a shoppable service
 * @author Antonio Marasco
 * @date 11/15/2022
 * @param payload
 * @returns {*} Newly created shoppable service object
 */
export const create = async (payload: ShoppableServiceInput): Promise<ShoppableServiceOutput> => {
  const output = await ShoppableService.create(payload);
  return output;
};

export const deleteById = async (id: string): Promise<boolean> => {
  const deletedCount = await ShoppableService.destroy({ where: { id } });

  return !!deletedCount;
};

export const update = async (
  id: string,
  payload: Partial<ShoppableServiceInput>
): Promise<ShoppableServiceOutput> => {
  const model = await ShoppableService.findByPk(id);
  if (!model) {
    throw new Error('not found');
  }

  const updatedModel = await model.update(payload);
  return updatedModel;
};

export const all = async (): Promise<ShoppableServiceOutput[]> => {
  return ShoppableService.findAll({});
};
