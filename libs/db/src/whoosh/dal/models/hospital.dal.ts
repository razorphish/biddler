/**
 * --------------------------------------------------------
 * @file Data Access Layer: Hospital
 * @description DAL should only data-base level logic (i.e. filters, finds, creates, updates)
 * @author Antonio Marasco
 * --------------------------------------------------------
 */

import { isNil } from 'lodash';
import { Op } from 'sequelize';
import { DbConfig } from '../../common/hpt.const';
import Hospital, { HospitalInput, HospitalOutput } from '../../models/hospital.model';
import { AllHospitalFilters } from './types';
import _ from 'lodash';
import { Address } from '..';

/**
 * @description Gets all hospitals
 * @author Antonio Marasco
 * @date 03/14/2023
 * @param [filters]
 * @returns {*}
 */
export const all = async (filters?: AllHospitalFilters): Promise<HospitalOutput[]> => {
  return Hospital.findAll({
    ...(filters?.attributes && { attributes: filters?.attributes }),
    where: {
      ...(filters?.isDeleted && { deletedAt: { [Op.not]: null } }),
      ...(filters?.status && { statusId: { [Op.eq]: filters.status } })
    },
    ...((filters?.isDeleted || filters?.includeDeleted) && { paranoid: false }),
    logging: DbConfig.LOGGING
  });
};

/**
 * @description Gets hospitals by Id(PK)
 * @author Antonio Marasco
 * @date 03/14/2023
 * @param id Id of Hospital
 * @returns {*} Hospital
 */
export const byId = async (id: number, filters?: AllHospitalFilters): Promise<HospitalOutput> => {
  const model = await Hospital.findByPk(id, {
    ...(filters?.attributes && { attributes: filters?.attributes }),
    logging: DbConfig.LOGGING
  });

  if (!model) {
    throw new Error('not found');
  }

  return model;
};

/**
 * @description Creates a hospital
 * @author Antonio Marasco
 * @date 03/14/2023
 * @param payload
 * @returns {*} Newly created hospital object
 */
export const create = async (payload: HospitalInput): Promise<HospitalOutput> => {
  if (!_.isNil(payload.addresses)) {
    const addresses = Promise.all(payload.addresses.map(Address.create));

    payload.addresses = await addresses;
  }

  const output = await Hospital.create(payload, { logging: DbConfig.LOGGING });
  return output;
};

/**
 * @description Delete hospital by id
 * @author Antonio Marasco
 * @date 03/14/2023
 * @param id
 * @returns {*}
 */
export const deleteById = async (id: number): Promise<boolean> => {
  const deletedCount = await Hospital.destroy({ where: { id }, logging: DbConfig.LOGGING });

  return !!deletedCount;
};

/**
 * @description Finds or creates a hospital based on criteria
 * @author Antonio Marasco
 * @date 03/15/2023
 * @param payload
 * @returns {*}
 */
export const findOrCreate = async (payload: HospitalInput): Promise<HospitalOutput> => {
  const [hospital] = await Hospital.findOrCreate({
    where: {
      id: payload.id
    },
    defaults: payload
  });

  return hospital;
};

/**
 * @description Paginates hospitals based on filters
 * @author Antonio Marasco
 * @date 03/15/2023
 * @param [filters]
 * @returns {*}
 */
export const paginate = async (
  filters?: AllHospitalFilters
): Promise<{ rows: HospitalOutput[]; count: number }> => {
  if (!isNil(filters.limit) && !isNil(filters.offset)) {
    return Hospital.findAndCountAll({
      ...(filters?.attributes && { attributes: filters?.attributes }),
      limit: filters.limit,
      offset: (filters.offset - 1) * filters.limit,
      where: {
        ...(filters?.isDeleted && { deletedAt: { [Op.not]: null } }),
        ...(filters?.status && { statusId: { [Op.eq]: filters.status } })
      },
      ...((filters?.isDeleted || filters?.includeDeleted) && { paranoid: false }),
      logging: DbConfig.LOGGING
    });
  }
  return Promise.reject();
};

/**
 * @description Updates hospital
 * @author Antonio Marasco
 * @date 03/14/2023
 * @param id Id of hospital to update
 * @param payload hospital object
 * @returns {*}
 */
export const update = async (
  id: number,
  payload: Partial<HospitalInput>
): Promise<HospitalOutput> => {
  const model = await Hospital.findByPk(id, { logging: DbConfig.LOGGING });
  if (!model) {
    throw new Error('not found');
  }

  const updatedModel = await model.update(payload);
  return updatedModel;
};
