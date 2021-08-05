/**
 * Returns an array of thresholds to build the curve.
 * @param {Array} prediction Array of predictions.
 * @return {Array} An array of thresholds.
 */

export function getThresholds(prediction: number[]) {
  let uniques = [...new Set(prediction)].sort((a, b) => a - b);
  let thresholds: number[] = [uniques[0]];
  for (let i = 0; i < uniques.length - 1; i++) {
    const half = (uniques[i + 1] - uniques[i]) / 2;
    thresholds.push(uniques[i] + half);
  }
  thresholds.push(uniques[uniques.length - 1] + 0.001);
  return thresholds;
}
