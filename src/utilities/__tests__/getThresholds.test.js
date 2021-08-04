import { toBeDeepCloseTo } from 'jest-matcher-deep-close-to';

import { getClasses } from '../getClasses';
import { getClassesPairs } from '../getClassesPairs';
import { getSelectedResults } from '../getSelectedResults';
import { getThresholds } from '../getThresholds';

expect.extend({ toBeDeepCloseTo });

const categoricalTarget = [
  'class1',
  'class1',
  'class1',
  'class1',
  'class2',
  'class2',
  'class2',
  'class2',
  'class3',
  'class3',
  'class3',
  'class3',
];

const predicted = [
  0.95, 0.15, 0.13, 0.08, 0.93, 0.91, 1.99, 0.12, 1.85, 1.95, 1.75, 1.99,
];

describe('Get pairs from array of classes', () => {
  it('Get classes from categorical targets', () => {
    const classes = getClasses(categoricalTarget);
    const pairs = getClassesPairs(classes);
    let result = [];
    for (let i = 0; i < pairs.length; i++) {
      const test = getSelectedResults(predicted, pairs[i]);
      result.push(getThresholds(test));
    }
    expect(result[0]).toBeDeepCloseTo(
      [0.08, 0.1, 0.125, 0.14, 0.53, 0.92, 0.94, 1.47, 1.99],
      2,
    );
    expect(result[1]).toBeDeepCloseTo(
      [0.08, 0.1, 0.14, 0.54, 1.35, 1.8, 1.9, 1.97, 1.99],
      2,
    );
    expect(result[2]).toBeDeepCloseTo(
      [0.12, 0.515, 0.92, 1.34, 1.8, 1.9, 1.97, 1.99],
      2,
    );
  });
});
