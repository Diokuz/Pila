var cssp = require('cssp'),
    fs = require('fs'),
    _ = require('underscore');

module.exports = function(src) {
    var parser = require('css-parse'),
        tree = parser(src),
        rules = tree.stylesheet.rules;

    function exclude(rules) {
        // Finding pila declarations
        var pilit = [];
        _.each(rules, function(rule, i) {
            var selectors = rules[i].selectors,
                declarations = rules[i].declarations;

            // Pila for all properties of given selectors
            if (declarations[0] && declarations[0].property == 'pila') {
                pilit.push({
                    selectors: selectors
                });

                delete rules[i];
            }

            _.each(declarations, function(declaration, j) {
                if (declaration.value == 'pila') {
                    pilit.push({
                        selectors: selectors,
                        property: declaration.property
                    });

                    rules[i].declarations[j] = null; // Removing pila declarations
                    rules[i].declarations = _.compact(rules[i].declarations);
                }
            });
        });

        rules = _.compact(rules);

        // Excluding pilit declarations from rules
        _.each(rules, function(rule, i) {
            var decls = rule.declarations;

            _.each(pilit, function(pil, k) {
                if (_.isEqual(rule.selectors, pil.selectors)) {
                    if (pil.property) {
                        _.each(decls, function(decl, j) {
                            if (decl && decl.property == pil.property) {
                                rules[i].declarations[j] = null; // Removing declarations that has pila twin
                                rules[i].declarations = _.compact(rules[i].declarations);
                            }
                        });
                    } else {
                        delete rules[i]; // Removing rule that has pila twin
                    }
                }
            });
        });

        rules = _.compact(rules);

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
    }

    return exclude(rules);
};