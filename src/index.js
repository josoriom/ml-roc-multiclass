import mean from 'ml-array-mean';

/**
 * Receiver Operating Characteristic
 * @param {Array} target Array containing category metadata
 * @param {Array} predicted Array containing result of regression
 * @return {number}
 */
export function curve(response, predicted, options = {}) {
  const { curveStepSize = 0.1 } = options;
  const classes = getLabelsData(response);
  const pairsOfClasses = getClassesPairs(classes);
  let results = [];
  for (let pairs of pairsOfClasses) {
    const target = getNumericalTarget(
      getSelectedSamples(response, pairs),
      pairs,
    );
    const test = getSelectedSamples(predicted, pairs);
    let result = { truePositiveRate: [1], falsePositiveRate: [1] };
    for (
      let limit = pairs[0].value + curveStepSize;
      limit < pairs[1].value;
      limit += curveStepSize
    ) {
      let truePositives = 0;
      let falsePositives = 0;
      let trueNegatives = 0;
      let falseNegatives = 0;
      for (let j = 0; j < target.length; j++) {
        if (test[j] > limit && target[j] > limit) truePositives++;
        if (test[j] > limit && target[j] < limit) falsePositives++;
        if (test[j] < limit && target[j] < limit) trueNegatives++;
        if (test[j] < limit && target[j] > limit) falseNegatives++;
      }
      result.truePositiveRate.push(
        truePositives / (truePositives + falseNegatives),
      );
      result.falsePositiveRate.push(
        falsePositives / (trueNegatives + falsePositives),
      );
    }
    results.push(result);
  }
  return results;
}

/**
 * Returns the Area under the curve
 * @param {Object} curve Object containing the true positivie and false positive rate vectors
 * @return {number} Area under the curve
 */
export function auc(curves) {
  let result = [];
  for (let array of curves) {
    let area = 0;
    const x = array.falsePositiveRate.reverse();
    const y = array.truePositiveRate.reverse();
    for (let i = 1; i < array.truePositiveRate.length; i++) {
      area += 0.5 * (x[i] - x[i - 1]) * (y[i] + y[i - 1]);
    }
    result.push(area);
  }
  return mean(result);
}

/**
 * @param {Array<String>} target Array containing category metadata
 * @return {Array<Object>} { class, value }.
 */
export function getLabelsData(array) {
  let nbClasses = 0;
  let result = [{ class: array[0], value: 0 }];
  for (let i = 0; i < array.length; i++) {
    const currentClass = result.some((item) => item.class === array[i]);
    if (!currentClass) {
      nbClasses++;
      result.push({ class: array[i], value: nbClasses });
    }
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

/**
 * Returns the array of metadata numerically categorized
 * @param {Array} target Array containing the categories
 * @return {Array} Array containing the categories assinged as numbers
 */
export function getNumericalTarget(target, pairs) {
  let result = [];
  for (let i = 0; i < target.length; i++) {
    for (let j = 0; j < pairs.length; j++) {
      if (target[i] === pairs[j].class) {
        result[i] = pairs[j].value;
        break;
      }
    }
  }
  return result;
}

function getClassesPairs(list) {
  let result = [];
  for (let i = 0; i < list.length - 1; i++) {
    // This is where you'll capture that last value
    for (let j = i + 1; j < list.length; j++) {
      result.push([list[i], list[j]]);
    }
  }
  return result;
}

function getSelectedSamples(array, pair) {
  let result = [];
  for (let i = 0; i < pair.length; i++) {
    for (let j = 0; j < pair[i].IDs.length; j++) {
      result.push(array[pair[i].IDs[j]]);
    }
  }
  return result;
}
