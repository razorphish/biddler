import { Op } from 'sequelize';
import { AccessTokenInput, AccessTokenOutput } from '../../models/accessToken.model';
import { AllAccessTokenFilters } from './types';
import { DbConfig } from '../../common/idm.const';
import { AccessToken } from '../../models';
import { isNil } from 'lodash';

/**
 * @description Export all access token records
 * @author Antonio Marasco
 * @date 05/25/2023
 * @param [filters]
 * @returns {*}
 */
export const all = async (filters?: AllAccessTokenFilters): Promise<AccessTokenOutput[]> => {
  return AccessToken.findAll({
    ...(filters?.attributes && { attributes: filters?.attributes }),
    where: {
      ...(filters?.isDeleted && { deletedAt: { [Op.not]: null } }),
      ...(filters?.status && { statusId: { [Op.eq]: filters.status } })
    },
    ...(filters?.orderBySortOrder && { order: [['sortOrder', 'ASC']] }),
    ...((filters?.isDeleted || filters?.includeDeleted) && { paranoid: false }),
    logging: DbConfig.LOGGING
  });
};

/**
 * @description Gets token by access token value
 * @author Antonio Marasco
 * @date 11/29/2023
 * @param accessToken
 * @param [filters]
 * @returns {*}
 */
export const byAccessToken = async (
  accessToken: string,
  filters?: AllAccessTokenFilters
): Promise<AccessTokenOutput> => {
  const model = await AccessToken.findOne({
    where: { token: accessToken },
    ...(filters?.attributes && { attributes: filters?.attributes }),
    logging: DbConfig.LOGGING
  });

  if (!model) {
    throw new Error(`not found:  cannot find by access token: ${accessToken}`);
  }

  return model;
};

/**
 * @description gets Access token by refresh token
 * @author Antonio Marasco
 * @date 12/01/2023
 * @param accessToken
 * @param [filters]
 * @returns {*}
 */
export const byRefreshToken = async (
  refreshToken: string,
  filters?: AllAccessTokenFilters
): Promise<AccessTokenOutput> => {
  const model = await AccessToken.findOne({
    where: { refreshToken: refreshToken },
    ...(filters?.attributes && { attributes: filters?.attributes }),
    logging: DbConfig.LOGGING
  });

  if (!model) {
    throw new Error(`not found:  cannot find by refresh token: ${refreshToken}`);
  }

  return model;
};

/**
 * @description
 * @author Antonio Marasco
 * @date 05/25/2023
 * @param id
 * @param [filters]
 * @returns {*}
 */
export const byId = async (
  id: number,
  filters?: AllAccessTokenFilters
): Promise<AccessTokenOutput> => {
  const model = await AccessToken.findByPk(id, {
    ...(filters?.attributes && { attributes: filters?.attributes }),
    logging: DbConfig.LOGGING
  });

  if (!model) {
    throw new Error(`not found:  cannot find by id: ${id}`);
  }

  return model;
};

/**
 * @description Creates access token
 * @author Antonio Marasco
 * @date 05/25/2023
 * @param payload
 * @returns {*} Newly created access token
 */
export const create = async (payload: AccessTokenInput): Promise<AccessTokenOutput> => {
  const output = await AccessToken.create(payload, { logging: DbConfig.LOGGING });
  return output;
};

/**
 * @description Delete by access token id
 * @author Antonio Marasco
 * @date 03/22/2023
 * @param id
 * @returns {*}
 */
export const deleteById = async (id: number): Promise<boolean> => {
  const deletedCount = await AccessToken.destroy({ where: { id }, logging: DbConfig.LOGGING });

  return !!deletedCount;
};

/**
 * @description Finds or creates a access token based on criteria
 * @author Antonio Marasco
 * @date 05/25/2023
 * @param payload
 * @returns {*}
 */
export const findOrCreate = async (payload: AccessTokenInput): Promise<AccessTokenOutput> => {
  const [model] = await AccessToken.findOrCreate({
    where: {
      id: payload.id
    },
    defaults: payload
  });

  return model;
};

/**
 * @description Paginates access token(s) based on filters
 * @author Antonio Marasco
 * @date 05/25/2023
 * @param [filters]
 * @returns {*}
 */
export const paginate = async (
  filters?: AllAccessTokenFilters
): Promise<{ rows: AccessTokenOutput[]; count: number }> => {
  if (!isNil(filters?.limit) && !isNil(filters?.offset)) {
    return AccessToken.findAndCountAll({
      ...(filters?.attributes && { attributes: filters?.attributes }),
      limit: filters.limit,
      offset: (filters.offset - 1) * filters.limit,
      where: {
        ...(filters?.isDeleted && { deletedAt: { [Op.not]: null } }),
        ...(filters?.status && { statusId: { [Op.eq]: filters.status } })
      },
      ...(filters?.orderBySortOrder && { order: [['sortOrder', 'ASC']] }),
      ...((filters?.isDeleted || filters?.includeDeleted) && { paranoid: false }),
      logging: DbConfig.LOGGING
    });
  }
  throw new Error(`bad request:  missing parameters => ${JSON.stringify(filters)}`);
};

/**
 * @description Updates access token
 * @author Antonio Marasco
 * @date 05/25/2023
 * @param id Id of access token to update
 * @param payload access token object
 * @returns {*}
 */
export const update = async (
  id: number,
  payload: Partial<AccessTokenInput>
): Promise<AccessTokenOutput> => {
  const model = await AccessToken.findByPk(id, { logging: DbConfig.LOGGING });
  if (!model) {
    throw new Error(`not found:  cannot find by id: ${id}`);
  }

  const updatedModel = await model.update(payload);
  return updatedModel;
};
