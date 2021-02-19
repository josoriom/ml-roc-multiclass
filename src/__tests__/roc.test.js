import { getNumericalTarget, getClasses, roc, auc } from '..';

describe('Roc curve to coffee samples', () => {
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
    const classes = getClasses(target);
    expect(classes).toStrictEqual([
      { class: 'arabica', value: 0 },
      { class: 'robusta', value: 1 },
    ]);
  });

  it('Classify numerically', () => {
    const numericalClass = getNumericalTarget(target);
    expect(numericalClass).toStrictEqual([0, 0, 0, 0, 1, 1, 1, 1]);
  });

  it('Receiver Operating Characteristic', () => {
    const rocCurve = roc(target, predicted);
    expect(rocCurve).toStrictEqual({
      truePositiveRate: [
        1,
        1,
        0.75,
        0.75,
        0.75,
        0.75,
        0.75,
        0.75,
        0.75,
        0.75,
        0,
      ],
      falsePositiveRate: [
        1,
        0.75,
        0.25,
        0.25,
        0.25,
        0.25,
        0.25,
        0.25,
        0.25,
        0.25,
        0,
      ],
    });
  });

  it('Area under the curve of ROC', () => {
    const aucCurve = auc(roc(target, predicted));
    expect(aucCurve).toStrictEqual(0.78125);
  });
});
