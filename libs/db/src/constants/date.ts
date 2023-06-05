import { Duration } from 'luxon';

export const GLOBAL_TIME_ZONE = 'America/New_York';
export const DAY_OFFSET = Duration.fromObject({ days: 1 });
export const WEEKEND_DAYS = [6, 7];

export const DATETIME_FORMAT = 'M/d/yyyy, h:mm a ZZZZ';
export const DATE_ONLY_FORMAT = 'M/d/yyyy';
export const DATE_LONG_MONTH_FORMAT = 'MMMM d, yyyy';
