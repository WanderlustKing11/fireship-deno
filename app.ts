const num = 23;

let str: string;

str = "hello"

// str = 420

// If we run this directly with Deno... `deno run app.ts`
// it'll run successfully because Deno doesn't do any type checking. It strips the types and
// runs JS as is.

// You can run Deno with a check flag to perform type checking:
// `deno run --check app.ts`
// This will give us a type error (if line 7 isn't commented out), and the code won't actually run
// or just run: `deno check app.ts`

export function multiply(a:number, b:number):number {
    return a * b
}

// Objects

const human = {
    dna: "AGTC",
    age: 23,
    sex: true,
}

let human2: Human;
// human2.age


// interface Human {
//     dna: string,
//     age: number,
//     sex: boolean | 'male' | 'female' | 'cyborg'
// }

interface Human {
    dna: string,
    age: number,
    sex: HumanSex
}

type HumanSex =  'male' | 'female' | 'cyborg'


// TypeScript generics

type Dog = { name: string };
type Cat = { name: string };

const animal: Cat = { name: 'fluffy' }

interface Robot<T> {
    chip: string;
    animal: T;
}

const robotCat: Robot<Cat> = { animal, chip: 'Intel' };


//////////////////

async function doAsync(): Promise<Cat> {
    return { name: 'fluffy' };
}

doAsync


/////////////////

// Can use this line below to interact with DOM
/// <reference lib="dom" />

// Or go into deno.json and add libs for dom and deno to "compilerOptions"

let doc: Document;
let el: HTMLElement;

/////////////////////////////////////////////////////////////////

////// Permissions ///////

await Deno.readFile('./diary.txt');
// to avoid the prompt that allows us to read the file, run: `deno run --allow-read <file.ts>

// There's an easier way to do this, using the `-A` flag instead:
// `deno run -A app.ts`

// We can choose to be more granlar with our permissions. If we have multiple files, but we only
// want to grant access to specific ones, then run:
// `deno run --allow-read --deny-read =./diary.txt app.ts`


/////////////////////////////////////////////////////////////////

///////  Env Vars  ////////

const code = Deno.env.get('KILLCODE')

