# Receiver Operating Characteristic

[![NPM version][npm-image]][npm-url]
[![build status][ci-image]][ci-url]
[![Test coverage][codecov-image]][codecov-url]
[![npm download][download-image]][download-url]

A receiver operating characteristic curve, or ROC curve, is a graphical plot that illustrates the diagnostic ability of a binary classifier system as its discrimination threshold is varied.

## Installation

`$ npm i ml-roc`

## Usage

```js
import { roc, auc, getLabelsData } from 'ml-roc';

const target = ['class1', 'class1', 'class1', 'class2', 'class2', 'class2'];

const classes = getLabelsData(target);
// console.log(classes);
// [
//     { class: 'class1', value: 0, IDs: [0, 1, 2, 3] },
//     { class: 'class2', value: 1, IDs: [4, 5, 6, 7] },
// ]

const predictionResult = [0.95, 0.15, 0.13, 0.08, 0.93, 0.91, 0.99, 0.12];

const rocCurve = curve(target, predictionResult);

// console.log(rocCurve);

// [
//     {
//     falsePositiveRate: [1, 1, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0],
//     truePositiveRate: [1, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0],
//     },
// ]

const areaUnderCurve = auc(rocCurve);
console.log(areaUnderCurve) // 0.5555555555555556

```

## [API Documentation](https://josoriom.github.io/ml-roc/)

## References
* Bewick, V., Cheek, L., & Ball, J. (2004). Statistics review 13: receiver operating characteristic curves. Critical care, 8(6), 1-5.

* [https://en.wikipedia.org/wiki/Receiver_operating_characteristic](https://en.wikipedia.org/wiki/Receiver_operating_characteristic).

## License

[MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/ml-roc.svg
[npm-url]: https://www.npmjs.com/package/ml-roc
[ci-image]: https://github.com/josoriom/ml-roc/workflows/Node.js%20CI/badge.svg?branch=master
[ci-url]: https://github.com/josoriom/ml-roc/actions?query=workflow%3A%22Node.js+CI%22
[codecov-image]: https://img.shields.io/codecov/c/github/josoriom/ml-roc.svg
[codecov-url]: https://codecov.io/gh/josoriom/ml-roc
[download-image]: https://img.shields.io/npm/dm/ml-roc.svg
[download-url]: https://www.npmjs.com/package/ml-roc
