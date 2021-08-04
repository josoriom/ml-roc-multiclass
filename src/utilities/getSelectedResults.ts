import { ClassType } from '../../types/Class';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getSelectedResults(response: any[], pair: ClassType[]) {
  let result = [];
  for (let item of pair) {
    for (let ID of item.IDs) {
      const value = response[ID];
      result.push(value);
    }
  }
  return result;
}
