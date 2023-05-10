import { FindAttributeOptions } from 'sequelize';

interface ListFilters {
  limit?: number;
  offset?: number;
  isDeleted?: boolean;
  includeDeleted?: boolean;
  status?: string;
  attributes?: FindAttributeOptions;
}

export interface AllAddressFilters extends ListFilters {
  typeId?: string;
}

export interface AllCaseFilters extends ListFilters {}
export interface AllComplaintIntakeFilters extends ListFilters {}
export interface AllHospitalFilters extends ListFilters {}
export interface AllReportFilters extends ListFilters {
  checkEffectiveDate?: boolean;
  orderBySortOrder?: boolean;
}
export interface AllReportOutputHistoryFilters extends ListFilters {
  checkEffectiveDate?: boolean;
  orderBySortOrder?: boolean;
}

export interface AllFileMetaFilters extends ListFilters {}
