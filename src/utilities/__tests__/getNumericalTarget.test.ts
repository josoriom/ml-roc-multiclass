import { toBeDeepCloseTo } from 'jest-matcher-deep-close-to';

import { getClasses } from '../getClasses';
import { getClassesPairs } from '../getClassesPairs';
import { getNumericalTargets } from '../getNumericalTargets';
import { getSelectedResults } from '../getSelectedResults';

expect.extend({ toBeDeepCloseTo });

const targets = [
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

const predictions = [
  0.95, 0.15, 0.13, 0.08, 0.93, 0.91, 1.99, 0.12, 1.85, 1.95, 1.75, 1.99,
];

describe('Get numerical targets', () => {
  it('Get targets', () => {
    const classes = getClasses(targets);
    const pairs = getClassesPairs(classes);
    const results: number[][] = [];
    for (const pair of pairs) {
      const numericalTarget = getNumericalTargets(
        getSelectedResults(targets, pair),
        getSelectedResults(predictions, pair),
        pair,
      );
      results.push(numericalTarget);
    }

    expect(results[0]).toBeDeepCloseTo(
      [0.079, 0.079, 0.079, 0.079, 1.991, 1.991, 1.991, 1.991],
      3,
    );

    expect(results[1]).toBeDeepCloseTo(
      [0.079, 0.079, 0.079, 0.079, 1.991, 1.991, 1.991, 1.991],
      3,
    );

    expect(results[2]).toBeDeepCloseTo(
      [0.119, 0.119, 0.119, 0.119, 1.991, 1.991, 1.991, 1.991],
      3,
    );
  });
});
