import { red, bgGreen, yellow, blue, magenta } from "jsr:@std/fmt/colors"
import { parseArgs } from "jsr:@std/cli/parse-args"
import { toKebabCase, toSnakeCase } from "@std/text";

const flags = parseArgs(Deno.args, {
    boolean: ["snake", "kebab"],
    string: ["text"],
    default: { text: "Hi Mom" },
});

const age = prompt("How old ar you?");

if (parseInt(age!) < 21) {
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

console.log()
console.log(yellow((flags.text.toUpperCase())));
flags.kebab && console.log(blue(toKebabCase(flags.text)))
flags.snake && console.log(magenta(toSnakeCase(flags.text)))

