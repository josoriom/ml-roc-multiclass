import { toBeDeepCloseTo } from 'jest-matcher-deep-close-to';

import { getClasses } from '../getClasses';
import { getClassesPairs } from '../getClassesPairs';
import { getSelectedResults } from '../getSelectedResults';
import { getThresholds } from '../getThresholds';

expect.extend({ toBeDeepCloseTo });

describe('Get thresholds', () => {
  it('Two classes', () => {
    // # Roc curve (Two classes)
    // target <- c('class1', 'class1', 'class1', 'class1', 'class2', 'class2', 'class2', 'class2');
    // prediction <- c(0.95, 0.15, 0.13, 0.08, 0.93, 0.91, 0.99, 0.12)
    // result <- roc(response = target, predictor = prediction, plot = TRUE)
    // result$thresholds
    // [1]  -Inf 0.100 0.125 0.140 0.530 0.920 0.940 0.970   Inf

    const prediction = [0.95, 0.15, 0.13, 0.08, 0.93, 0.91, 0.99, 0.12];
    const thresholds = getThresholds(prediction);
    expect(thresholds).toBeDeepCloseTo(
      [
        Number.NEGATIVE_INFINITY,
        0.1,
        0.125,
        0.14,
        0.53,
        0.92,
        0.94,
        0.97,
        Number.POSITIVE_INFINITY,
      ],
      3,
    );
  });

  it('Three classes', () => {
    const target = [
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

    const predicted = [
      0.95, 0.15, 0.13, 0.08, 0.93, 0.91, 1.99, 0.12, 1.85, 1.95, 1.75, 1.99,
    ];

    const classes = getClasses(target);
    const pairs = getClassesPairs(classes);
    const results: number[][] = [];
    for (const pair of pairs) {
      const tests = getSelectedResults(predicted, pair);
      results.push(getThresholds(tests));
    }

    expect(results[0]).toBeDeepCloseTo(
      [
        Number.NEGATIVE_INFINITY,
        0.1,
        0.125,
        0.14,
        0.53,
        0.92,
        0.94,
        1.47,
        Number.POSITIVE_INFINITY,
      ],
      3,
    );
    expect(results[1]).toBeDeepCloseTo(
      [
        Number.NEGATIVE_INFINITY,
        0.105,
        0.14,
        0.55,
        1.35,
        1.8,
        1.9,
        1.97,
        Number.POSITIVE_INFINITY,
      ],
      3,
    );
    expect(results[2]).toBeDeepCloseTo(
      [
        Number.NEGATIVE_INFINITY,
        0.515,
        0.92,
        1.34,
        1.8,
        1.9,
        1.97,
        Number.POSITIVE_INFINITY,
      ],
      3,
    );
  });
});
