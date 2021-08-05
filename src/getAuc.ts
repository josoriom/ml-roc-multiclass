import mean from 'ml-array-mean';

import { CurveType } from '../types/Curve';

/**
 * Returns the Area under the curve.
 * @param {Object} curve Object containing the true positivie and false positive rate vectors.
 * @return {number} Area under the curve.
 */

export function getAuc(curves: CurveType[]) {
  let result: number[] = [];
  for (let array of curves) {
    let area = 0;
    const x = array.specificities;
    const y = array.sensitivities;
    for (let i = 1; i < x.length; i++) {
      area += 0.5 * (x[i] - x[i - 1]) * (y[i] + y[i - 1]);
    }
    area = area > 0.5 ? area : 1 - area;
    result.push(area);
  }
  return mean(result);
}
