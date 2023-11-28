/**
 * --------------------------------------------------------
 * @file Service Layer: User
 * @description Service layer should be used for data manipulation on/from payload
 * @author Antonio Marasco
 * --------------------------------------------------------
 */
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AllUserFilters } from '../dal/models/types';
import { UserInput, UserOutput } from '../interfaces';
import * as DAL from '../dal/models/user.dal';

import {
  compare,
  compareSync,
  generateSaltSync,
  generateSaltWithPassword
} from '../../common/helpers/crypt.helper';

@Injectable()
export class UserService {
  private readonly HASH_ROUNDS = 10;

  all(filters: AllUserFilters): Promise<UserOutput[]> {
    const queryFilters = {
      // attributes: ['id', 'title', 'sortOrder', 'statusId', 'description', 'icon'],
      ...filters
    };
    return DAL.all(queryFilters);
  }

  byId(id: number, filters?: AllUserFilters): Promise<UserOutput> {
    return DAL.byId(id, filters);
  }

  byUsername(username: string, filters?: AllUserFilters): Promise<UserOutput> {
    return DAL.byUsername(username, filters);
  }

  async create(payload: UserInput): Promise<UserOutput> {
    const { salt, hash } = await generateSaltWithPassword(this.HASH_ROUNDS, payload.password);
    payload.salt = salt;

    if (payload.password) {
      payload.password = hash;
    }

    return DAL.create(payload);
  }

  deleteById(id: number): Promise<boolean> {
    return DAL.deleteById(id);
  }

  findOrCreate(payload: UserInput): Promise<UserOutput> {
    if (!payload.salt) {
      payload.salt = generateSaltSync();
    }
    return DAL.findOrCreate(payload);
  }

  paginate(filters: AllUserFilters): Promise<{ rows: UserOutput[]; count: number }> {
    return DAL.paginate(filters);
  }

  update(id: number, payload: Partial<UserInput>): Promise<UserOutput> {
    return DAL.update(id, payload);
  }

  async register(payload: UserInput): Promise<UserOutput> {
    const { salt, hash } = await generateSaltWithPassword(this.HASH_ROUNDS, payload.password);

    payload.salt = salt;
    payload.password = hash;

    return DAL.create(payload);
  }

  async authenticate(username: string, password: string): Promise<boolean | UserOutput> {
    const user = await DAL.byUsername(username, {
      attributes: { include: ['username', 'password', 'id'] }
    });

    // 2. Determine if user exists
    if (!user) {
      throw new NotFoundException('User does not exist');
    }

    // 3. Check password
    const compareHash = await compare(password, user.password);
    if (!compareHash) {
      throw new UnauthorizedException('Invalid user');
    }

    return user;
  }

  authenticateSync(user: UserOutput): boolean | UserOutput {
    // 1. Determine if user exists
    if (!user) {
      throw new NotFoundException('User does not exist');
    }

    // 2. Check password
    const compareHash = compareSync(user.basicPassword, user.password);
    if (!compareHash) {
      throw new UnauthorizedException('Invalid user');
    }

    return user;
  }
}
