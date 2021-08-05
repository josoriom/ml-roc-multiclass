import { Class } from '../../../types/Class';
import { getClasses } from '../getClasses';
import { getClassesPairs } from '../getClassesPairs';
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

describe('Get selected results from pairs of classes', () => {
  it('Get classes from categorical targets', () => {
    const classes: Class[] = getClasses(target);
    const pairs: Class[][] = getClassesPairs(classes);

    expect(getSelectedResults(predicted, pairs[0])).toStrictEqual([
      0.95, 0.15, 0.13, 0.08, 0.93, 0.91, 1.99, 0.12,
    ]);
    expect(getSelectedResults(predicted, pairs[1])).toStrictEqual([
      0.95, 0.15, 0.13, 0.08, 1.85, 1.95, 1.75, 1.99,
    ]);
    expect(getSelectedResults(predicted, pairs[2])).toStrictEqual([
      0.93, 0.91, 1.99, 0.12, 1.85, 1.95, 1.75, 1.99,
    ]);
  });
});
