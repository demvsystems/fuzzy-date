// Parse the given date, with optional dots in between sections
const parseDateRegex = /([0-3]?[\d])\.?([01]?[\d])\.?([\d]{2,4})/;

/**
 * Fills the given number with a zero if it's below 10.
 *
 * @param {Number} string
 * @return {string} string
 */
const zeroFill = string => `0${string}`.slice(-2);

/**
 * Formats the given Date object as a d.m.Y string.
 *
 * @param {Date} date
 * @return {string}
 */
export const formatDate = (date) => {
  if (date === null || date === undefined) {
    return '';
  }

  return `${zeroFill(date.getDate())}.${zeroFill(date.getMonth() + 1)}.${date.getFullYear()}`;
};

/**
 * Parses the given date string and returns a DD.MM.YYYY string.
 *
 * @param {string} string
 * @param {Object} options Optional settings
 * @param {Number} options.currentCenturyThreshold
 *  The range of years in which we assign the current century for 2-digit year inputs
 * @return {Date|null} Either a parsed date instance or null if it could not be parsed properly
 */
export const parseDate = (string, { currentCenturyThreshold = 20 } = {}) => {
  const match = string.match(parseDateRegex);
  if (match === null) {
    return null;
  }

  const [, day, month, year] = match;

  // We fail if it's either too short or day/month is/are zero
  if (parseInt(day, 10) === 0 || parseInt(month, 10) === 0) {
    return null;
  }

  // Check if we have a full year already
  let yearValue;
  if (year.length === 4) {
    yearValue = year;
  } else {
    const yearDigit = year.substr(year.length - 2, 2);
    const currentYear = new Date().getFullYear();
    let century = Math.floor(currentYear / 100);

    // If the given year exceeds the range of X years, we assume the last century
    if (yearDigit > ((currentYear % 100) + currentCenturyThreshold)) {
      century -= 1;
    }

    yearValue = century + yearDigit;
  }

  return new Date(yearValue, month - 1, day);
};

/**
 * Tries to interpret the given date string
 * and reformats it to human readable output.
 *
 * If this fails, the original string is being returned.
 *
 * @param {string} string
 * @return {string}
 */
export const reformatDate = (string) => {
  const date = parseDate(string);

  return date !== null ? formatDate(date) : string;
};

export default reformatDate;
