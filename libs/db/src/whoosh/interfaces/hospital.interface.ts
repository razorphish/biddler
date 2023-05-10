export interface Hospital {
  // Primary Key
  id: number;

  // Foreign Keys
  typeId?: string;
  statusId: string;

  // Attributes
  systemId?: number;
  providerId?: string;
  uniqueId?: string;
  name: string;
  alternateName?: string;
  largerHealthSystem?: string;
  largerHealthSystemCEO?: string;
  largerHealthSystemCEOEmail?: string;
  largerHealthSystemPOCName?: string;
  largerHealthSystemPOCEmail?: string;
  largerHealthSystemPOCPhone?: string;
  pocName?: string;
  pocEmail?: string;
  pocPhone?: string;
  hospitalCEO?: string;
  hospitalCEOTitle?: string;
  hospitalCEOPhone?: string;
  hospitalCEOEmail?: string;
  congressionalRepresentative?: string;
  phone?: string;
  size?: string;
  source?: string;
  sourceDate?: string;
  traumaLevel?: string;
  virtualAssistedLungMappingMethod?: string;
  url?: string;
  naicsCode?: string;
  naicsDescription?: string;
  hasHelipad?: number;
  numberBeds?: number;
  population?: number;
  ownerTypeId?: string;
  x?: number;
  y?: number;
  controlType?: string;
  totalStaff?: number;
  transactionId?: string;

  // Children

  // Timestamps
  createdDate?: Date;
  createdBy?: string;
  lastUpdatedDate?: Date | null;
  lastUpdatedBy?: string;
  deletedAt: Date | null;
}
