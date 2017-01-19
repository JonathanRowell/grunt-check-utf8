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
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    jsvalidate: {
      options: {
         globals: {},
         esprimaOptions: {},
         verbose: false
      },
      targetName:{
         files:{
            src:['<%=jshint.all%>']
         }
      }
    },
      
    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    },

   bump: {
      options: {
         files: ['package.json'],
         updateConfigs: [],
         createTag: false,
         'push': false,
         commit: false
      }
   }

  });

  // show elapsed time at the end
  require('time-grunt')(grunt);
  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-jsvalidate');
  grunt.loadNpmTasks('grunt-bump');
  
  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  // grunt.registerTask('test', ['clean', 'check_utf8', 'nodeunit']);
  grunt.registerTask('test', ['clean', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jsvalidate', 'jshint', 'test']);
  
  // Release by building and bumping  
  grunt.registerTask('build', ['jsvalidate', 'jshint', 'test', 'bump']);

};
