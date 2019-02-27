// Parse the given date, with optional dots in between sections
const parseDateRegex = /([0-3]?[\d])\.?([01]?[\d])\.?([\d]{2,4})/;

/**
 * Fills the given string with a zero if it's below 10.
 *
 * @param string
 * @return string
 */
const zeroFill = (string) => {
  const number = parseInt(string, 10);
  return number < 10 ? `0${number}` : number;
};

/**
 * Parses the given date string and returns a DD.MM.YYYY string.
 *
 * @param string
 * @return string
 */
export const parseDate = (string) => {
  const match = string.match(parseDateRegex);
  if (match === null) {
    return string;
  }

  const [, day, month, year] = match;

  // We fail if it's either too short or day/month is/are zero
  if (parseInt(day, 10) === 0 || parseInt(month, 10) === 0) {
    return string;
  }

  // Check if we have a full year already
  let yearValue;
  if (year.length === 4) {
    yearValue = year;
  } else {
    const yearDigit = year.substr(year.length - 2, 2);
    const currentYear = new Date().getFullYear();
    let century = currentYear.toString().substr(0, 2);

    // If the given year is within a range of 20 years, we assume the last century
    if (yearDigit > ((currentYear % 100) + 20)) {
      century -= 1;
    }
    yearValue = zeroFill(century + yearDigit);
  }

  return `${zeroFill(day)}.${zeroFill(month)}.${yearValue}`;
};

export default parseDate;
