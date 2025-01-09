
This README.md file is just used for notes regarding the Deno course.

Here are some random pointers that I learned while going through the videos.

## Welcome To Deno

- To be honest, I need to review meta.main. I know it helped make imports accessible in one scope, but not another.

### Modules
- Regarding Modules, we only need to worry about export/import. You can custom name any default imports.

### JSR
- Dino uses JSR as its main package registry, and has a big standard library. It was created by Deno with TypeScript first in mind.

- There are 3 ways to install JSR packages:
  1. Import the package with `jsr:@`, and when intellisense pops up then pick your package.
  2. In the console you can run: `deno add jsr:@std/text`. This will add the package to the deno.json file, and be in the "imports" object.
    - In addition to JSR, in Deno 2, you can also import form NPM
    - import {  } from 'npm:lodash.camelcase'
  3. The 3rd way to install a package from a 3rd Party is to use an HTTPS URL. This can typically be from a source like deno.land, unpkg.com, or esm.sh (CDNs for popular JS libaries).
    - https://unpkg.com/:package@:version/:file


### TypeScript
- You can use the --check flag when running deno to check your vanilla JS for type errors.
    - You can also just check without running the program: `deno check app.ts`

- To interact with the DOM, we have to go into deno.json and add libs for dom and deno to "compilerOptions"


### Instant Docs
- You can have Deno create docs for you, and even have them published in their own website!!
- Imagine we have a lib.ts file with a funciton in it.
    - Make sure that function has a *type* signature.
    - Add additional details abou the function by using the TSDoc comment format: `/**`
    - Pull up the terminal and run the deno doc command: `deno doc --html --name="<name>" <file.ts>`
        - `deno doc --html --name="My library" lib.ts`
    - This will generate a **docs** directory. In it there will be an **index.html** file.
    - You can serve this up locally, or right click the html file to copy path into a browser.


### Permissions
- To avoid the prompt that allows us to read the file, run: `deno run --allow-read <file.ts>
    - You can also choose to use the `-A` flag for this

- We can choose to be more granlar with our permissions. If we have multiple files, but we only want to grant access to specific ones, then run: `deno run --allow-read --deny-read =./diary.txt app.ts`


### Tasks
- Instead of memorizing a ton of different commands (such as starting a dev server, build for prod, run tests, and database migrations, etc.), we can use Deno's tasks.
    - You can define commands in tasks in the deno.json file.

- It feels like Deno tasks are identical to NPM scripts. In fact, you can also use **npm scripts** in our deno.json file, which is useful if we have a package.json file in our project.
    - In deno.json: `deno run npm:build`

- One thing that's really cool about Deno is the ability to run muliple commands together.
    - You can separate two commands with a `;`. This will run one task after the other, whether they fail or succeed.
        - `"prod": "deno task test; deno task build"`
    - If you want one command to depend on the other (like if you want to test your program before you build and compile), then use `&&`:
        - `"prod": "deno task test && deno task build"`
    - Or the opposite, if the first task fails, use `||` to then run the second command in that case (the 2nd task will only run if the 1st task fails):
        - `"prod": "deno task test || deno task build"`
    - Finally, you can use `&` to run 2 different tasks asyncronously, useful if you spin up a dev server that runs indefinitely, or some other long running process.
        - In Node.js we would need a 3rd party library like "concurently" to handle that. But in Deno it comes out of the box.
        - task1 & task2

- You can take the standard output from a script and pipe it directly into a file using `>`.
    - `"dev": "deno run --allow-read --watch main.ts > log.txt"`

- Unix commands can be used direclty in *task*.


### ENV VARS
- It's possible to set Env Vars in tasks using the export keyword:
    - `"dev": "export KILLCODE=hello && deno run app.ts"`
    - then in app.ts: `Deno.env.get('KILLCODE')
    - this is a *synchronous* api, so there's no need to use **await** or such to retrieve an env var.

- The standard way to use mulitple Env Vars is to use a **.env** file. We can simply add this to our file structure. In Deno, this is managed automatically, but we have to include the `--env` flag in the run command.
    - `"dev": "deno run --env app.ts"`
    - This tells Deno to take our .env file and load it into our environment.

- Make sure to keep **.env** in your **.gitignore** file so you don't accidentally commit it to your public git repo.


### Formatting && Linting
- `dino lint [OPTIONS] [files]...`

- Instead of as a 3rth party, lint comes with Deno. Comes with squigly lines and hover-over options.

- You can use `deno fmt [OPTION] [files]...` to configure line width, semi-colons, double quotes, etc. It's all about the aesthetics of the code. 
    - To change the default format, everything can be customized in the deno.json file.
    - The deno docs can tell you how to add format object and options to the json file.

- It's pretty cool that Deno really only makes you deal with one config file.

- In the **lint** and **fmt** objects, you're also able to *include* and *exclude* **files** and **directories**. Like, you might want to only run linter on the source directory that contains your source code, but exclude it on your testing data.


### Deno Bench
- We can test our various algorithms' performance with `deno bench [OPTIONS] [filename]...` with some code written in our **arr-sum.ts** file.

- We'll recieve a report that shows us how many iterations of a function it was able to run per second and its average execution time, as well as the best case and worst case performance.

- At a high level, it also gives a summary that shows us which function is fastest.
    - Surpringly, the traditional **for loop** is significantly faster than the others.
    - Basically, what type of loop you use doesn't matter, unless you're looping over massive arrays. In which case, you'll want to use a traditional for loop.

- In our **arr-includes.ts** we go over some optimization with some serious impact on performance when searching for a value in an array. Also see and use `bench` on **arr-sort.ts**.


### Testing
- JS is known for having too many testing frameworks which will likely fall apart with configuration issues when setting them up.

- Deno fixes this with its own built-in testing framework. We see an example of this with our lib.ts file
    - We created a dedicated file for testing features in **main_test.ts**, where we ran the Deno test function.
    - We can use either the IDE, with a green checkmark that shows the results of our tests, or in the terminal with the `deno test` command.
        - You can either specify a file to test, or if left empty it will default to run every test in your entire application.

- **JEST** has been one of the most popular framework in recent years. An alternative way to test is to use the `expect` function from the standard library, which is designed to be fully compatible with JEST. There are also other ways to run tests, as you can see in our **main_test.ts** file.


- Deno can also provide a **code coverage report** which will tell you how much of your code covered by testing: `deno coverage`
    - I had to run these two lines to make this work (as per Deno's documentation):
        - `deno test --coverage=cov_profile`
        - `deno coverage cov_profile`



## CLI Mini-Project

- Here's we'll build a mini-project command line tool. This tool takes text as an imput and then format it in different ways. Sure, it's super basic, but the point is to learn lots of interesting details and features that Deno offers from its standard library.

- Everything here will be built without the use of any 3rd party libraries. Other common libaries include **chalk** or **inquisitor**.

- An interesting note, rather than running this with Deno we'll compile our program to an executable binary **./cli.exe**, which lets us use and distribute it anywhere without the need to have Deno installed.

- One more note is that Deno has a feature called **Foregin Function Interface** that allows us to execute code in other programming languages.


### Deno Args

- With our basic **cli.ts** file, we started by using `parseArgs` receive inputs, as well as set up expectations for what we want to recieve.

- Besides taking inputs from flags, we can also use the built-in `prompt` function. Or, if you're dealing with a *boolean* value, you can use the built-in `confirm` function, which will ask the user a *yes or no* question.