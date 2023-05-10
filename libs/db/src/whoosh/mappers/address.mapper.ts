import { Address } from '../interfaces/address.interface';
import { AddressOutput } from '../models/address.model';

export const toAddress = (address: AddressOutput): Address => {
  return {
    id: address.id,
    statusId: address.statusId,
    typeId: address.typeId,

    line1: address.line1,
    line2: address.line2,
    line3: address.line3,
    city: address.city,
    state: address.state,
    stateFips: address.stateFips,
    stateId: address.stateId,
    postalCode: address.postalCode,
    postalCode4: address.postalCode4,
    county: address.county,
    countyFips: address.countyFips,
    country: address.country,
    latitude: address.latitude,
    longitude: address.longitude,
    density: address.density,

    createdDate: address.createdDate,
    createdBy: address.createdBy,
    lastUpdatedDate: address.lastUpdatedDate,
    lastUpdatedBy: address.lastUpdatedBy,
    deletedAt: address.deletedAt
  };
};
