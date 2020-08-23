function regularSort(arr, sorterIndex) {
    // a = current row of data.
    // b = next row of data.
    arr.sort((a, b) => {
        const rowA = Array.from(a.childNodes);
        const rowB = Array.from(b.childNodes);
        // If no data, will push the
        // value down in the sort order.
        const x = parseFloat(rowA[sorterIndex].textContent);
        const y = parseFloat(rowB[sorterIndex].textContent);
        return x < y ? -1 : (x > y) ? 1 : 0;
    });
    return arr;
}

function bubbleSort(arr, sorterIndex) {
    let swapped;
    do {
        swapped = false;
        for (let i = 0; i < arr.length; i++) {
            const j = i + 1;
            if (arr[i] && arr[j]) {
                const rowA = Array.from(arr[i].childNodes);
                const rowB = Array.from(arr[j].childNodes);

                const x = parseFloat(rowA[sorterIndex].textContent);
                const y = parseFloat(rowB[sorterIndex].textContent);

                if (x > y) {
                    var temp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = temp;
                    swapped = true;
                }
            }
        }
    } while (swapped)

    return arr;
}

function mergeSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    const middle = Math.floor(arr.length / 2),
        left = arr.slice(0, middle),
        right = arr.slice(middle);
    return merge(
        mergeSort(left),
        mergeSort(right)
    )
}

function merge(left, right) {
    let results = [];
    indexLeft = 0;
    indexRight = 0;
    const sorterIndex = headers.indexOf(sorters[0]);

    while (indexLeft < left.length & indexRight < right.length) {
        const rowA = Array.from(left[indexLeft].childNodes);
        const rowB = Array.from(right[indexRight].childNodes);

        const x = parseFloat(rowA[sorterIndex].textContent);
        const y = parseFloat(rowB[sorterIndex].textContent);

        if (x < y) {
            results.push(left[indexLeft]);
            indexLeft++;
        } else {
            results.push(right[indexRight]);
            indexRight++;
        }
    }
    return results.concat(left.slice(indexLeft)).concat(right.slice(indexRight));
}

function insertionSort(arr, sorterIndex) {
    // Starting with second element in the array.
    for (let i = 1; i < arr.length; i++) {
        const rowA = Array.from(arr[i].childNodes);
        const x = parseFloat(rowA[sorterIndex].textContent);
        const currentValue = arr[i];
        let j;
        // Backwards 'for' loop:
        for (j = i - 1; j >= 0; j--) {
            const rowB = Array.from(arr[j].childNodes);
            const y = parseFloat(rowB[sorterIndex].textContent);
            if (y <= x) {
                break;
            } else {
                arr[j + 1] = arr[j];
            }
        }
        arr[j + 1] = currentValue;
    }
    return arr;
}

function minMaxMean(items) {
    let summary = {},
        minVal = null,
        maxVal = null,
        meanVal = null,
        firstQuartile = null,
        thirdQuartile = null;
    const headers = Object.keys(items[0]);
    headers.forEach((header) => {
        let tempArr = [];
        items.forEach((item, i) => {
            if (item[header] !== null) {
                tempArr.push(item[header]);
                if (i === items.length - 1) {
                    tempArr.sort((a, b) => a < b ? -1 : (a > b) ? 1 : 0);
                    minVal = Math.min(...tempArr);
                    maxVal = Math.max(...tempArr);
                    meanVal = tempArr[Math.floor(tempArr.length / 2)]
                    firstQuartile = tempArr[Math.floor(tempArr.length / 4)];
                    thirdQuartile = tempArr[Math.floor((tempArr.length / 4)) * 3];
                }
            }
        })
        summary[header] = {
            values: tempArr,
            min: minVal,
            max: maxVal,
            mean: meanVal,
            first: firstQuartile,
            third: thirdQuartile
        }

    });
    return summary
}

export {
    regularSort,
    bubbleSort,
    mergeSort,
    insertionSort,
    minMaxMean
};