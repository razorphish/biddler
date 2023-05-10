import { DateTime, Settings } from 'luxon';
import { DATE_LONG_MONTH_FORMAT, DAY_OFFSET, GLOBAL_TIME_ZONE } from '../constants';

/**
 * NOTE: We're using luxon because it allows for a globally set timezone (moment does as well but moment is no longer supported)
 * The global timezone is important for mui date inputs to output dates in out specified timezone
 * According to this issue: https://github.com/sequelize/sequelize/issues/13372
 * Sequelize will be transitioning from moment to dayjs with the release of v7
 * dayjs does allow for a global timezone to be set but then requires you to call dayjs via daysjs.tz({DateTime}) instead
 * of the normal dayjs({DateTime}) this does not work with the mui inputs which is why we're not using dayjs globally
 */

Settings.defaultZone = GLOBAL_TIME_ZONE;

/*
 * Takes a Date object and outputs a date string for the Eastern time zone
 * Defaults to outputting dates in January 10, 2023 format
 */
export function formatDate(
  input: Date | DateTime | string,
  formatPattern: string = DATE_LONG_MONTH_FORMAT
) {
  if (input) {
    if (input instanceof Date) {
      return DateTime.fromJSDate(input).toFormat(formatPattern);
    }

    if (input instanceof DateTime) {
      return input.toFormat(formatPattern);
    }

    if (typeof input === 'string') {
      return input;
    }
  }

  // date is either falsy, not a Date, or not a string
  return '';
}

/**
 * NOTE: Luxon starts the week with Monday and ends it with Sunday, and
 * there's no setting to allow for Sunday to be the first day of the week.
 * These methods compensate for this issue.
 */

export function endOfWeek(value: DateTime) {
  return value.plus(DAY_OFFSET).endOf('week').minus(DAY_OFFSET);
}

export function startOfWeek(value: DateTime) {
  return value.plus(DAY_OFFSET).startOf('week').minus(DAY_OFFSET);
}
