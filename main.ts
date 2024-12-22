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

foo
