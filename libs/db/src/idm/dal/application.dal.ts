import { Op } from 'sequelize';
import Application, { ApplicationInput, ApplicationOutput } from '../models/application.model';
import { AllApplicationFilters } from './types';

/**
 * @description Gets all Applications
 * @author Antonio Marasco
 * @date 11/23/2022
 * @param [filters] Criteria to search
 * @returns {*}
 */
export const all = async (filters?: AllApplicationFilters): Promise<ApplicationOutput[]> => {
  return Application.findAll({
    where: {
      ...(filters?.isDeleted && { deletedAt: { [Op.not]: null } }),
      ...(filters?.isActive && { statusId: { [Op.eq]: 'active' } })
    },
    ...((filters?.isDeleted || filters?.includeDeleted) && { paranoid: false })
  });
};

/**
 * @description Gets Applications by Id(PK)
 * @author Antonio Marasco
 * @date 11/23/2022
 * @param id Id of Application
 * @returns {*} Application
 */
export const byId = async (id: string): Promise<ApplicationOutput> => {
  const model = await Application.findByPk(id);

  if (!model) {
    throw new Error('not found');
  }

  return model;
};

/**
 * @description Creates Application
 * @author Antonio Marasco
 * @date 11/23/2022
 * @param payload
 * @returns {*} Newly created Application object
 */
export const create = async (payload: ApplicationInput): Promise<ApplicationOutput> => {
  const output = await Application.create(payload);
  return output;
};

/**
 * @description Deletes Application by Id
 * @author Antonio Marasco
 * @date 11/23/2022
 * @param id Id of Application
 * @returns {*} True if delete was successful, otherwise false
 */
export const deleteById = async (id: string): Promise<boolean> => {
  const deletedCount = await Application.destroy({ where: { id } });

  return !!deletedCount;
};

/**
 * @description Updates Application
 * @author Antonio Marasco
 * @date 11/23/2022
 * @param id
 * @param payload
 * @returns {*}
 */
export const update = async (
  id: string,
  payload: Partial<ApplicationInput>
): Promise<ApplicationOutput> => {
  const model = await Application.findByPk(id);
  if (!model) {
    throw new Error('not found');
  }

  const updatedModel = await model.update(payload);
  return updatedModel;
};
