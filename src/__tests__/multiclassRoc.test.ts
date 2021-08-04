import { ClassType } from '../../types/Class';
import { CurveType } from '../../types/Curve';
import { getAuc } from '../getAuc';
import { getRocCurve } from '../getRocCurve';
import { getClasses } from '../utilities/getClasses';

describe('Roc curve (Three classes)', () => {
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

  it('Get classes from metadata', () => {
    const classes: ClassType[] = getClasses(target);
    expect(classes).toStrictEqual([
      { class: 'class1', value: 0, IDs: [0, 1, 2, 3] },
      { class: 'class2', value: 1, IDs: [4, 5, 6, 7] },
      { class: 'class3', value: 2, IDs: [8, 9, 10, 11] },
    ]);
  });

  it('Receiver Operating Characteristic (Categorical target)', () => {
    const rocCurve: CurveType[] = getRocCurve(target, predicted);
    expect(rocCurve).toStrictEqual([
      {
        sensitivities: [1.0, 1.0, 0.75, 0.75, 0.75, 0.5, 0.25, 0.25, 0.0],
        specificities: [0.0, 0.25, 0.25, 0.5, 0.75, 0.75, 0.75, 1.0, 1.0],
      },
      {
        sensitivities: [1.0, 1.0, 1.0, 1.0, 1.0, 0.75, 0.5, 0.25, 0.0],
        specificities: [0.0, 0.25, 0.5, 0.75, 1.0, 1.0, 1.0, 1.0, 1.0],
      },
      {
        sensitivities: [1.0, 1.0, 1.0, 1.0, 0.75, 0.5, 0.25, 0.0],
        specificities: [0.0, 0.25, 0.5, 0.75, 0.75, 0.75, 0.75, 1.0],
      },
    ]);
  });

  it('Area under the curve of ROC (Categorical target)', () => {
    const aucCurve: number = getAuc(getRocCurve(target, predicted));
    expect(aucCurve).toBeCloseTo(0.8229, 4);
  });
});
