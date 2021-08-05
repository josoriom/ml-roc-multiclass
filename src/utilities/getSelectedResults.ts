import { ClassType } from '../../types/Class';

/**
 * Returns the array of metadata numerically categorized.
 * @param {Array} array Array containing the categories.
 * @param {Object} pair Object containing information about the two classes to deal with.
 * @return {Array} Array containing the prediction values arranged for the corresponding classes.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getSelectedResults(array: any[], pair: ClassType[]) {
  let result = [];
  for (let item of pair) {
    for (let ID of item.IDs) {
      const value = array[ID];
      result.push(value);
    }
  }
  return result;
}
