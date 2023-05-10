/**
 * --------------------------------------------------------
 * @file Data Access Layer: CreateEditsRequested record
 * @description DAL should only data-base level logic (i.e. filters, finds, creates, updates)
 * @author Antonio Marasco
 * --------------------------------------------------------
 */

import _ from 'lodash';
import { Op } from 'sequelize';
import { DbConfig } from '../../common/hpt.const';
import CreateEditsRequested, {
  CreateEditsRequestedOutput
} from '../../views/createEditsRequested.view';
import { AllCreateEditsRequestedFilters } from './filters';

/**
 * Gets all CreateEditsRequested records
 * @author Antonio Marasco
 * @param [filters] Criterion to be used on query
 * @returns {*}
 */
export const all = async (
  filters?: AllCreateEditsRequestedFilters
): Promise<CreateEditsRequestedOutput[]> => {
  return CreateEditsRequested.findAll({
    ...(filters?.attribrutes && { attributes: filters.attribrutes }),
    where: {
      ...(filters?.status && { statusId: { [Op.eq]: filters?.status } })
    },
    ...(filters?.order && { order: filters.order }),
    logging: DbConfig.LOGGING
  });
};

/**
 * Paginates CreateEditsRequested records based on filters
 * @author Antonio Marasco
 * @param [filters] Criterion to be used on query
 * @returns {*} Subset of CreateEditsRequested records
 */
export const paginate = async (
  filters?: AllCreateEditsRequestedFilters
): Promise<{ rows: CreateEditsRequestedOutput[]; count: number }> => {
  if (!_.isNil(filters.limit) && !_.isNil(filters.offset)) {
    return CreateEditsRequested.findAndCountAll({
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
