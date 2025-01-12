import { toUpperCaseWithC } from "../ffi.ts";

let str = "This is a long sentence about word salad that talks about about being unburdened by what has been";

Deno.bench({
    name: "JS uppercase",
    baseline: true,
    fn: () => {
        str.toUpperCase();
    },
});

Deno.bench({
    name: "C uppercase",
    fn: () => {
        toUpperCaseWithC(str);
    },
});