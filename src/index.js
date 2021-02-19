/**
 * Receiver Operating Characteristic
 * @param {Array} target Array containing category metadata
 * @param {Array} predicted Array containing result of regression
 * @return {number}
 */
export function roc(target, predicted, options = {}) {
  const { curveStepSize = 0.1 } = options;
  const numericalTarget = getNumericalTarget(target);
  const classes = getClasses(target);
  let curve = { truePositiveRate: [1], falsePositiveRate: [1] };
  for (
    let limit = curveStepSize;
    limit < classes[1].value;
    limit += curveStepSize
  ) {
    let truePositives = 0;
    let falsePositives = 0;
    let trueNegatives = 0;
    let falseNegatives = 0;
    for (let j = 0; j < target.length; j++) {
      if (predicted[j] > limit && numericalTarget[j] > limit) truePositives++;
      if (predicted[j] > limit && numericalTarget[j] < limit) falsePositives++;
      if (predicted[j] < limit && numericalTarget[j] < limit) trueNegatives++;
      if (predicted[j] < limit && numericalTarget[j] > limit) falseNegatives++;
    }
    curve.truePositiveRate.push(
      truePositives / (truePositives + falseNegatives),
    );
    curve.falsePositiveRate.push(
      falsePositives / (trueNegatives + falsePositives),
    );
  }
  return curve;
}

/**
 * Returns the array of metadata numerically categorized
 * @param {Array} target Array containing the categories
 * @return {Array} Array containing the categories assinged as numbers
 */
export function getNumericalTarget(target) {
  const classes = getClasses(target);
  let result = [];
  for (let i = 0; i < target.length; i++) {
    for (let j = 0; j < classes.length; j++) {
      if (target[i] === classes[j].class) {
        result[i] = classes[j].value;
        break;
      }
    }
  }
  return result;
}

/**
 * Returns the Area under the curve
 * @param {Object} curve Object containing the true positivie and false positive rate vectors
 * @return {number} Area under the curve
 */
export function auc(curve) {
  let result = 0;
  const x = curve.falsePositiveRate.reverse();
  const y = curve.truePositiveRate.reverse();
  for (let i = 1; i < curve.truePositiveRate.length; i++) {
    result += 0.5 * (x[i] - x[i - 1]) * (y[i] + y[i - 1]);
  }
  return result;
}

/**
 * @param {Array<String>} target Array containing category metadata
 * @return {Array<Object>} { class, value }.
 */
export function getClasses(array) {
  let nbClasses = 0;
  let result = [{ class: array[0], value: nbClasses++ }];
  for (let i = 0; i < array.length; i++) {
    const currentClass = result.some((item) => item.class === array[i]);
    if (!currentClass) result.push({ class: array[i], value: nbClasses });
  }
  return result;
}
