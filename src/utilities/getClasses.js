/**
 * @param {Array<string>} target Array containing category metadata
 * @return {Array<Object>} { class: string, value: number }.
 */
export function getClasses(array) {
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
