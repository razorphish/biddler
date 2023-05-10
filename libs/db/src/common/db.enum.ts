export enum COLUMN_VALIDATION {
  LENGTH = 'String length is not in this range',
  MAX = 'String length is beyond max range'
}

export enum COLUMN_NAME {
  DELETED_AT = 'DLTD_AT',
  DELETED_DT = 'DLTD_DT',
  CREATED_DT = 'CREATD_DT',
  CREATED_BY = 'CREATD_BY',
  LAST_UPDATED_DATE = 'LAST_UPDATD_DT',
  LAST_UPDATED_BY = 'LAST_UPDATD_BY',
  STATUS_ID = 'STUS_TYPE_CD',
  EFFECTIVE_START_DATE = 'EFCTV_STRT_DT',
  EFFECTIVE_END_DATE = 'EFCTV_END_DT'
}

export enum DEFAULT_VALUE {
  BY = 'SYSTEM'
}
