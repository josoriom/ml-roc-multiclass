import { getAuc } from '../getAuc';
import { getRocCurve } from '../getRocCurve';
import { getClasses } from '../utilities/getClasses';

describe('Roc curve to coffee samples (Two classes)', () => {
  const targets = [
    'class1',
    'class1',
    'class1',
    'class1',
    'class2',
    'class2',
    'class2',
    'class2',
  ];

  const predictions = [0.95, 0.15, 0.13, 0.08, 0.93, 0.91, 0.99, 0.12];

  it('Get classes from metadata', () => {
    const classes = getClasses(targets);
    expect(classes).toStrictEqual([
      { name: 'class1', value: 0, ids: [0, 1, 2, 3] },
      { name: 'class2', value: 1, ids: [4, 5, 6, 7] },
    ]);
  });

  it('Receiver Operating Characteristic (Categorical target)', () => {
    const curve = getRocCurve(targets, predictions);
    expect(curve).toStrictEqual([
      {
        sensitivities: [1, 1, 0.75, 0.75, 0.75, 0.5, 0.25, 0.25, 0],
        specificities: [0, 0.25, 0.25, 0.5, 0.75, 0.75, 0.75, 1, 1],
      },
    ]);
  });

  it('Area under the curve of ROC (Categorical target)', () => {
    const auc = getAuc(getRocCurve(targets, predictions));
    expect(auc).toBe(0.6875);
  });
});
