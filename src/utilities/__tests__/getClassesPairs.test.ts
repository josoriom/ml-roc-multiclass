import { ClassType } from '../../../types/Class';
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
    const classes: ClassType[] = getClasses(categoricalTarget);
    const pairs: ClassType[][] = getClassesPairs(classes);
    expect(pairs).toStrictEqual([
      [
        { class: 'class1', value: 0, IDs: [0, 1, 2, 3] },
        { class: 'class2', value: 1, IDs: [4, 5, 6, 7] },
      ],
      [
        { class: 'class1', value: 0, IDs: [0, 1, 2, 3] },
        { class: 'class3', value: 2, IDs: [8, 9, 10, 11] },
      ],
      [
        { class: 'class2', value: 1, IDs: [4, 5, 6, 7] },
        { class: 'class3', value: 2, IDs: [8, 9, 10, 11] },
      ],
    ]);
  });
});
