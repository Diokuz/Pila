
var fs = require('fs');
var pila = require('../lib/pila');
var argv = require('yargs').argv;

argv['_'].forEach(function(filepath) {
    var contents = fs.readFileSync(filepath).toString();
    var processed = pila(contents);
    console.log(processed);
});
