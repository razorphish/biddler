/**
 * --------------------------------------------------------
 * @file Data Access Layer: qaLevel1and2 record
 * @description DAL should only data-base level logic (i.e. filters, finds, creates, updates)
 * @author Antonio Marasco
 * --------------------------------------------------------
 */

import _ from 'lodash';
import { Op } from 'sequelize';
import { DbConfig } from '../../common/hpt.const';
import QALevel1And2, { QALevel1And2Output } from '../../views/qaLevel1And2.view';
import { AllQALevel1And2Filters } from './filters';

/**
 * Gets all qaLevel1and2 records
 * @author Antonio Marasco
 * @date 03/17/2023
 * @param [filters] Criterion to be used on query
 * @returns {*}
 */
export const all = async (filters?: AllQALevel1And2Filters): Promise<QALevel1And2Output[]> => {
  return QALevel1And2.findAll({
    ...(filters?.attribrutes && { attributes: filters.attribrutes }),
    where: {
      ...(filters?.status && { statusId: { [Op.eq]: filters?.status } })
    },
    ...(filters?.order && { order: filters.order }),
    logging: DbConfig.LOGGING
  });
};

/**
 *  Gets qaLevel1and2 records by Id(PK)
 * @author Antonio Marasco
 * @date 03/17/2023
 * @param id Id of qaLevel1and2 record
 * @param [filters] Criterion to be used on query
 * @returns {*} qaLevel1and2 record
 */
export const byId = async (
  id: number,
  filters?: AllQALevel1And2Filters
): Promise<QALevel1And2Output> => {
  const model = await QALevel1And2.findByPk(id, {
    ...(filters?.attribrutes && { attributes: filters.attribrutes }),
    logging: DbConfig.LOGGING
  });

  if (!model) {
    throw new Error('not found');
  }

  return model;
};

/**
 * Paginates qaLevel1and2 records based on filters
 * @author Antonio Marasco
 * @date 03/17/2023
 * @param [filters] Criterion to be used on query
 * @returns {*} Subset of qaLevel1and2 records
 */
export const paginate = async (
  filters?: AllQALevel1And2Filters
): Promise<{ rows: QALevel1And2Output[]; count: number }> => {
  if (!_.isNil(filters.limit) && !_.isNil(filters.offset)) {
    return QALevel1And2.findAndCountAll({
      ...(filters?.attribrutes && { attributes: filters.attribrutes }),
      limit: filters.limit,
      offset: (filters.offset - 1) * filters.limit,
      where: {
        ...(filters?.status && { statusId: { [Op.eq]: filters?.status } })
      },
      ...(filters?.order && { order: filters.order }),
      logging: DbConfig.LOGGING
    });
  }
  return Promise.reject();
};
