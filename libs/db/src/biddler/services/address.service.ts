/**
 * --------------------------------------------------------
 * @file Service Layer: Address
 * @description Service layer should be used for data manipulation on/from payload
 * @author Antonio Marasco
 * --------------------------------------------------------
 */
import { Injectable } from '@nestjs/common';
import { AllAddressFilters } from '../dal/models/types';
import { Address, AddressInput } from '../interfaces';
import * as DAL from '../dal/models/address.dal';

@Injectable()
export class AddressService {
  all(filters: AllAddressFilters): Promise<Address[]> {
    const queryFilters = {
      attributes: ['id', 'title', 'sortOrder', 'statusId', 'description', 'icon'],
      includeDeleted: false,
      ...filters
    };
    return DAL.all(queryFilters);
  }

  byId(id: number): Promise<Address> {
    return DAL.byId(id);
  }

  create(payload: AddressInput): Promise<Address> {
    return DAL.create(payload);
  }

  deleteById(id: number): Promise<boolean> {
    return DAL.deleteById(id);
  }

  paginate(filters: AllAddressFilters): Promise<{ rows: Address[]; count: number }> {
    return DAL.paginate(filters);
  }

  update(id: number, payload: Partial<AddressInput>): Promise<Address> {
    return DAL.update(id, payload);
  }
}
