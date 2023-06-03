import { Optional } from 'sequelize';

export type CreateAddressDTO = {
  // Foreign Keys
  typeId: string;
  statusId: string;

  // Attributes
  line1: string;
  line2?: string;
  line3?: string;
  city?: string;
  state?: string;
  stateFips?: string;
  stateId?: string;
  postalCode?: string;
  postalCode4?: string;
  county?: string;
  countyFips?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
  density?: string;

  //Foreign keys
};

export type UpdateAddressDTO = Optional<CreateAddressDTO, 'statusId' | 'line1' | 'typeId'>;

export type FilterAddressDTO = {
  isActive?: boolean;
  isDeleted?: boolean;
  includeDeleted?: boolean;
};
