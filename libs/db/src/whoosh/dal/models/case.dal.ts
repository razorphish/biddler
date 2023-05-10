import { Op } from 'sequelize';

import { Case } from '../../models';
import { AllCaseFilters } from './types';
import { CaseInput, CaseOutput } from '../../interfaces';

export const create = async (payload: CaseInput): Promise<CaseOutput> => {
  const _ = await Case.create(payload);

  return _;
};

export const findOrCreate = async (payload: CaseInput): Promise<CaseOutput> => {
  const [model] = await Case.findOrCreate({
    where: {
      hospitalId: payload.hospitalId
    },
    defaults: payload
  });

  return model;
};

export const update = async (id: number, payload: Partial<CaseInput>): Promise<CaseOutput> => {
  const model = await Case.findByPk(id);

  if (!model) {
    // @todo throw custom error
    throw new Error('not found');
  }

  const updatedIngredient = await model.update(payload);
  return updatedIngredient;
};

export const byId = async (id: number): Promise<CaseOutput> => {
  const model = await Case.findByPk(id);

  if (!model) {
    // @todo throw custom error
    throw new Error('not found');
  }

  return model;
};

export const deleteById = async (id: number): Promise<boolean> => {
  const deletedCount = await Case.destroy({
    where: { id }
  });

  return !!deletedCount;
};

export const all = async (filters?: AllCaseFilters): Promise<CaseOutput[]> => {
  return Case.findAll({
    where: {
      ...(filters?.isDeleted && { deletedAt: { [Op.not]: null } })
    },
    ...((filters?.isDeleted || filters?.includeDeleted) && { paranoid: true })
  });
};
