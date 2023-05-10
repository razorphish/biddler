import { DateTime } from 'luxon';
import { Op } from 'sequelize';
import { CmsHolidayCalendar } from '../models';
import { DAY_OFFSET, WEEKEND_DAYS } from '../../constants';

/**
 * @description Checks if all the elements in array equal 1
 * @author Antonio Marasco
 * @date 2021-12-15
 * @param checks Array of numbers to check
 * @returns 1 if every element checks equals 1; otherwise false
 */
export function areAllOne(...checks: number[]): number {
  return +checks.every((check) => check === 1);
}

/**
 * @description If any elements in an array is equal to 1
 * @author Antonio Marasco
 * @date 2021-12-16
 * @export Array of numbers to check
 * @param checks
 * @returns 1 if one element checks equals 1; otherwise false
 */
export function areAnyOne(...checks: number[]): number {
  return +checks.some((check) => check === 1);
}

/**
 * @description
 * @author Antonio Marasco
 * @date 2021-12-15
 * @export
 * @param expression
 * @returns 1 if expression is yes, 0 if no, otherwise -1
 */
export function parseYesNo(expression: string): number {
  if (expression && expression.length > 0) {
    return expression === 'Yes' || expression === 'Y' ? 1 : 0;
  }
  return -1;
}

/**
 * @description Takes arguments array of number and adds them all up
 * @author Antonio Marasco
 * @date 2021-12-16
 * @export
 * @param values number[] array
 * @returns Summation of all values in property
 */
export function sum(...values: number[]): number {
  return values.reduce((previous, current) => previous + current, 0);
}

export function between(x: number, min: number, max: number): boolean {
  return x >= min && x <= max;
}

/**
 * @description caseStart or Start case is when all words in sequence are capitalized
 * @author Antonio Marasco
 * @date 2022-08-02
 * @param words
 * @returns startCase style splitWords
 * @example This Sentence Is Called As Start Case.
 */
export function caseStart(words: string) {
  const splitWords = words.toLowerCase().split(' ');
  for (let i = 0; i < splitWords.length; i++) {
    // could also use substring here splitWords[i].substring(1)
    splitWords[i] =
      splitWords[i].charAt(0).toUpperCase() + splitWords[i].slice(1);
  }

  // Directly return the joined string
  return splitWords.join(' ');
}

/**
 * @description
 * @author Antonio Marasco
 * @date 08/19/2022
 * @export
 * @param input
 * @param [format='dd/mm/yyyy']
 * @returns {*}
 */
export function isDate(input: string, format = 'dd/mm/yyyy') {
  return DateTime.fromFormat(input, format).isValid;
}

const isWeekendOrHoliday = (date: DateTime, holidays: DateTime[]): boolean =>
  WEEKEND_DAYS.includes(date.weekday) || holidays.some((d) => date.equals(d));

// Returns the Due Date as an ISOString
export const calcDueDate = async (
  date: Date | string,
  days: number,
  holidayList?: Partial<CmsHolidayCalendar>[]
): Promise<string> => {
  const luxonDate =
    date instanceof Date ? DateTime.fromJSDate(date) : DateTime.fromISO(date);
  const initialDate = luxonDate.startOf('day');
  let cmsHolidayCalendar = holidayList;

  if (!holidayList) {
    cmsHolidayCalendar = await CmsHolidayCalendar.findAll({
      where: {
        holidayDate: {
          [Op.gte]: initialDate.toISO(),
        },
      },
      attributes: ['holidayDate'],
    });
  }

  const cmsHolidaysList = cmsHolidayCalendar.map((cmsDate: any) =>
    DateTime.fromSQL(cmsDate.holidayDate).startOf('day')
  );

  let finalDate = initialDate.plus({ days });

  // The Due Date cannot land on a holiday or weekend, extend it until it's a weekday
  while (isWeekendOrHoliday(finalDate, cmsHolidaysList)) {
    finalDate = finalDate.plus(DAY_OFFSET);
  }

  return finalDate.toUTC().toISO();
};
