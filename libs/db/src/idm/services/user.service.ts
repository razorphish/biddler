/**
 * --------------------------------------------------------
 * @file Service Layer: User
 * @description Service layer should be used for data manipulation on/from payload
 * @author Antonio Marasco
 * --------------------------------------------------------
 */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AllUserFilters } from '../dal/models/types';
import { UserInput, UserOutput } from '../interfaces';
import * as DAL from '../dal/models/user.dal';
import * as crypter from '../../common/helpers/crypt.helper';
import { pbkdf2, pbkdf2Sync, randomBytes } from 'crypto';
import { logging } from '@biddler/logging';

@Injectable()
export class UserService {
  private readonly HASH_ITERATIONS = 15000;
  private readonly KEY_LEN = 32;

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

  async create(payload: UserInput): Promise<UserOutput> {
    const { salt, hash } = await this._generatePasswordHash(payload.password);
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
      payload.salt = crypter.generateSaltSync();
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
    const { salt, hash } = await this._generatePasswordHash(payload.password);

    payload.salt = salt;
    payload.password = hash;

    return DAL.create(payload);
  }

  async authenticate(username: string, password: string): Promise<boolean> {
    const user = await DAL.byUsername(username, { attributes: ['username', 'password', 'id'] });

    if (!user || !this._compare(password, user.password)) {
      throw new UnauthorizedException('Invalid user');
    }

    return true;
  }

  private _compare(password, hash) {
    if (!hash.startsWith('pbkdf2_')) {
      return false;
    }
    const parts = hash.split('$');
    const iterations = +parts[1];
    const salt = parts[2];
    const digest = parts[0].split('_')[1];

    return (
      pbkdf2Sync(password, salt, iterations, this.KEY_LEN, digest).toString('base64') === parts[3]
    );
  }

  private async _generatePasswordHash(password: string): Promise<{ salt: string; hash: string }> {
    const salt = randomBytes(12).toString('base64');
    const key = await new Promise<string>((resolve, reject) => {
      pbkdf2(password, salt, this.HASH_ITERATIONS, this.KEY_LEN, 'sha256', (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.toString('base64'));
        }
      });
    });

    const hash = `pbkdf2_sha256$${this.HASH_ITERATIONS}$${salt}$${key}`;

    return {
      salt,
      hash
    };
  }
}
