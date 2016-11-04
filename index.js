"use strict";

var process = require('process'),
    RCON = require('srcds-rcon'),
    readline = require('readline');

var address = process.argv[2];
var password = process.argv[3];
console.log("Establishing connection to " + address );

var rcon = RCON({address: address, password: password});

var rl = readline.createInterface({
   input: process.stdin,
   output: process.stdout
});

rl.setPrompt("> ");
rl.prompt();

rl.on('line', (command) => {
   if (!command || command == '') {rl.prompt(); return;}
   rcon.connect().then(() => {
      return rcon.command(command).then((result, e)  => {
        console.log(result, e);
        rl.prompt();
      }, function(e) { console.log(e); rl.prompt(); }).then(() => { rcon.disconnect(); });
   }, function(e) { console.log(e); rl.prompt();});
});


