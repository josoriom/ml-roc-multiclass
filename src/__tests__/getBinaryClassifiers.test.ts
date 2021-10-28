import { getBinaryClassifiers } from '../getBinaryClassifiers';

describe('Test sorted array of classes', () => {
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
  const conditionalDistribution = getBinaryClassifiers(targets, predictions);

  it('Testing true positives', () => {
    expect(conditionalDistribution.truePositives).toStrictEqual([
      4, 4, 3, 3, 3, 2, 1, 1, 0,
    ]);
  });

  it('Testing false positives', () => {
    expect(conditionalDistribution.falsePositives).toStrictEqual([
      4, 3, 3, 2, 1, 1, 1, 0, 0,
    ]);
  });

  it('Testing true negatives', () => {
    expect(conditionalDistribution.trueNegatives).toStrictEqual([
      0, 1, 1, 2, 3, 3, 3, 4, 4,
    ]);
  });

  it('Testing false negatives', () => {
    expect(conditionalDistribution.falseNegatives).toStrictEqual([
      0, 0, 1, 1, 1, 2, 3, 3, 4,
    ]);
  });
});

describe('Test not sorted array of classes leads to the same result', () => {
  const targets = [
    'class1',
    'class2',
    'class1',
    'class2',
    'class1',
    'class2',
    'class1',
    'class2',
  ];

  const predictions = [0.95, 0.91, 0.15, 0.93, 0.13, 0.99, 0.08, 0.12];
  const conditionalDistribution = getBinaryClassifiers(targets, predictions);

  it('Testing true positives', () => {
    expect(conditionalDistribution.truePositives).toStrictEqual([
      4, 4, 3, 3, 3, 2, 1, 1, 0,
    ]);
  });

  it('Testing false positives', () => {
    expect(conditionalDistribution.falsePositives).toStrictEqual([
      4, 3, 3, 2, 1, 1, 1, 0, 0,
    ]);
  });

  it('Testing true negatives', () => {
    expect(conditionalDistribution.trueNegatives).toStrictEqual([
      0, 1, 1, 2, 3, 3, 3, 4, 4,
    ]);
  });

  it('Testing false negatives', () => {
    expect(conditionalDistribution.falseNegatives).toStrictEqual([
      0, 0, 1, 1, 1, 2, 3, 3, 4,
    ]);
  });
});
