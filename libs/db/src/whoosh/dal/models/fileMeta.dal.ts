/**
 * --------------------------------------------------------
 * @file Data Access Layer: file meta
 * @description DAL should only data-base level logic (i.e. filters, finds, creates, updates)
 * @author Antonio Marasco
 * --------------------------------------------------------
 */
import { isNil } from 'lodash';
import { Op } from 'sequelize';
import { DbConfig } from '../../common/hpt.const';
import { FileMeta } from '../../models';
import { AllFileMetaFilters } from './types';
import { FileMetaInput, FileMetaOutput } from '../../models/fileMeta.model';

/**
 * @description Gets all file metas
 * @author Antonio Marasco
 * @date 04/14/2023
 * @param [filters]
 * @returns {*}
 */
export const all = async (filters?: AllFileMetaFilters): Promise<FileMetaOutput[]> => {
  return FileMeta.findAll({
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
 * @description Gets file metas by Id(PK)
 * @author Antonio Marasco
 * @date 04/14/2023
 * @param id Id of file meta
 * @returns {*} file meta
 */
export const byId = async (id: number, filters?: AllFileMetaFilters): Promise<FileMetaOutput> => {
  const model = await FileMeta.findByPk(id, {
    ...(filters?.attributes && { attributes: filters?.attributes }),
    logging: DbConfig.LOGGING
  });

  if (!model) {
    throw new Error(`not found:  cannot find by id: ${id}`);
  }

  return model;
};

/**
 * @description Creates a file meta
 * @author Antonio Marasco
 * @date 04/14/2023
 * @param payload
 * @returns {*} Newly created file meta object
 */
export const create = async (payload: FileMetaInput): Promise<FileMetaOutput> => {
  const output = await FileMeta.create(payload, { logging: DbConfig.LOGGING });
  return output;
};

/**
 * @description Delete file meta by id
 * @author Antonio Marasco
 * @date 04/14/2023
 * @param id
 * @returns {*}
 */
export const deleteById = async (id: number): Promise<boolean> => {
  const deletedCount = await FileMeta.destroy({ where: { id }, logging: DbConfig.LOGGING });

  return !!deletedCount;
};

/**
 * @description Finds or creates a file meta based on criteria
 * @author Antonio Marasco
 * @date 04/14/2023
 * @param payload
 * @returns {*}
 */
export const findOrCreate = async (payload: FileMetaInput): Promise<FileMetaOutput> => {
  const [filemeta] = await FileMeta.findOrCreate({
    where: {
      id: payload.id
    },
    defaults: payload
  });

  return filemeta;
};

/**
 * @description Paginates file metas based on filters
 * @author Antonio Marasco
 * @date 04/14/2023
 * @param [filters]
 * @returns {*}
 */
export const paginate = async (
  filters?: AllFileMetaFilters
): Promise<{ rows: FileMetaOutput[]; count: number }> => {
  if (!isNil(filters?.limit) && !isNil(filters?.offset)) {
    return FileMeta.findAndCountAll({
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
  throw new Error(`bad request:  missing parameters => ${JSON.stringify(filters)}`);
};

/**
 * @description Updates file meta
 * @author Antonio Marasco
 * @date 04/14/2023
 * @param id Id of file meta to update
 * @param payload file meta object
 * @returns {*}
 */
export const update = async (
  id: number,
  payload: Partial<FileMetaInput>
): Promise<FileMetaOutput> => {
  const model = await FileMeta.findByPk(id, { logging: DbConfig.LOGGING });
  if (!model) {
    throw new Error(`not found:  cannot find by id: ${id}`);
  }

  const updatedModel = await model.update(payload);
  return updatedModel;
};
