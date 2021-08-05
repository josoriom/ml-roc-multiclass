import { ClassType } from '../../types/Class';

/**
 * Returns an array of pairs of classes.
 * @param { Array<object>} list Array containing a list of classes.
 * @return { Array<Array<object>>} Array with pairs of classes.
 */

export function getClassesPairs(list: ClassType[]) {
  let pairs: ClassType[][] = [];
  for (let i = 0; i < list.length - 1; i++) {
    for (let j = i + 1; j < list.length; j++) {
      pairs.push([list[i], list[j]]);
    }
  }
  return pairs;
}
