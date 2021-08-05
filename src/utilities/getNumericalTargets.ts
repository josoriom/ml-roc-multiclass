import max from 'ml-array-max';
import min from 'ml-array-min';

import { Class } from '../../types/Class';

/**
 * Returns the array of metadata numerically categorized.
 * @param target Array containing the categories.
 * @param test Array containing the result of prediction.
 * @param pair Object with information about two classes.
 * @param [options={}]
 * @return Array containing the categories assinged as numbers.
 */

export function getNumericalTargets(
  targets: string[],
  tests: number[],
  pair: [Class, Class],
  options: Options = {},
) {
  const { dx = 0.001 } = options;
  const boundaries = [min(tests) - dx, max(tests) + dx];
  const results: number[] = [];
  for (let i = 0; i < targets.length; i++) {
    for (let j = 0; j < pair.length; j++) {
      if (targets[i] === pair[j].name) {
        results[i] = boundaries[j];
        break;
      }
    }
  }
  return results;
}

/**
 * @param {number} [options.dx = 0.001] - small amount to add or subtract in order to take in count all posibilities.
 */
interface Options {
  dx?: number;
}
