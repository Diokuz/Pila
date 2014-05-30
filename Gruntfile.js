module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            appjs: {
                options: {
                    "indent": 4,
                    "node": true,
                    "browser": true,
                    "jquery": true,
                    "eqnull": true,
                    "eqeqeq": false,
                    "devel": false,
                    "boss": true,
                    "trailing": true,
                    "loopfunc": true,
                    "-W041": true,
                    "-W015": true,
                    "sub": true,
                    "unused": true
                },
                src: ['pila.js']
            }
        },
        mochacli: {
            options: {
            },
            all: [
                'tests/**.spec.js'
            ]
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-cli');

    grunt.registerTask('default', ['uglify:def']);
    grunt.registerTask('t', ['jshint', 'mochacli']);
};