import { UserInput, UserOutput } from '../models/user.model';
import { AllUserFilters } from '../dal/types';
import * as DAL from '../dal/models/user.dal';

export const all = (filters: AllUserFilters): Promise<UserOutput[]> => {
  return DAL.all(filters);
};

export const byId = (id: number): Promise<UserOutput> => {
  return DAL.byId(id);
};

export const create = async (payload: UserInput): Promise<UserOutput> => {
  const exists = await DAL.checkUsername(payload.username);
  if (exists) {
    throw new Error('Username already exists');
  }
  return DAL.create(payload);
};

export const deleteById = (id: number): Promise<boolean> => {
  return DAL.deleteById(id);
};

export const update = async (id: number, payload: Partial<UserInput>): Promise<UserOutput> => {
  if (payload.username) {
    const exists = await DAL.checkUsername(payload.username);

    if (exists) {
      throw new Error('Username already exists');
    }
  }

  return DAL.update(id, payload);
};
