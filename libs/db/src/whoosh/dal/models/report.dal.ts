/**
 * --------------------------------------------------------
 * @file Data Access Layer: Report
 * @description DAL should only data-base level logic (i.e. filters, finds, creates, updates)
 * @author Antonio Marasco
 * --------------------------------------------------------
 */
import { isNil } from 'lodash';
import { Op } from 'sequelize';
import { DbConfig } from '../../common/hpt.const';
import { Report } from '../../models';
import { AllReportFilters } from './types';
import { ReportInput, ReportOutput } from '../../models/report.model';

/**
 * @description Gets all reports
 * @author Antonio Marasco
 * @date 03/22/2023
 * @param [filters]
 * @param [attributes]
 * @returns {*}
 */
export const all = async (filters?: AllReportFilters): Promise<ReportOutput[]> => {
  const _date = Date.now();
  return Report.findAll({
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
    ...(filters?.orderBySortOrder && { order: [['sortOrder', 'ASC']] }),
    ...((filters?.isDeleted || filters?.includeDeleted) && { paranoid: false }),
    logging: DbConfig.LOGGING
  });
};

/**
 * @description Gets reports by Id(PK)
 * @author Antonio Marasco
 * @date 03/22/2023
 * @param id Id of report
 * @returns {*} report
 */
export const byId = async (id: number, filters?: AllReportFilters): Promise<ReportOutput> => {
  const model = await Report.findByPk(id, {
    ...(filters?.attributes && { attributes: filters?.attributes }),
    logging: DbConfig.LOGGING
  });

  if (!model) {
    throw new Error(`not found:  cannot find by id: ${id}`);
  }

  return model;
};

/**
 * @description Creates a report
 * @author Antonio Marasco
 * @date 03/22/2023
 * @param payload
 * @returns {*} Newly created report object
 */
export const create = async (payload: ReportInput): Promise<ReportOutput> => {
  const output = await Report.create(payload, { logging: DbConfig.LOGGING });
  return output;
};

/**
 * @description Delete report by id
 * @author Antonio Marasco
 * @date 03/22/2023
 * @param id
 * @returns {*}
 */
export const deleteById = async (id: number): Promise<boolean> => {
  const deletedCount = await Report.destroy({ where: { id }, logging: DbConfig.LOGGING });

  return !!deletedCount;
};

/**
 * @description Finds or creates a report based on criteria
 * @author Antonio Marasco
 * @date 03/22/2023
 * @param payload
 * @returns {*}
 */
export const findOrCreate = async (payload: ReportInput): Promise<ReportOutput> => {
  const [report] = await Report.findOrCreate({
    where: {
      id: payload.id
    },
    defaults: payload
  });

  return report;
};

/**
 * @description Paginates reports based on filters
 * @author Antonio Marasco
 * @date 03/22/2023
 * @param [filters]
 * @returns {*}
 */
export const paginate = async (
  filters?: AllReportFilters
): Promise<{ rows: ReportOutput[]; count: number }> => {
  if (!isNil(filters?.limit) && !isNil(filters?.offset)) {
    const _date = Date.now();
    return Report.findAndCountAll({
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
      ...(filters?.orderBySortOrder && { order: [['sortOrder', 'ASC']] }),
      ...((filters?.isDeleted || filters?.includeDeleted) && { paranoid: false }),
      logging: DbConfig.LOGGING
    });
  }
  throw new Error(`bad request:  missing parameters => ${JSON.stringify(filters)}`);
};

/**
 * @description Updates report
 * @author Antonio Marasco
 * @date 03/22/2023
 * @param id Id of report to update
 * @param payload report object
 * @returns {*}
 */
export const update = async (id: number, payload: Partial<ReportInput>): Promise<ReportOutput> => {
  const model = await Report.findByPk(id, { logging: DbConfig.LOGGING });
  if (!model) {
    throw new Error(`not found:  cannot find by id: ${id}`);
  }

  const updatedModel = await model.update(payload);
  return updatedModel;
};
