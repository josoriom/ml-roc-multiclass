import { ClassType } from '../../../types/Class';
import { getClasses } from '../getClasses';

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

describe('Roc curve (Three classes)', () => {
  it('Get classes', () => {
    const classes: ClassType[] = getClasses(target);
    expect(classes).toStrictEqual([
      { class: 'class1', value: 0, IDs: [0, 1, 2, 3] },
      { class: 'class2', value: 1, IDs: [4, 5, 6, 7] },
      { class: 'class3', value: 2, IDs: [8, 9, 10, 11] },
    ]);
  });
});
