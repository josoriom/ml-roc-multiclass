import { getClasses } from '../getClasses';

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

const numericTarget = [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2];

describe('Roc curve (Three classes)', () => {
  it('Get classes from categorical targets', () => {
    const classes = getClasses(categoricalTarget);
    expect(classes).toStrictEqual([
      { class: 'class1', value: 0, IDs: [0, 1, 2, 3] },
      { class: 'class2', value: 1, IDs: [4, 5, 6, 7] },
      { class: 'class3', value: 2, IDs: [8, 9, 10, 11] },
    ]);
  });

  it('Get classes from numerical targets', () => {
    const classes = getClasses(numericTarget);
    expect(classes).toStrictEqual([
      { class: 0, value: 0, IDs: [0, 1, 2, 3] },
      { class: 1, value: 1, IDs: [4, 5, 6, 7] },
      { class: 2, value: 2, IDs: [8, 9, 10, 11] },
    ]);
  });
});
