export interface Report {
  // Primary Key(s)
  id: number;

  // Foreign Key(s)
  statusId: string;
  outputMetaId: number;

  // Attribute(s)
  icon: string;
  title: string;
  description?: string;
  sortOrder?: number;
  meta?: ReportMetadata | null;
  effectiveStartDate: Date;
  effectiveEndDate: Date;

  // User Stamps
  createdBy?: string;
  lastUpdatedBy?: string;

  // Timestamps
  createdDate?: Date;
  lastUpdatedDate?: Date | null;
  deletedAt?: Date | null;
}

export interface ReportMetadata {
  systems: ReportMetadataSystem[];
}

export interface ReportMetadataSystem {
  name: string;
  schemaName: string;
  views?: ReportMetadataSystemStructure[] | null;
  storedProcedures?: ReportMetadataSystemStructure[] | null;
}

export interface ReportMetadataSystemStructure {
  name: string;
  modelName: string;
  sheetName?: string;
  generationId: string;
}
