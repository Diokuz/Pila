var fs = require('fs');

var pila = require('../lib/pila.js');

var src = fs.readFileSync('all.css').toString(),
	extected = fs.readFileSync('allExpected.css').toString();

var out = pila(src);

console.log('out', JSON.stringify(out));