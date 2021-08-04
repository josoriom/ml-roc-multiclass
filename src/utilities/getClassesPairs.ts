import { ClassType } from '../../types/Class';

export function getClassesPairs(list: ClassType[]) {
  let pairs: ClassType[][] = [];
  for (let i = 0; i < list.length - 1; i++) {
    for (let j = i + 1; j < list.length; j++) {
      pairs.push([list[i], list[j]]);
    }
  }
  return pairs;
}
