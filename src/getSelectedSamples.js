export function getSelectedSamples(response, pair) {
  let result = [];
  for (let i = 0; i < pair.length; i++) {
    for (let j = 0; j < pair[i].IDs.length; j++) {
      const value = response[pair[i].IDs[j]];
      result.push(value);
    }
  }
  return result;
}
