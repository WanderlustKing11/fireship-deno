function sumUsingForEach(arr: number[]) {
    let sum = 0;
    arr.forEach(item => {
        sum += item
    });
    return sum;
}

function sumUsingReduce(arr: number[]) {
    // const initial = 0;
    // const sumWithInitial = arr.reduce((a, b) => a + b, initial);
    // return sumWithInitial
    return arr.reduce((sum, num) => sum + num, 0);
}

function sumUsingForOf(arr: number[]) {
    let sum = 0;
    for (const num of arr) {
        sum += num;
    }
    return sum;
}

function sumUsingForLoop(arr: number[]) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum;
}


// Create some testing data large enough to bench the different algorithm performances

const largeArray  = Array.from({ length: 1_000_000 }, (_, i) => i);

Deno.bench({
    name: "Array forEach",
    fn: () => {
        sumUsingForEach(largeArray);
    },
});

Deno.bench({
    name: "Array reduce",
    fn: () => {
        sumUsingReduce(largeArray);
    },
});

Deno.bench({
    name: "for...of loop",
    fn: () => {
        sumUsingForOf(largeArray);
    },
});

Deno.bench({
    name: "traditional for loop",
    baseline: true,
    fn: () => {
        sumUsingForLoop(largeArray);
    },
});