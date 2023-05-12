import { Op } from 'sequelize';
import Permission, { PermissionInput, PermissionOutput } from '../models/permission.model';
import { AllPermissionFilters } from './types';

/**
 * @description Gets all Permissions
 * @author Antonio Marasco
 * @date 11/16/2022
 * @param [filters] Criteria to search
 * @returns {*}
 */
export const all = async (filters?: AllPermissionFilters): Promise<PermissionOutput[]> => {
  return Permission.findAll({
    where: {
      ...(filters?.isDeleted && { deletedAt: { [Op.not]: null } }),
      ...(filters?.isActive && { statusId: { [Op.eq]: 'active' } })
    },
    ...((filters?.isDeleted || filters?.includeDeleted) && { paranoid: false })
  });
};

/**
 * @description Gets Permissions by Id(PK)
 * @author Antonio Marasco
 * @date 11/15/2022
 * @param id Id of Permission
 * @returns {*} Permission
 */
export const byId = async (id: string): Promise<PermissionOutput> => {
  const model = await Permission.findByPk(id);

  if (!model) {
    throw new Error('not found');
  }

  return model;
};

/**
 * @description Creates Permission
 * @author Antonio Marasco
 * @date 11/15/2022
 * @param payload
 * @returns {*} Newly created Permission object
 */
export const create = async (payload: PermissionInput): Promise<PermissionOutput> => {
  const output = await Permission.create(payload);
  return output;
};

/**
 * @description Deletes Permission by Id
 * @author Antonio Marasco
 * @date 11/16/2022
 * @param id Id of Permission
 * @returns {*} True if delete was successful, otherwise false
 */
export const deleteById = async (id: string): Promise<boolean> => {
  const deletedCount = await Permission.destroy({ where: { id } });

  return !!deletedCount;
};

/**
 * @description Updates Permission
 * @author Antonio Marasco
 * @date 11/16/2022
 * @param id
 * @param payload
 * @returns {*}
 */
export const update = async (
  id: string,
  payload: Partial<PermissionInput>
): Promise<PermissionOutput> => {
  const model = await Permission.findByPk(id);
  if (!model) {
    throw new Error('not found');
  }

  const updatedModel = await model.update(payload);
  return updatedModel;
};
