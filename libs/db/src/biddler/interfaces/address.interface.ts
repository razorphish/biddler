import { TimestampAttributes } from '../../global/interfaces';
export interface Address extends TimestampAttributes {
  // Primary Key
  id: number;

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

  // Children
}
