import { Op } from 'sequelize';
import Permission from '../models/permission.model';
import Role, { RoleInput, RoleOutput } from '../models/role.model';
import { AllRoleFilters } from './types';

/**
 * @description Gets all Roles
 * @author Antonio Marasco
 * @date 11/16/2022
 * @param [filters] Criteria to search
 * @returns {*}
 */
export const all = async (filters?: AllRoleFilters): Promise<RoleOutput[]> => {
  return Role.findAll({
    where: {
      ...(filters?.isDeleted && { deletedAt: { [Op.not]: null } }),
      ...(filters?.isActive && { statusId: { [Op.eq]: 'active' } })
    },
    ...((filters?.isDeleted || filters?.includeDeleted) && { paranoid: false }),
    ...(filters?.includeIncludeables && {
      include: [
        {
          ...(filters?.includePermissions && {
            model: Permission,
            as: 'permissions'
          })
        }
      ]
    })
  });
};

/**
 * @description Gets Roles by Id(PK)
 * @author Antonio Marasco
 * @date 11/15/2022
 * @param id Id of Role
 * @returns {*} Role
 */
export const byId = async (id: string): Promise<RoleOutput> => {
  const model = await Role.findByPk(id);

  if (!model) {
    throw new Error('not found');
  }

  return model;
};

/**
 * @description Creates Role
 * @author Antonio Marasco
 * @date 11/15/2022
 * @param payload
 * @returns {*} Newly created Role object
 */
export const create = async (payload: RoleInput): Promise<RoleOutput> => {
  const output = await Role.create(payload);
  return output;
};

/**
 * @description Deletes Role by Id
 * @author Antonio Marasco
 * @date 11/16/2022
 * @param id Id of Role
 * @returns {*} True if delete was successful, otherwise false
 */
export const deleteById = async (id: string): Promise<boolean> => {
  const deletedCount = await Role.destroy({ where: { id } });

  return !!deletedCount;
};

/**
 * @description Updates Role
 * @author Antonio Marasco
 * @date 11/16/2022
 * @param id
 * @param payload
 * @returns {*}
 */
export const update = async (id: string, payload: Partial<RoleInput>): Promise<RoleOutput> => {
  const model = await Role.findByPk(id);
  if (!model) {
    throw new Error('not found');
  }

  const updatedModel = await model.update(payload);
  return updatedModel;
};
