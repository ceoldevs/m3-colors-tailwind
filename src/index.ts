#! /usr/bin/env node

import getopt from 'node-getopt';
import fs from 'fs';

import {loadTokens} from './lib/tokenParser';

let opt = getopt.create([
        ['t' , 'token-file=ARG'      , 'option with argument'],
        ['h' , 'help'                , 'display this help'],
        ['v' , 'version'             , 'show version']
]).bindHelp()     // bind option 'help' to default action
.parseSystem(); // parse command line

// console.info({argv: opt.argv, options: opt.options});

fs.readFile(opt.options.t as string, "utf8", (err: any, jsonString: string) => {
    if (err) {
        console.log("File read failed:", err);
        return;
    }
    // console.log("File data:", jsonString);
    let tokens = loadTokens(jsonString);

    console.log(tokens)
})

// console.log(opt.options.t)
