import { ClassType } from '../../types/Class';
import { CurveType } from '../../types/Curve';
import { getAuc } from '../getAuc';
import { getRocCurve } from '../getRocCurve';
import { getClasses } from '../utilities/getClasses';

describe('Roc curve to coffee samples (Two classes)', () => {
  const target = [
    'arabica',
    'arabica',
    'arabica',
    'arabica',
    'robusta',
    'robusta',
    'robusta',
    'robusta',
  ];

  const predicted = [0.95, 0.15, 0.13, 0.08, 0.93, 0.91, 0.99, 0.12];

  it('Get classes from metadata', () => {
    const classes: ClassType[] = getClasses(target);
    expect(classes).toStrictEqual([
      { class: 'arabica', value: 0, IDs: [0, 1, 2, 3] },
      { class: 'robusta', value: 1, IDs: [4, 5, 6, 7] },
    ]);
  });

  it('Receiver Operating Characteristic (Categorical target)', () => {
    const curve: CurveType[] = getRocCurve(target, predicted);
    expect(curve).toStrictEqual([
      {
        sensitivities: [1, 1, 0.75, 0.75, 0.75, 0.5, 0.25, 0.25, 0],
        specificities: [0, 0.25, 0.25, 0.5, 0.75, 0.75, 0.75, 1, 1],
      },
    ]);
  });

  it('Area under the curve of ROC (Categorical target)', () => {
    const auc: number = getAuc(getRocCurve(target, predicted));
    expect(auc).toStrictEqual(0.6875);
  });
});
