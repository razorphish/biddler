import { Op } from 'sequelize';
import { RolePermissionInput, RolePermissionOutput } from '../../models/rolePermission.model';
import { AllRolePermissionFilters } from '../types';
import { DbConfig } from '../../common/idm.const';
import { RolePermission } from '../../models';
import { isNil } from 'lodash';

/**
 * @description Export all role permission(s)
 * @author Antonio Marasco
 * @date 05/25/2023
 * @param [filters]
 * @returns {*}
 */
export const all = async (filters?: AllRolePermissionFilters): Promise<RolePermissionOutput[]> => {
  return RolePermission.findAll({
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
 * @description Gets role permission by id
 * @author Antonio Marasco
 * @date 05/25/2023
 * @param roleId
 * @param permissionId
 * @param [filters]
 * @returns {*}
 */
export const byId = async (
  roleId: string,
  permissionid: string,
  filters?: AllRolePermissionFilters
): Promise<RolePermissionOutput> => {
  const model = await RolePermission.findOne({
    where: { roleId: roleId, permissionId: permissionid },
    ...(filters?.attributes && { attributes: filters?.attributes }),
    logging: DbConfig.LOGGING
  });

  if (!model) {
    throw new Error(`not found:  cannot find by roleId: ${roleId}, permissionId: ${permissionid}`);
  }

  return model;
};

/**
 * @description Creates role permission
 * @author Antonio Marasco
 * @date 05/25/2023
 * @param payload
 * @returns {*} Newly created role permission
 */
export const create = async (payload: RolePermissionInput): Promise<RolePermissionOutput> => {
  const output = await RolePermission.create(payload, { logging: DbConfig.LOGGING });
  return output;
};

/**
 * @description Delete role permission by id
 * @author Antonio Marasco
 * @date 03/22/2023
 * @param roleId Id of role
 * @param permissionId of permission
 * @returns {*}
 */
export const deleteById = async (roleId: string, permissionId: string): Promise<boolean> => {
  const deletedCount = await RolePermission.destroy({
    where: { roleId, permissionId },
    logging: DbConfig.LOGGING
  });

  return !!deletedCount;
};

/**
 * @description Finds or creates a role permission based on criteria
 * @author Antonio Marasco
 * @date 05/25/2023
 * @param payload
 * @returns {*}
 */
export const findOrCreate = async (payload: RolePermissionInput): Promise<RolePermissionOutput> => {
  const [model] = await RolePermission.findOrCreate({
    where: {
      roleId: payload.roleId,
      permissionId: payload.permissionId
    },
    defaults: payload,
    logging: DbConfig.LOGGING
  });

  return model;
};

/**
 * @description Paginates role permission(s) based on filters
 * @author Antonio Marasco
 * @date 05/25/2023
 * @param [filters]
 * @returns {*}
 */
export const paginate = async (
  filters?: AllRolePermissionFilters
): Promise<{ rows: RolePermissionOutput[]; count: number }> => {
  if (!isNil(filters?.limit) && !isNil(filters?.offset)) {
    return RolePermission.findAndCountAll({
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
 * @description Updates role permission
 * @author Antonio Marasco
 * @date 05/25/2023
 * @param roleId Id of role
 * @param permissionId Id of permission to
 * @param payload role permission object
 * @returns {*}
 */
export const update = async (
  roleId: string,
  permissionId: string,
  payload: Partial<RolePermissionInput>
): Promise<RolePermissionOutput> => {
  const model = await RolePermission.findOne({
    where: { roleId, permissionId },
    logging: DbConfig.LOGGING
  });
  if (!model) {
    throw new Error(`not found:  cannot find by role id: ${roleId}, permissionId: ${permissionId}`);
  }

  const updatedModel = await model.update(payload);
  return updatedModel;
};
