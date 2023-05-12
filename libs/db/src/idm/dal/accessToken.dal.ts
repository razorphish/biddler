import { Op } from 'sequelize';
import AccessToken, { AccessTokenOutput } from '../models/accessToken.model';
import { AllAccessTokenFilters } from './types';

export const all = async (filters?: AllAccessTokenFilters): Promise<AccessTokenOutput[]> => {
  return AccessToken.findAll({
    where: {
      ...(filters?.isDeleted && { deletedAt: { [Op.not]: null } })
    },
    ...((filters?.isDeleted || filters?.includeDeleted) && { paranoid: true })
  });
};
