import { toKebabCase, toSnakeCase } from "@std/text";
import { red, bgGreen, yellow, blue, magenta } from "jsr:@std/fmt/colors"
import { parseArgs } from "jsr:@std/cli/parse-args"
import { toUpperCaseWithC } from "../ffi.ts";

const flags = parseArgs(Deno.args, {
    boolean: ["snake", "kebab"],
    string: ["text"],
    default: { text: "Hi Mom" },
});

const ageInput = prompt("How old ar you?");
if (!ageInput) {
    console.log(red('No input provided 💀'));
    Deno.exit();
}

const age = parseInt(ageInput, 10);
if (isNaN(age) || age < 21) {
    console.log(red('You are not old enough to run this command 💀'));
    Deno.exit();
}

console.log()
console.log(bgGreen('ACCESS GRANTED'));
console.log()

const shouldProceed = confirm("Wait, r u sure?");

if (!shouldProceed) {
    console.log(red('Terminated 💀'));
    Deno.exit();
}

const upper = toUpperCaseWithC(flags.text)

console.log()
// console.log(yellow((flags.text.toUpperCase())));
console.log(yellow((upper)))
flags.kebab && console.log(blue(toKebabCase(flags.text)))
flags.snake && console.log(magenta(toSnakeCase(flags.text)))

