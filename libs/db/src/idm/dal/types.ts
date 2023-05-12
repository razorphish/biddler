interface ListFilters {
  isDeleted?: boolean;
  includeDeleted?: boolean;
  isActive?: boolean;
}
export interface AllAccessTokenFilters extends ListFilters {}
export interface AllApplicationFilters extends ListFilters {}
export interface AllSystemFilters extends ListFilters {}
export interface AllApiClientFilters extends ListFilters {}
export interface AllRoleFilters extends ListFilters {
  includeIncludeables?: boolean;
  includePermissions?: boolean;
}
export interface AllPermissionFilters extends ListFilters {}
export interface AllUserFilters extends ListFilters {}
export interface AllUserRoleFilters extends ListFilters {
  isInEffectiveDateRange?: boolean;
}
export interface AllRolePermissionFilters extends ListFilters {
  isInEffectiveDateRange?: boolean;
}
