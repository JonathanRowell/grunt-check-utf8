/*
 * grunt-check-utf8
 * https://github.com/Jonathan Rowell/grunt-check-utf8
 *
 * Copyright (c) 2017 Jonathan Rowell
 * Licensed under the MIT license.
 */

'use strict';
var checker = require('../lib/check_utf8.js');

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('check_utf8', 'Check UTF8 encodings', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      BOM : 'none'
    });

    grunt.verbose.write('options.BOM='+options.BOM);
    var errors = 0;
    var warnings = 0;
	 var filesDone = 0;

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Test specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.error('Source file "' + filepath + '" not found.');
          warnings++;
          return false;
        } else {
			  filesDone++;
           var mess = checker.checkutf8(filepath,options,grunt);
           if(mess.length!==0) {
              grunt.fail.warn(mess);
          }
          return true;
        }
      });

      // Print a success/failure messages.
      if(errors === 0 && warnings === 0) {
         console.log(('Checked ' + filesDone + ' files').green);
      } else if(errors > 0) {
         grunt.fail.warn(('\nCheckeded ' + filesDone + ' files. Found ' + errors + ' errors and ' + warnings + ' warnings.').red);
      } else if(warnings > 0) {
         grunt.fail.warn(('\nChecked ' + filesDone + ' files. Found ' + errors + ' errors and ' + warnings + ' warnings.').yellow);
      }
    });
  });

};
