import max from 'ml-array-max';
import min from 'ml-array-min';

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
