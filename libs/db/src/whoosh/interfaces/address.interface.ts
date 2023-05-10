export interface Address {
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

  // Timestamps
  createdDate?: Date;
  createdBy?: string;
  lastUpdatedDate?: Date | null;
  lastUpdatedBy?: string;
  deletedAt: Date | null;
}
