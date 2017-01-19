/*
 * grunt-check-utf8
 * https://github.com/Jonathan Rowell/grunt-check-utf8
 *
 * Copyright (c) 2017 Jonathan Rowell
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'lib/*.js',
        'tasks/*.js',
        'test/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    check_utf8: {
      default_options: {
        options: {
           BOM: 'none'
        },
        files: {
          'test/default_options': ['test/fixtures/ansi.txt', 'test/fixtures/unicode.txt', 'test/fixtures/utf8.txt']
        }
      },
      custom_options: {
        options: {
          BOM: 'required'
        },
        files: {
          'test/custom_options': ['test/fixtures/ansi.txt', 'test/fixtures/unicode.txt', 'test/fixtures/utf8.txt']
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  // grunt.registerTask('test', ['clean', 'check_utf8', 'nodeunit']);
  grunt.registerTask('test', ['clean', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
