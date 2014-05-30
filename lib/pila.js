var fs = require('fs'),
    parser = require('css-parse'),
    _ = require('lodash');

module.exports = function(src) {
    var tree = parser(src),
        rules = tree.stylesheet.rules;

    function exclude(rules) {
        // Finding pila declarations
        var pilit = [];
        rules = _.filter(rules, function(rule) {
            var selectors = rule.selectors,
                declarations = rule.declarations;

            // Pila for all properties of given selectors
            if (selectors) {
                if (declarations && declarations[0] && declarations[0].property == 'pila') {
                    pilit.push({
                        selectors: selectors
                    });
                } else {
                    rule.declarations = _.reject(declarations, function(declaration, j) {
                        if (declaration.value == 'pila') {
                            pilit.push({
                                selectors: selectors,
                                property: declaration.property
                            });
                            return true;
                        }
                    });
                    return true;
                }
            }
        });

        // Excluding pilit declarations from rules
        rules = _.reject(rules, function(rule) {
            var decls = rule.declarations;

            return _.some(pilit, function(pil) {
                if (_.isEqual(rule.selectors, pil.selectors)) {
                    if (pil.property) {
                        rule.declarations = _.reject(decls, function(decl, j) {
                            return decl && decl.property == pil.property;
                        });
                    } else {
                        return true; // Removing rule that has pila twin
                    }
                }
            });
        });

        var out = '';

        // Making output css
        _.each(rules, function(rule) {
            out += rule.selectors.join(',') + ' {\n';
            _.each(rule.declarations, function(decl) {
                out += '    ' + decl.property + ': ' + decl.value + ';\n';
            });
            out += '}\n';
        });

        return out;
    }

    return exclude(rules);
};