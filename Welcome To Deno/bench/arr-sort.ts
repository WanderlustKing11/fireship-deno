
// Bubble Sort
function bubbleSort(arr: any[]) {
    const n = arr.length;
    const result = [...arr];

    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (result[j] > result[j + 1]) {
                // Swap elements
                [result[j], result[j + 1]] = [result[j + 1], result[j]];
            }
        }
    }
    return result;
}

// Quick Sort

function quickSort(arr: any[]) {
    // Base case
    if (arr.length <= 1) return arr;

    // Work on a copy
    const result = [...arr];

    function partition(low:number, high:number) {
        const pivot = result[high];
        let i = low - 1;

        for (let j = low; j < high; j++) {
            if (result[j] <= pivot) {
                i++;
                [result[i], result[j]] = [result[j], result[i]];
            }
        }

        [result[i + 1], result[high]] = [result[high], result[i + 1]];
        return i + 1;
    }

    function quickSortHelper(low:number, high:number) {
        if (low < high) {
            const pivotIndex = partition(low, high);
            quickSortHelper(low, pivotIndex - 1);
            quickSortHelper(pivotIndex + 1, high);
        }
    }

    quickSortHelper(0, result.length - 1);
    return result
}

// Merge Sort

function mergeSort(arr: any[]): any[] {
    if (arr.length <= 1) return arr;

    // Recursively divide the array
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));

    // Merge the sorted halves
    return merge(left, right);

    function merge(left: any[], right: any[]) {
        const result = [];
        let leftIndex = 0;
        let rightIndex = 0;

        while (leftIndex < left.length && rightIndex < right.length) {
            if (left[leftIndex] < right[rightIndex]) {
                result.push(left[leftIndex]);
                leftIndex++;
            } else {
                result.push(right[rightIndex]);
                rightIndex++;
            }
        }
        
        return result.concat(left.slice(leftIndex), right.slice(rightIndex));
    }
}

const testArray = Array.from(
    { length: 10000 },
    () => Math.floor(Math.random() * 1000)
);

Deno.bench({
    name: 'Bubble Sort',
    fn: () => {
        bubbleSort(testArray);
    }
});

Deno.bench({
    name: 'Quick Sort',
    fn: () => {
        quickSort(testArray);
    }
});

Deno.bench({
    name: 'Merge Sort',
    fn: () => {
        mergeSort(testArray);
    }
});

Deno.bench({
    name: 'JS Sort',
    baseline: true,
    fn: () => {
        testArray.toSorted();
    }
});