/* Predictions R obtaine with OPLS from Metabom8 using iris dataset
library(pROC)
library(metabom8)
data(iris)
X=as.matrix(iris[,1:4])
labels=cbind(as.character(iris[,5]))
Y = rbind(array(0, dim=c(50,1)),  array(1, dim=c(50,1)),  array(2, dim=c(50,1)))
model=opls(X, labels)
t_pred <- as.numeric(model@t_pred)
t_orth <- as.numeric(model@t_orth)
t_pred_cv <- as.numeric(model@t_pred_cv)
t_orth_cv <- as.numeric(model@t_orth_cv)
*/
import { getClasses } from 'ml-dataset-iris';

import predictions from '../../data/predictions.json';
import { getAuc } from '../getAuc';
import { getRocCurve } from '../getRocCurve';

const metadata = getClasses();

describe('Iris dataset', () => {
  it('Area under the curve of ROC with t_pred', () => {
    const auc0 = getAuc(getRocCurve(metadata, predictions[0].array));
    // iris_auc0 <- multiclass.roc(response = iris[,5], predictor = as.numeric(t_pred), plot = TRUE)
    expect(auc0).toBeCloseTo(0.9845, 4);
  });

  it('Area under the curve of ROC with t_orth', () => {
    const auc1 = getAuc(getRocCurve(metadata, predictions[1].array));
    // iris_auc1 <- multiclass.roc(response = iris[,5], predictor = as.numeric(t_orth), plot = TRUE)
    expect(auc1).toBeCloseTo(0.6608, 4);
  });

  it('Area under the curve of ROC with t_pred_cv', () => {
    const auc2 = getAuc(getRocCurve(metadata, predictions[2].array));
    // iris_auc2 <- multiclass.roc(response = iris[,5], predictor = as.numeric(t_pred_cv), plot = TRUE)
    expect(auc2).toBeCloseTo(0.8547, 4);
  });

  it('Area under the curve of ROC with t_orth_cv', () => {
    const auc3 = getAuc(getRocCurve(metadata, predictions[3].array));
    // iris_auc3 <- multiclass.roc(response = iris[,5], predictor = as.numeric(t_orth_cv), plot = TRUE)
    expect(auc3).toBeCloseTo(0.6889, 4);
  });
});
