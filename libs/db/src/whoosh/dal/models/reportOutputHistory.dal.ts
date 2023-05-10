/**
 * --------------------------------------------------------
 * @file Data Access Layer: Report output history
 * @description DAL (Data Access Layer=) should only data-base level logic (i.e. filters, finds, creates, updates)
 * @author Antonio Marasco
 * --------------------------------------------------------
 */
import { isNil } from 'lodash';
import { Op } from 'sequelize';
import { DbConfig } from '../../common/hpt.const';
import { ReportOutputHistory } from '../../models';
import { AllReportOutputHistoryFilters } from './types';
import {
  ReportOutputHistoryInput,
  ReportOutputHistoryOutput
} from '../../models/reportOutputHistory.model';

/**
 * @description Gets all report output historys
 * @author Antonio Marasco
 * @date 03/27/2023
 * @param [filters]
 * @returns {*}
 */
export const all = async (
  filters?: AllReportOutputHistoryFilters
): Promise<ReportOutputHistoryOutput[]> => {
  const _date = Date.now();
  return ReportOutputHistory.findAll({
    ...(filters?.attributes && { attributes: filters?.attributes }),
    where: {
      ...(filters?.isDeleted && { deletedAt: { [Op.not]: null } }),
      ...(filters?.status && { statusId: { [Op.eq]: filters.status } }),
      ...(filters?.checkEffectiveDate && {
        [Op.and]: {
          effectiveStartDate: { [Op.lte]: { _date } },
          effectiveEndDate: { [Op.gte]: { _date } }
        }
      })
    },
    ...(filters?.attributes && { attributes: filters?.attributes }),
    ...(filters?.orderBySortOrder && { order: [['sortOrder', 'ASC']] }),
    ...((filters?.isDeleted || filters?.includeDeleted) && { paranoid: false }),
    logging: DbConfig.LOGGING
  });
};

/**
 * @description Gets report output history by Id(PK)
 * @author Antonio Marasco
 * @date 03/27/2023
 * @param id Id of report output history
 * @returns {*} report output history
 */
export const byId = async (
  id: number,
  filters?: AllReportOutputHistoryFilters
): Promise<ReportOutputHistoryOutput> => {
  const model = await ReportOutputHistory.findByPk(id, {
    ...(filters?.attributes && { attributes: filters?.attributes }),
    logging: DbConfig.LOGGING
  });

  if (!model) {
    throw new Error(`not found:  cannot find report by id: ${id}`);
  }

  return model;
};
/**
 * @description Find output history list by user id
 * @author Antonio Marasco
 * @date 04/15/2023
 * @param userId Id of user to get history from
 * @param [filters]
 * @returns {*} List of output histories by user
 */
export const byUserId = async (
  userId: number,
  filters?: AllReportOutputHistoryFilters
): Promise<ReportOutputHistoryOutput[]> => {
  const _date = Date.now();
  const model = await ReportOutputHistory.findAll({
    where: {
      userId,
      ...(filters?.isDeleted && { deletedAt: { [Op.not]: null } }),
      ...(filters?.status && { statusId: { [Op.eq]: filters.status } }),
      ...(filters?.checkEffectiveDate && {
        [Op.and]: {
          effectiveStartDate: { [Op.lte]: { _date } },
          effectiveEndDate: { [Op.gte]: { _date } }
        }
      })
    },
    ...(filters?.attributes && { attributes: filters?.attributes }),
    ...(filters?.orderBySortOrder && { order: [['sortOrder', 'ASC']] }),
    ...((filters?.isDeleted || filters?.includeDeleted) && { paranoid: false }),
    logging: DbConfig.LOGGING
  });

  return model;
};

/**
 * @description Creates a report output history
 * @author Antonio Marasco
 * @date 03/27/2023
 * @param payload
 * @returns {*} Newly created report output history object
 */
export const create = async (
  payload: ReportOutputHistoryInput
): Promise<ReportOutputHistoryOutput> => {
  const output = await ReportOutputHistory.create(payload, { logging: DbConfig.LOGGING });
  return output;
};

/**
 * @description Delete report output history by id
 * @author Antonio Marasco
 * @date 03/27/2023
 * @param id
 * @returns {*}
 */
export const deleteById = async (id: number): Promise<boolean> => {
  const deletedCount = await ReportOutputHistory.destroy({
    where: { id },
    logging: DbConfig.LOGGING
  });

  return !!deletedCount;
};

/**
 * @description Finds or creates a report output history based on criteria
 * @author Antonio Marasco
 * @date 03/27/2023
 * @param payload
 * @returns {*}
 */
export const findOrCreate = async (
  payload: ReportOutputHistoryInput
): Promise<ReportOutputHistoryOutput> => {
  const [reportOutputHistory] = await ReportOutputHistory.findOrCreate({
    where: {
      id: payload.id
    },
    defaults: payload
  });

  return reportOutputHistory;
};

/**
 * @description Paginates report output historys based on filters
 * @author Antonio Marasco
 * @date 03/27/2023
 * @param [filters]
 * @returns {*}
 */
export const paginate = async (
  filters?: AllReportOutputHistoryFilters
): Promise<{ rows: ReportOutputHistoryOutput[]; count: number }> => {
  if (!isNil(filters.limit) && !isNil(filters.offset)) {
    const _date = Date.now();
    return ReportOutputHistory.findAndCountAll({
      ...(filters?.attributes && { attributes: filters?.attributes }),
      limit: filters.limit,
      offset: (filters.offset - 1) * filters.limit,
      where: {
        ...(filters?.isDeleted && { deletedAt: { [Op.not]: null } }),
        ...(filters?.status && { statusId: { [Op.eq]: filters.status } }),
        ...(filters?.checkEffectiveDate && {
          [Op.and]: {
            effectiveStartDate: { [Op.lte]: { _date } },
            effectiveEndDate: { [Op.gte]: { _date } }
          }
        })
      },
      ...(filters?.attributes && { attributes: filters?.attributes }),
      ...(filters?.orderBySortOrder && { order: [['sortOrder', 'ASC']] }),
      ...((filters?.isDeleted || filters?.includeDeleted) && { paranoid: false }),
      logging: DbConfig.LOGGING
    });
  }
  throw new Error('bad request: missing parameters');
};

/**
 * @description Updates report output history
 * @author Antonio Marasco
 * @date 03/27/2023
 * @param id Id of report output history to update
 * @param payload report output history object
 * @returns {*}
 */
export const update = async (
  id: number,
  payload: Partial<ReportOutputHistoryInput>
): Promise<ReportOutputHistoryOutput> => {
  const model = await ReportOutputHistory.findByPk(id, { logging: DbConfig.LOGGING });
  if (!model) {
    throw new Error(`not found:  cannot find by id: ${id}`);
  }

  const updatedModel = await model.update(payload);
  return updatedModel;
};
