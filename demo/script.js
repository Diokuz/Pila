var fs = require('fs');

var pila = require('../lib/pila.js');
var src = fs.readFileSync('demo/style.css').toString();

var out = pila(src);