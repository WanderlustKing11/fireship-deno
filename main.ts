// // Learning about meta.main // //

// export function helloworld() {
//   console.log('Main?', import.meta.main)
//   return 'Hi Mom!'
// }

// if (import.meta.main) {
//   console.log(helloworld());
// }

//////////////////////////////////////////////

// You can custom name any default imports

import foo from './a.ts';
import { bar, baz } from './b.ts';
// or import {bar as customB } from './b.ts';
import customFoo from './a.ts'

foo



///////////////////////////////////////////
//////  Cool Notes!  ///////

// Dino uses JSR as its main package registry, and has a big standard library
// It's TypeScript first, which helps

// One of the ways to install JSR packages is:

// import jsr, then intellisense will pop up with the `jsr` keyword. Then we can import methods
import { toCamelCase } from 'jsr:@std/text'

// or you can use the `deno add jsr:@std/text` command in the console.
// This will add the package to the deno.json file, and be in the "imports" object.


/////////////////////////////

// In addition to JSR, in Deno 2, you can also import form NPM
import {  } from 'npm:lodash.camelcase'


/////////////////////////////

// The 3rd way to install a package from a 3rd Party is to use an HTTPS URL
// https://unpkg.com/:package@:version/:file
// This can typically be from a source like deno.land, unpkg.com, or esm.sh (CDNs for popular JS libaries)


///////////////////////////////////////////////////////
/////// Challenge /////////

import { invert } from "jsr:@std/collections"
import { assertEquals } from "jsr:@std/assert"

export function switchValKeys() {
    const challenge = { a: "x", b: "y", c: "z" };

    // create a new objec that switches the keys and the value around
    const result = { x: "a", y: "b", z: "c" };  // Do it!
    
    // Accomplish this with a function call to jsr:@std/collecitons
    const solution = invert(challenge)
    console.log(solution)
    return solution
}


////////////////////////////////////////////////////////////////////
/////// Tasks ///////

export function intervalCount() {
    let i = 0;

    setInterval(() => {
        console.log(i * 2)
        i++;
    }, 1000)
}

// intervalCount();