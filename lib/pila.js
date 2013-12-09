var cssp = require('cssp'),
    fs = require('fs'),
    _ = require('underscore');

module.exports = function(src) {
    var parser = require('css-parse'),
        tree = parser(src),
        rules = tree.stylesheet.rules;

    // Finding pila declarations
    var pilit = [];
    for (var i = 0 ; i < rules.length ; i++) {
        var selectors = rules[i].selectors,
            decls = rules[i].declarations;

        for (var j = 0 ; j < decls.length ; j++) {
            if (decls[j].value == 'pila') {
                pilit.push({
                    selectors: selectors,
                    property: decls[j].property
                });

                delete rules[i].declarations[j]; // Removing pila declarations
            }
        }
    }

    // Excluding pilit declarations from rules
    for (var i = 0 ; i < rules.length ; i++) {
        var rule = rules[i],
            selector = rule.selector,
            decls = rule.declarations;

        for (var k = 0 ; k < pilit.length ; k++) {
            if (_.isEqual(rule.selectors, pilit[k].selectors)) {
                for (var j = 0 ; j < decls.length ; j++) {
                    var decl = decls[j];

                    if (decl && decl.property == pilit[k].property) {
                        delete rules[i].declarations[j]; // Removing declarations that has pila twin
                    }
                }
            }
        }
    }

    var out = '';

    // Making output css
    _.each(rules, function(rule) {
        out += rule.selectors.join(',') + '{';
        _.each(rule.declarations, function(decl) {
            out += decl.property + ':' + decl.value;
        });
        out += '}';
    });

    return out;
};