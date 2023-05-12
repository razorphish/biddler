import { Op } from 'sequelize';
import User, { UserInput, UserOutput } from '../models/user.model';
import { AllUserFilters } from './types';
import { isEmpty } from 'lodash';

/**
 * @description Gets all users
 * @author Antonio Marasco
 * @date 11/16/2022
 * @param [filters] Criteria to search
 * @returns {*}
 */
export const all = async (filters?: AllUserFilters): Promise<UserOutput[]> => {
  return User.findAll({
    where: {
      ...(filters?.isDeleted && { deletedAt: { [Op.not]: null } }),
      ...(filters?.isActive && { statusId: { [Op.eq]: 'active' } })
    },
    ...((filters?.isDeleted || filters?.includeDeleted) && { paranoid: false })
  });
};

/**
 * @description Gets Users by Id(PK)
 * @author Antonio Marasco
 * @date 11/15/2022
 * @param id Id of User
 * @returns {*} User
 */
export const byId = async (id: number): Promise<UserOutput> => {
  const model = await User.findByPk(id);

  if (!model) {
    throw new Error('not found');
  }

  return model;
};

/**
 * @description Checks if username exists
 * @author Antonio Marasco
 * @date 11/16/2022
 * @param username
 * @returns {*}
 */
export const checkUsername = async (username: string): Promise<boolean> => {
  const usernameExists = await User.findOne({
    where: {
      username
    }
  });

  return !isEmpty(usernameExists);
};

/**
 * @description Creates User
 * @author Antonio Marasco
 * @date 11/15/2022
 * @param payload
 * @returns {*} Newly created User object
 */
export const create = async (payload: UserInput): Promise<UserOutput> => {
  const output = await User.create(payload);
  return output;
};

/**
 * @description Deletes user by Id
 * @author Antonio Marasco
 * @date 11/16/2022
 * @param id Id of User
 * @returns {*} True if delete was successful, otherwise false
 */
export const deleteById = async (id: number): Promise<boolean> => {
  const deletedCount = await User.destroy({ where: { id } });

  return !!deletedCount;
};

/**
 * @description Updates User
 * @author Antonio Marasco
 * @date 11/16/2022
 * @param id
 * @param payload
 * @returns {*}
 */
export const update = async (id: number, payload: Partial<UserInput>): Promise<UserOutput> => {
  const model = await User.findByPk(id);
  if (!model) {
    throw new Error('not found');
  }

  const updatedModel = await model.update(payload);
  return updatedModel;
};
