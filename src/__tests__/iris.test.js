import {
  getNumbers,
  getClasses,
  getCrossValidationSets,
} from 'ml-dataset-iris';
import { METADATA } from 'ml-dataset-metadata';
import { Matrix } from 'ml-matrix';
import { OPLS } from 'ml-pls';

import { curve, auc } from '..';

describe('Multiclass AUC using iris dataset with OPLS prediction', () => {
  const iris = getNumbers();
  const metadata = getClasses();
  const cvFolds = getCrossValidationSets(7, { idx: 0, by: 'trainTest' });
  const x = new Matrix(iris);
  const options = { cvFolds, nComp: 1 };
  const newM = new METADATA([metadata], { headers: ['iris'] });
  const labels = newM.get('iris', { format: 'factor' }).values;
  const model = new OPLS(x, labels, options);
  const prediction = model.predict(new Matrix(x), { trueLabels: labels });
  const yHat = prediction.yHat.to1DArray();

  it('Area under the curve of ROC', () => {
    const aucCurve = auc(curve(metadata, yHat));
    expect(aucCurve).toStrictEqual(0.86);
  });
});

// library(metabom8)
// data(iris)
// X=as.matrix(iris[,1:4])
// Y=cbind(as.character(iris[,5]))
// model=opls(X, Y)
// model@summary

// > model@summary
//   PC_pred PC_orth R2X AUROC AUROC_CV
// 1       1       1 0.9  0.89     0.83
// 2       1       2  NA  0.89     0.81
