var assert = require('assert'),
    path = require('path'),
    fs = require('fs');

var pila = require('../lib/pila');

describe("Pila unit tests", function() {
    var specPath = path.join(__dirname, 'data'),
        files = fs.readdirSync(specPath);

    files.forEach(function(filename) {
        if (/expected\.css/.test(filename) || /DS_Store/.test(filename)) return;

        var basename = filename.replace('.css', '');

        it(basename, function() {
            var origin = fs.readFileSync(path.join(specPath, filename)).toString(),
                expected = fs.readFileSync(path.join(specPath, basename + '.expected.css')).toString(),
                piled = pila(origin);

            expected = expected.replace(/[\r\n]/gi, '');
            piled = piled.replace(/[\r\n]/gi, '');
            assert.equal(piled, expected);
        });
    });
});