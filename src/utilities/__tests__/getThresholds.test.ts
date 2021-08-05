import { getClasses } from '../getClasses';
import { getClassesPairs } from '../getClassesPairs';
import { getSelectedResults } from '../getSelectedResults';
import { getThresholds } from '../getThresholds';

const target = [
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
    const classes = getClasses(target);
    const pairs = getClassesPairs(classes);
    const results: number[][] = [];
    for (const pair of pairs) {
      const tests = getSelectedResults(predicted, pair);
      results.push(getThresholds(tests));
    }

    expect(results[0][0]).toBeCloseTo(0.08);
    expect(results[0][1]).toBeCloseTo(0.1);
    expect(results[0][2]).toBeCloseTo(0.125);
    expect(results[0][3]).toBeCloseTo(0.14);
    expect(results[0][4]).toBeCloseTo(0.53);
    expect(results[0][5]).toBeCloseTo(0.92);
    expect(results[0][6]).toBeCloseTo(0.94);
    expect(results[0][7]).toBeCloseTo(1.47);
    expect(results[0][8]).toBeCloseTo(1.99);

    expect(results[1][0]).toBeCloseTo(0.08);
    expect(results[1][1]).toBeCloseTo(0.105);
    expect(results[1][2]).toBeCloseTo(0.14);
    expect(results[1][3]).toBeCloseTo(0.549);
    expect(results[1][4]).toBeCloseTo(1.35);
    expect(results[1][5]).toBeCloseTo(1.8);
    expect(results[1][6]).toBeCloseTo(1.9);
    expect(results[1][7]).toBeCloseTo(1.97);
    expect(results[1][8]).toBeCloseTo(1.99);

    expect(results[2][0]).toBeCloseTo(0.12);
    expect(results[2][1]).toBeCloseTo(0.515);
    expect(results[2][2]).toBeCloseTo(0.92);
    expect(results[2][3]).toBeCloseTo(1.34);
    expect(results[2][4]).toBeCloseTo(1.8);
    expect(results[2][5]).toBeCloseTo(1.9);
    expect(results[2][6]).toBeCloseTo(1.97);
    expect(results[2][7]).toBeCloseTo(1.99);
  });
});
