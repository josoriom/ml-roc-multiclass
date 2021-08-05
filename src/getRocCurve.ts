import { CurveType } from '../types/Curve';

import { getClasses } from './utilities/getClasses';
import { getClassesPairs } from './utilities/getClassesPairs';
import { getNumericalTarget } from './utilities/getNumericalTarget';
import { getSelectedResults } from './utilities/getSelectedResults';
import { getThresholds } from './utilities/getThresholds';

/**
 * Returns a ROC (Receiver Operating Characteristic) curve for a given response and prediction vectors.
 * @param {Array} response Array containing category metadata.
 * @param {Array} prediction Array containing result of regression.
 * @return {Object} { sensitivities: [], specificities: [] }.
 */

export function getRocCurve(response: string[], prediction: number[]) {
  const classes = getClasses(response);
  const pairsOfClasses = getClassesPairs(classes);
  let curves: CurveType[] = [];
  for (let pairs of pairsOfClasses) {
    const test: number[] = getSelectedResults(prediction, pairs);
    const target: string[] = getSelectedResults(response, pairs);
    const numericalTarget: number[] = getNumericalTarget(
      target,
      test,
      pairs,
    );
    let curve: CurveType = { sensitivities: [], specificities: [] };
    const limits = getThresholds(test);
    for (let limit of limits) {
      let truePositives = 0;
      let falsePositives = 0;
      let trueNegatives = 0;
      let falseNegatives = 0;
      for (let j = 0; j < numericalTarget.length; j++) {
        if (test[j] > limit && numericalTarget[j] > limit) truePositives++;
        if (test[j] >= limit && numericalTarget[j] <= limit) falsePositives++;
        if (test[j] < limit && numericalTarget[j] < limit) trueNegatives++;
        if (test[j] <= limit && numericalTarget[j] >= limit) falseNegatives++;
      }
      curve.sensitivities.push(
        truePositives / (truePositives + falseNegatives),
      );

      curve.specificities.push(
        trueNegatives / (falsePositives + trueNegatives),
      );
    }
    curves.push(curve);
  }
  return curves;
}
