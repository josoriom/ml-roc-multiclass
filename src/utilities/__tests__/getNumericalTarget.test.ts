import { Class } from '../../../types/Class';
import { getClasses } from '../getClasses';
import { getClassesPairs } from '../getClassesPairs';
import { getNumericalTarget } from '../getNumericalTarget';
import { getSelectedResults } from '../getSelectedResults';

const target: string[] = [
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

const predicted: number[] = [
  0.95, 0.15, 0.13, 0.08, 0.93, 0.91, 1.99, 0.12, 1.85, 1.95, 1.75, 1.99,
];

describe('Get numerical targets', () => {
  it('Get targets', () => {
    const classes: Class[] = getClasses(target);
    const pairs: [Class, Class][] = getClassesPairs(classes);
    let result: number[][] = [];
    for (let pair of pairs) {
      const numericalTarget: number[] = getNumericalTarget(
        getSelectedResults(target, pair),
        getSelectedResults(predicted, pair),
        pair,
      );
      result.push(numericalTarget);
    }

    expect(result[0][0]).toBeCloseTo(0.079);
    expect(result[0][1]).toBeCloseTo(0.079);
    expect(result[0][2]).toBeCloseTo(0.079);
    expect(result[0][3]).toBeCloseTo(0.079);
    expect(result[0][4]).toBeCloseTo(1.99);
    expect(result[0][5]).toBeCloseTo(1.99);
    expect(result[0][6]).toBeCloseTo(1.99);
    expect(result[0][7]).toBeCloseTo(1.99);

    expect(result[1][0]).toBeCloseTo(0.079);
    expect(result[1][1]).toBeCloseTo(0.079);
    expect(result[1][2]).toBeCloseTo(0.079);
    expect(result[1][3]).toBeCloseTo(0.079);
    expect(result[1][4]).toBeCloseTo(1.99);
    expect(result[1][5]).toBeCloseTo(1.99);
    expect(result[1][6]).toBeCloseTo(1.99);
    expect(result[1][7]).toBeCloseTo(1.99);

    expect(result[2][0]).toBeCloseTo(0.119);
    expect(result[2][1]).toBeCloseTo(0.119);
    expect(result[2][2]).toBeCloseTo(0.119);
    expect(result[2][3]).toBeCloseTo(0.119);
    expect(result[2][4]).toBeCloseTo(1.99);
    expect(result[2][5]).toBeCloseTo(1.99);
    expect(result[2][6]).toBeCloseTo(1.99);
    expect(result[2][7]).toBeCloseTo(1.99);
  });
});
