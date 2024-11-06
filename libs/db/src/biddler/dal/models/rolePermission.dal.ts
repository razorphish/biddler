/**
 * --------------------------------------------------------
 * @file Data Access Layer: RolePermission
 * @description DAL should only data-base level logic (i.e. filters, finds, creates, updates)
 * @author Antonio Marasco
 * --------------------------------------------------------
 */
import { isNil } from 'lodash';
import { Op } from 'sequelize';
import { DbConfig } from '../../../common/constants/biddler.const';
import { AllRolePermissionFilters } from './types';
import RolePermission, {
  RolePermissionInput,
  RolePermissionOutput
} from '../../models/rolePermission.model';

/**
 * @description Gets every [rolePermission]
 * @author Antonio Marasco
 * @date 05/22/2023
 * @param [filters]
 * @param [attributes]
 * @returns {*}
 */
export const all = async (filters?: AllRolePermissionFilters): Promise<RolePermissionOutput[]> => {
  //const _date = Date.now();
  return RolePermission.findAll({
    ...(filters?.attributes && { attributes: filters?.attributes }),
    where: {
      ...(filters?.isDeleted && { deletedAt: { [Op.not]: null } }),
      ...(filters?.status && { statusId: { [Op.eq]: filters.status } })
      // ...(filters?.checkEffectiveDate && {
      //   [Op.and]: {
      //     effectiveStartDate: { [Op.lte]: { _date } },
      //     effectiveEndDate: { [Op.gte]: { _date } }
      //   }
      // })
    },
    //...(filters?.orderBySortOrder && { order: [['sortOrder', 'ASC']] }),
    ...((filters?.isDeleted || filters?.includeDeleted) && { paranoid: false }),
    logging: DbConfig.LOGGING
  });
};

/**
 * @description Gets [rolePermission] by Id(PK)
 * @author Antonio Marasco
 * @date 05/22/2023
 * @param roleId id of role
 * @param permissionId id of permission
 * @returns {*} [rolePermission]
 */
export const byId = async (
  roleId: string,
  permissionId: string,
  filters?: AllRolePermissionFilters
): Promise<RolePermissionOutput> => {
  const model = await RolePermission.findOne({
    where: { roleId, permissionId },
    ...(filters?.attributes && { attributes: filters?.attributes }),
    logging: DbConfig.LOGGING
  });

  if (!model) {
    throw new Error(`not found:  cannot find by roleId: ${roleId}, permissionId: ${permissionId}`);
  }

  return model;
};

/**
 * @description Creates a [rolePermission]
 * @author Antonio Marasco
 * @date 05/22/2023
 * @param payload
 * @returns {*} Newly created [rolePermission] object
 */
export const create = async (payload: RolePermissionInput): Promise<RolePermissionOutput> => {
  const output = await RolePermission.create(payload, { logging: DbConfig.LOGGING });
  return output;
};

/**
 * @description Delete [rolePermission] by id
 * @author Antonio Marasco
 * @date 05/22/2023
 * @param roleId id of role
 * @param permissionId id of permission
 * @returns {*} True if deletion was successful; otherwise false.
 */
export const deleteById = async (roleId: string, permissionId: string): Promise<boolean> => {
  const deletedCount = await RolePermission.destroy({
    where: { roleId, permissionId },
    logging: DbConfig.LOGGING
  });

  return !!deletedCount;
};

/**
 * @description Finds or creates a [rolePermission] based on criteria
 * @author Antonio Marasco
 * @date 05/22/2023
 * @param payload
 * @returns {*}
 */
export const findOrCreate = async (payload: RolePermissionInput): Promise<RolePermissionOutput> => {
  const [model] = await RolePermission.findOrCreate({
    where: {
      roleId: payload.roleId,
      permissionId: payload.permissionId
    },
    defaults: payload
  });

  return model;
};

/**
 * @description Paginates [rolePermission] list based on filters
 * @author Antonio Marasco
 * @date 05/22/2023
 * @param [filters]
 * @returns {*}
 */
export const paginate = async (
  filters?: AllRolePermissionFilters
): Promise<{ rows: RolePermissionOutput[]; count: number }> => {
  if (!isNil(filters?.limit) && !isNil(filters?.offset)) {
    //const _date = Date.now();
    return RolePermission.findAndCountAll({
      ...(filters?.attributes && { attributes: filters?.attributes }),
      limit: filters.limit,
      offset: (filters.offset - 1) * filters.limit,
      where: {
        ...(filters?.isDeleted && { deletedAt: { [Op.not]: null } }),
        ...(filters?.status && { statusId: { [Op.eq]: filters.status } })
        // ...(filters?.checkEffectiveDate && {
        //   [Op.and]: {
        //     effectiveStartDate: { [Op.lte]: { _date } },
        //     effectiveEndDate: { [Op.gte]: { _date } }
        //   }
        // })
      },
      //...(filters?.orderBySortOrder && { order: [['sortOrder', 'ASC']] }),
      ...((filters?.isDeleted || filters?.includeDeleted) && { paranoid: false }),
      logging: DbConfig.LOGGING
    });
  }
  throw new Error(`bad request:  missing parameters => ${JSON.stringify(filters)}`);
};

/**
 * @description Updates [rolePermission]
 * @author Antonio Marasco
 * @date 05/22/2023
 * @param roleId id of role
 * @param permissionId id of permission
 * @param payload [rolePermission] object
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
    throw new Error(`not found:  cannot find by roleId: ${roleId}, permissionId: ${permissionId}`);
  }

  const updatedModel = await model.update(payload);
  return updatedModel;
};
