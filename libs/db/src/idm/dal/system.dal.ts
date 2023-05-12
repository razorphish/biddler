import { Op } from 'sequelize';
import System, { SystemInput, SystemOutput } from '../models/system.model';
import { AllSystemFilters } from './types';

/**
 * @description Gets Systems by Id(PK)
 * @author Antonio Marasco
 * @date 11/15/2022
 * @param id Id of System
 * @returns {*} System
 */
export const byId = async (id: number): Promise<SystemOutput> => {
  const model = await System.findByPk(id);

  if (!model) {
    throw new Error('not found');
  }

  return model;
};

/**
 * @description Creates System
 * @author Antonio Marasco
 * @date 11/15/2022
 * @param payload
 * @returns {*} Newly created System object
 */
export const create = async (payload: SystemInput): Promise<SystemOutput> => {
  const output = await System.create(payload);
  return output;
};

export const deleteById = async (id: number): Promise<boolean> => {
  const deletedCount = await System.destroy({ where: { id } });

  return !!deletedCount;
};

export const update = async (id: number, payload: Partial<SystemInput>): Promise<SystemOutput> => {
  const model = await System.findByPk(id);
  if (!model) {
    throw new Error('not found');
  }

  const updatedModel = await model.update(payload);
  return updatedModel;
};

export const all = async (filters?: AllSystemFilters): Promise<SystemOutput[]> => {
  return System.findAll({
    where: {
      ...(filters?.isDeleted && { deletedAt: { [Op.not]: null } }),
      ...(filters?.isActive && { statusId: { [Op.eq]: 'active' } })
    },
    ...((filters?.isDeleted || filters?.includeDeleted) && { paranoid: false })
  });
};
