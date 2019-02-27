import each from 'lodash/each';
import { parseDate } from '.';

describe('date utility', () => {
  /* eslint-disable quote-props */
  const mapping = {
    // we can parse these...
    '01.01.1856': '01.01.1856',
    '01.01.1930': '01.01.1930',
    '01.10.1990': '01.10.1990',
    '1.1.1969': '01.01.1969',
    '010190': '01.01.1990',
    '011296': '01.12.1996',
    '100190': '10.01.1990',
    '11296': '11.02.1996',
    '1296': '01.02.1996',

    // ...but cannot parse these
    '10019': '10019',
    '0128': '0128',
    '123': '123',
    '12': '12',

    // special cases (fix these in ~20 years)
    '121010': '12.10.2010',
    '11212': '11.02.2012',
    '10118': '10.01.2018',
  };
  /* eslint-enable quote-props */

  each(mapping, (output, input) => {
    it(`parses ${input} as ${output}`, () => {
      expect(parseDate(input)).toBe(output);
    });
  });
});
