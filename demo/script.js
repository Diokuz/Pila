var fs = require('fs');

var pila = require('../lib/pila.js');

var src = fs.readFileSync('../tests/simple.css').toString(),
	extected = fs.readFileSync('../tests/simpleExpected.css').toString();

var out = pila(src);

console.log('out', out);