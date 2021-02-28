import max from 'ml-array-max';
import mean from 'ml-array-mean';
import min from 'ml-array-min';

/**
 * Receiver Operating Characteristic
 * @param {Array} target Array containing category metadata
 * @param {Array} prediction Array containing result of regression
 * @return {number}
 */
export function curve(response, prediction) {
  const classes = getLabelsData(response);
  const pairsOfClasses = getClassesPairs(classes);
  let results = [];
  for (let pairs of pairsOfClasses) {
    const test = getSelectedSamples(prediction, pairs);
    const target = getNumericalTarget(
      getSelectedSamples(response, pairs),
      test,
      pairs,
    );
    let result = { sensitivities: [], specificities: [] };
    const limits = getThreshold(test);
    for (let limit of limits) {
      let truePositives = 0;
      let falsePositives = 0;
      let trueNegatives = 0;
      let falseNegatives = 0;
      for (let j = 0; j < target.length; j++) {
        if (test[j] > limit && target[j] > limit) truePositives++;
        if (test[j] >= limit && target[j] <= limit) falsePositives++;
        if (test[j] < limit && target[j] < limit) trueNegatives++;
        if (test[j] <= limit && target[j] >= limit) falseNegatives++;
      }
      result.sensitivities.push(
        truePositives / (truePositives + falseNegatives),
      );

      result.specificities.push(
        trueNegatives / (falsePositives + trueNegatives),
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
    const x = array.specificities;
    const y = array.sensitivities;
    for (let i = 1; i < x.length; i++) {
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
export function getNumericalTarget(target, test, pair) {
  const boundaries = [min(test) - 0.001, max(test) + 0.001];
  let result = [];
  for (let i = 0; i < target.length; i++) {
    for (let j = 0; j < pair.length; j++) {
      if (target[i] === pair[j].class) {
        result[i] = boundaries[j];
        break;
      }
    }
  }
  return result;
}

function getClassesPairs(list) {
  let result = [];
  for (let i = 0; i < list.length - 1; i++) {
    for (let j = i + 1; j < list.length; j++) {
      result.push([list[i], list[j]]);
    }
  }
  return result;
}

function getSelectedSamples(response, pair) {
  let result = [];
  for (let i = 0; i < pair.length; i++) {
    for (let j = 0; j < pair[i].IDs.length; j++) {
      const value = response[pair[i].IDs[j]];
      result.push(value);
    }
  }
  return result;
}

function getThreshold(predictor) {
  let unique = [...new Set(predictor)].sort((a, b) => a - b);
  let result = [unique[0]];
  for (let i = 0; i < unique.length - 1; i++) {
    const half = (unique[i + 1] - unique[i]) / 2;
    result.push(unique[i] + half);
  }
  result.push(unique[unique.length - 1] + 0.001);
  return result;
}
