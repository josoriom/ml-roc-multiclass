/**
 * Receiver Operating Characteristic
 * @param {Array} target Array containing category metadata
 * @param {Array} predicted Array containing result of regression
 * @return {number}
 */
export function curve(target, predicted, options = {}) {
  const { curveStepSize = 0.1 } = options;
  const numericalTarget = getNumericalTarget(target);
  const classes = getLabelsData(target);
  let result = { truePositiveRate: [1], falsePositiveRate: [1] };
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
    result.truePositiveRate.push(
      truePositives / (truePositives + falseNegatives),
    );
    result.falsePositiveRate.push(
      falsePositives / (trueNegatives + falsePositives),
    );
  }
  return result;
}

/**
 * Returns the array of metadata numerically categorized
 * @param {Array} target Array containing the categories
 * @return {Array} Array containing the categories assinged as numbers
 */
export function getNumericalTarget(target) {
  const classes = getLabelsData(target);
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
export function auc(array) {
  let result = 0;
  const x = array.falsePositiveRate.reverse();
  const y = array.truePositiveRate.reverse();
  for (let i = 1; i < array.truePositiveRate.length; i++) {
    result += 0.5 * (x[i] - x[i - 1]) * (y[i] + y[i - 1]);
  }
  return result;
}

/**
 * @param {Array<String>} target Array containing category metadata
 * @return {Array<Object>} { class, value }.
 */
export function getLabelsData(array) {
  let nbClasses = 0;
  let result = [{ class: array[0], value: nbClasses++ }];
  for (let i = 0; i < array.length; i++) {
    const currentClass = result.some((item) => item.class === array[i]);
    if (!currentClass) result.push({ class: array[i], value: nbClasses });
  }

  for (let category of result) {
    let label = category.class;
    let indexes = [];
    for (let j = 0; j < array.length; j++) {
      if (array[j] === label) indexes.push(j);
    }
    category.IDs = indexes;
  }
  return result;
}
