/* eslint-disable no-param-reassign */
module.exports = (arr, max) => {
  const len = arr.length - 1;
  let i;
  for (i = len; i >= 0 && arr[i] === max; i -= 1) {
    // "Increment" any right-side array values of `max` value to 0, and increment the next by 1.

    // For example, if max is 63 and the array is:
    // [ 63, 27, 63, 38, 29, 33, 48, 63, 22, 63, 63, 63 ]
    // it would become:
    // [ 63, 27, 63, 38, 29, 33, 48, 63, 23, 0,  0,  0  ]
    arr[i] = 0;
  }
  arr[i] += 1;
};
