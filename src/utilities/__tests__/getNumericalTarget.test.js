import { getClasses } from '../getClasses';
import { getClassesPairs } from '../getClassesPairs';
import { getNumericalTarget } from '../getNumericalTarget';
import { getSelectedResults } from '../getSelectedResults';

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

describe('Get numerical targets', () => {
  it('Get targets', () => {
    const classes = getClasses(categoricalTarget);
    const pairs = getClassesPairs(classes);
    let result = [];
    for (let i = 0; i < pairs.length; i++) {
      const target = getNumericalTarget(
        getSelectedResults(categoricalTarget, pairs[i]),
        getSelectedResults(predicted, pairs[i]),
        pairs[i],
      );
      result.push(target);
    }
    expect(result[0]).toStrictEqual([
      0.079, 0.079, 0.079, 0.079, 1.9909999999999999, 1.9909999999999999,
      1.9909999999999999, 1.9909999999999999,
    ]);
    expect(result[1]).toStrictEqual([
      0.079, 0.079, 0.079, 0.079, 1.9909999999999999, 1.9909999999999999,
      1.9909999999999999, 1.9909999999999999,
    ]);
    expect(result[2]).toStrictEqual([
      0.119, 0.119, 0.119, 0.119, 1.9909999999999999, 1.9909999999999999,
      1.9909999999999999, 1.9909999999999999,
    ]);
  });
});
