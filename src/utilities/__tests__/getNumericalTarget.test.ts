import { getClasses } from '../getClasses';
import { getClassesPairs } from '../getClassesPairs';
import { getNumericalTargets } from '../getNumericalTargets';
import { getSelectedResults } from '../getSelectedResults';

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

    expect(results[0][0]).toBeCloseTo(0.079);
    expect(results[0][1]).toBeCloseTo(0.079);
    expect(results[0][2]).toBeCloseTo(0.079);
    expect(results[0][3]).toBeCloseTo(0.079);
    expect(results[0][4]).toBeCloseTo(1.99);
    expect(results[0][5]).toBeCloseTo(1.99);
    expect(results[0][6]).toBeCloseTo(1.99);
    expect(results[0][7]).toBeCloseTo(1.99);

    expect(results[1][0]).toBeCloseTo(0.079);
    expect(results[1][1]).toBeCloseTo(0.079);
    expect(results[1][2]).toBeCloseTo(0.079);
    expect(results[1][3]).toBeCloseTo(0.079);
    expect(results[1][4]).toBeCloseTo(1.99);
    expect(results[1][5]).toBeCloseTo(1.99);
    expect(results[1][6]).toBeCloseTo(1.99);
    expect(results[1][7]).toBeCloseTo(1.99);

    expect(results[2][0]).toBeCloseTo(0.119);
    expect(results[2][1]).toBeCloseTo(0.119);
    expect(results[2][2]).toBeCloseTo(0.119);
    expect(results[2][3]).toBeCloseTo(0.119);
    expect(results[2][4]).toBeCloseTo(1.99);
    expect(results[2][5]).toBeCloseTo(1.99);
    expect(results[2][6]).toBeCloseTo(1.99);
    expect(results[2][7]).toBeCloseTo(1.99);
  });
});
