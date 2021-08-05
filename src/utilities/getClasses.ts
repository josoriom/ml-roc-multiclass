import { ClassType } from '../../types/Class';

/**
 * @param {Array<string>} array Array containing category metadata
 * @return {Array<Object>} { class: string, value: number, IDs: [] }.
 */
export function getClasses(array: string[]) {
  let nbClasses = 0;
  let result: ClassType[] = [{ class: array[0], value: 0, IDs: [] }];
  for (let element of array) {
    const currentClass = result.some((item) => item.class === element);
    if (!currentClass) {
      nbClasses++;
      result.push({ class: element, value: nbClasses, IDs: [] });
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
