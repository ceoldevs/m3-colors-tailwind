#! /usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_getopt_1 = __importDefault(require("node-getopt"));
var fs_1 = __importDefault(require("fs"));
var tokenParser_1 = require("./lib/tokenParser");
var opt = node_getopt_1.default.create([
    ['t', 'token-file=ARG', 'option with argument'],
    ['h', 'help', 'display this help'],
    ['v', 'version', 'show version']
]).bindHelp() // bind option 'help' to default action
    .parseSystem(); // parse command line
// console.info({argv: opt.argv, options: opt.options});
fs_1.default.readFile(opt.options.t, "utf8", function (err, jsonString) {
    if (err) {
        console.log("File read failed:", err);
        return;
    }
    // console.log("File data:", jsonString);
    var tokens = (0, tokenParser_1.loadTokens)(jsonString);
    console.log(tokens);
});
// console.log(opt.options.t)
