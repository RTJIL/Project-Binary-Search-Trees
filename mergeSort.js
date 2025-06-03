//first call 4,3,2,1
function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  const mid = Math.ceil(arr.length / 2);

  let left = mergeSort(arr.slice(0, mid)); // 4, 2
  let right = mergeSort(arr.slice(mid)); // 2, 1
  return merge(left, right);
}

function merge(leftArr, rightArr) {
  const sortedArr = [];
  while (leftArr.length && rightArr.length) {
    if (leftArr[0] <= rightArr[0]) {
      sortedArr.push(leftArr.shift());
    } else {
      sortedArr.push(rightArr.shift());
    }
  }
  return [...sortedArr, ...leftArr, ...rightArr];
}

export { mergeSort }

//second call 4,3
