import { Curve } from '../types/Curve';

import { getClasses } from './utilities/getClasses';
import { getClassesPairs } from './utilities/getClassesPairs';
import { getNumericalTargets } from './utilities/getNumericalTargets';
import { getSelectedResults } from './utilities/getSelectedResults';
import { getThresholds } from './utilities/getThresholds';

/**
 * Returns a ROC (Receiver Operating Characteristic) curve for a given response and prediction vectors.
 * @param response Array containing category metadata.
 * @param predictions Array containing the results of regression.
 * @return sensitivities and specificities as a object.
 */

export function getRocCurve(response: string[], predictions: number[]) {
  const classes = getClasses(response);
  const pairsOfClasses = getClassesPairs(classes);
  const curves: Curve[] = [];
  for (let pairs of pairsOfClasses) {
    const tests = getSelectedResults(predictions, pairs);
    const targets = getSelectedResults(response, pairs);
    const numericalTargets = getNumericalTargets(targets, tests, pairs);
    const curve: Curve = { sensitivities: [], specificities: [] };
    const limits = getThresholds(tests);
    for (let limit of limits) {
      let truePositives = 0;
      let falsePositives = 0;
      let trueNegatives = 0;
      let falseNegatives = 0;
      for (let j = 0; j < numericalTargets.length; j++) {
        if (tests[j] > limit && numericalTargets[j] > limit) truePositives++;
        if (tests[j] >= limit && numericalTargets[j] <= limit) falsePositives++;
        if (tests[j] < limit && numericalTargets[j] < limit) trueNegatives++;
        if (tests[j] <= limit && numericalTargets[j] >= limit) falseNegatives++;
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
