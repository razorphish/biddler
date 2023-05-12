import { Op } from 'sequelize';
import RolePermission, {
  RolePermissionInput,
  RolePermissionOutput
} from '../models/rolePermission.model';
import { AllRolePermissionFilters } from './types';

/**
 * @description Gets all RolePermissions
 * @author Antonio Marasco
 * @date 11/16/2022
 * @param [filters] Criteria to search
 * @returns {*}
 */
export const all = async (filters?: AllRolePermissionFilters): Promise<RolePermissionOutput[]> => {
  return RolePermission.findAll({
    where: {
      ...(filters?.isDeleted && { deletedAt: { [Op.not]: null } }),
      ...(filters?.isActive && { statusId: { [Op.eq]: 'active' } })
    },
    ...((filters?.isDeleted || filters?.includeDeleted) && { paranoid: false })
  });
};

/**
 * @description Creates RolePermissions from an array
 * @author Antonio Marasco
 * @date 11/16/2022
 * @param RolePermissions Array of RolePermissions
 * @returns {*} Newly created RolePermissions
 */
export const bulkCreate = async (
  RolePermissions: RolePermissionInput[]
): Promise<RolePermissionOutput[]> => {
  return RolePermission.bulkCreate(RolePermissions);
};

/**
 * @description Gets RolePermissions by Id(PK)
 * @author Antonio Marasco
 * @date 11/15/2022
 * @param id Id of RolePermission
 * @returns {*} RolePermission
 */
export const byId = async (
  roleId: string,
  permissionId: string,
  filters: AllRolePermissionFilters
): Promise<RolePermissionOutput> => {
  const currentDate = Date.now();

  const model = await RolePermission.findOne({
    where: {
      roleId,
      permissionId,
      ...(filters?.isDeleted && { deletedAt: { [Op.not]: null } }),
      ...(filters?.isActive && { statusId: { [Op.eq]: 'active' } }),
      ...(filters?.isInEffectiveDateRange && {
        [Op.and]: {
          effectiveStartDate: { [Op.lte]: currentDate },
          effectiveEndDate: { [Op.gte]: currentDate }
        }
      })
    },
    ...((filters?.isDeleted || filters?.includeDeleted) && { paranoid: false })
  });

  if (!model) {
    throw new Error('not found');
  }

  return model;
};

/**
 * @description Gets RolePermission(s) by User Id
 * @author Antonio Marasco
 * @date 11/16/2022
 * @param userId
 * @param [filters]
 * @returns {*}
 */
export const byPermissionId = async (
  permissionId: string,
  filters?: AllRolePermissionFilters
): Promise<RolePermissionOutput[]> => {
  const currentDate = Date.now();

  return RolePermission.findAll({
    where: {
      permissionId,
      ...(filters?.isDeleted && { deletedAt: { [Op.not]: null } }),
      ...(filters?.isActive && { statusId: { [Op.eq]: 'active' } }),
      ...(filters?.isInEffectiveDateRange && {
        [Op.and]: {
          effectiveStartDate: { [Op.lte]: currentDate },
          effectiveEndDate: { [Op.gte]: currentDate }
        }
      })
    },
    ...((filters?.isDeleted || filters?.includeDeleted) && { paranoid: false })
  });
};

/**
 * @description Gets RolePermission(s) by User Id
 * @author Antonio Marasco
 * @date 11/16/2022
 * @param roleId
 * @param [filters]
 * @returns {*}
 */
export const byRoleId = async (
  roleId: string,
  filters?: AllRolePermissionFilters
): Promise<RolePermissionOutput[]> => {
  const currentDate = Date.now();

  return RolePermission.findAll({
    where: {
      roleId,
      ...(filters?.isDeleted && { deletedAt: { [Op.not]: null } }),
      ...(filters?.isActive && { statusId: { [Op.eq]: 'active' } }),
      ...(filters?.isInEffectiveDateRange && {
        [Op.and]: {
          effectiveStartDate: { [Op.lte]: currentDate },
          effectiveEndDate: { [Op.gte]: currentDate }
        }
      })
    },
    ...((filters?.isDeleted || filters?.includeDeleted) && { paranoid: false })
  });
};

/**
 * @description Creates RolePermission
 * @author Antonio Marasco
 * @date 11/15/2022
 * @param payload
 * @returns {*} Newly created RolePermission object
 */
export const create = async (payload: RolePermissionInput): Promise<RolePermissionOutput> => {
  const output = await RolePermission.create(payload);
  return output;
};

/**
 * @description Deletes RolePermission by Id
 * @author Antonio Marasco
 * @date 11/16/2022
 * @param id Id of RolePermission
 * @returns {*} True if delete was successful, otherwise false
 */
export const deleteById = async (roleId: string, permissionId: string): Promise<boolean> => {
  const deletedCount = await RolePermission.destroy({
    where: { roleId, permissionId }
  });

  return !!deletedCount;
};

/**
 * @description Deletes RolePermissions by User Id
 * @author Antonio Marasco
 * @date 11/16/2022
 * @param id Id of RolePermission
 * @returns {*} True if delete was successful, otherwise false
 */
export const deleteByPermissionId = async (permissionId: string): Promise<boolean> => {
  const deletedCount = await RolePermission.destroy({
    where: { permissionId }
  });

  return !!deletedCount;
};

/**
 * @description Deletes RolePermissions by Role Id
 * @author Antonio Marasco
 * @date 11/16/2022
 * @param id Id of RolePermission
 * @returns {*} True if delete was successful, otherwise false
 */
export const deleteByRoleId = async (roleId: string): Promise<boolean> => {
  const deletedCount = await RolePermission.destroy({ where: { roleId } });

  return !!deletedCount;
};

/**
 * @description Updates RolePermission
 * @author Antonio Marasco
 * @date 11/16/2022
 * @param id
 * @param payload
 * @returns {*}
 */
export const update = async (
  roleId: string,
  permissionId: string,
  payload: Partial<RolePermissionInput>
): Promise<RolePermissionOutput> => {
  const model = await RolePermission.findOne({
    where: { roleId, permissionId }
  });
  if (!model) {
    throw new Error('not found');
  }

  const updatedModel = await model.update(payload);
  return updatedModel;
};
