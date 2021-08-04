export function getThresholds(predictor: number[]) {
  let uniques = [...new Set(predictor)].sort((a, b) => a - b);
  let thresholds = [uniques[0]];
  for (let i = 0; i < uniques.length - 1; i++) {
    const half = (uniques[i + 1] - uniques[i]) / 2;
    thresholds.push(uniques[i] + half);
  }
  thresholds.push(uniques[uniques.length - 1] + 0.001);
  return thresholds;
}
