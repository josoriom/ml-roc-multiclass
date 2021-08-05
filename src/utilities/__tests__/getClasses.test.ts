import { getClasses } from '../getClasses';

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

describe('Roc curve (Three classes)', () => {
  it('Get classes', () => {
    const classes = getClasses(targets);
    expect(classes).toStrictEqual([
      { name: 'class1', value: 0, ids: [0, 1, 2, 3] },
      { name: 'class2', value: 1, ids: [4, 5, 6, 7] },
      { name: 'class3', value: 2, ids: [8, 9, 10, 11] },
    ]);
  });
});
