import { Class } from '../../../types/Class';
import { getClasses } from '../getClasses';
import { getClassesPairs } from '../getClassesPairs';

const categoricalTarget: string[] = [
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

describe('Get pairs from array of classes', () => {
  it('Get pairs of 3 categories', () => {
    const classes: Class[] = getClasses(categoricalTarget);
    const pairs: Class[][] = getClassesPairs(classes);
    expect(pairs).toStrictEqual([
      [
        { name: 'class1', value: 0, ids: [0, 1, 2, 3] },
        { name: 'class2', value: 1, ids: [4, 5, 6, 7] },
      ],
      [
        { name: 'class1', value: 0, ids: [0, 1, 2, 3] },
        { name: 'class3', value: 2, ids: [8, 9, 10, 11] },
      ],
      [
        { name: 'class2', value: 1, ids: [4, 5, 6, 7] },
        { name: 'class3', value: 2, ids: [8, 9, 10, 11] },
      ],
    ]);
  });
});
