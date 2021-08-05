import { Class } from '../types/Class';
import { Curve } from '../types/Curve';

import { getClasses } from './utilities/getClasses';
import { getClassesPairs } from './utilities/getClassesPairs';
import { getNumericalTarget } from './utilities/getNumericalTarget';
import { getSelectedResults } from './utilities/getSelectedResults';
import { getThresholds } from './utilities/getThresholds';

/**
 * Returns a ROC (Receiver Operating Characteristic) curve for a given response and prediction vectors.
 * @param response Array containing category metadata.
 * @param prediction Array containing result of regression.
 * @return sensitivities and specificities as a object.
 */

export function getRocCurve(response: string[], prediction: number[]) {
  const classes: Class[] = getClasses(response);
  const pairsOfClasses: [Class, Class][] = getClassesPairs(classes);
  const curves: Curve[] = [];
  for (let pairs of pairsOfClasses) {
    const test: number[] = getSelectedResults(prediction, pairs);
    const target: string[] = getSelectedResults(response, pairs);
    const numericalTarget: number[] = getNumericalTarget(target, test, pairs);
    const curve: Curve = { sensitivities: [], specificities: [] };
    const limits: number[] = getThresholds(test);
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
