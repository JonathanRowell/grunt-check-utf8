/*
 * grunt-check-utf8
 * https://github.com/Jonathan Rowell/grunt-check-utf8
 *
 * Copyright (c) 2017 Jonathan Rowell
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('check_utf8', 'Check UTF* encodings', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      BOM : ''
    });

    var errors = 0;
    var warnings = 0;

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          warnings++;
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        var data,start,chars;

        function hasBOM() {
           return (data.length>2) &&
                  (data[0]===0xEF) &&
                  (data[1]===0xBB) &&
                  (data[2]===0xBF);
        }

        // Read file source into a buffer.
        data = grunt.file.read(filepath,{encoding:null});
        // now process the buffer
        switch(options.BOM) {
        case 'required' : /* BOM must be present */
           if(hasBOM()) {
              start=3;
           } else {
              grunt.log.warn('Source file "' + filepath + '" has no BOM.');
              errors++;
              return;
           }
           break;
        case 'ignore'   : /* Ignore any BOM */
           start = (hasBOM()?3:0);
           break;
        case 'none'     : /* BOM must be absent */
           if(!hasBOM()) {
              start=3;
           } else {
              grunt.log.warn('Source file "' + filepath + '" has a BOM.');
              errors++;
              return;
           }
        }
        // now check the encoding
        while(start<data.length) {
           if(data[start]>0x7F) {
              switch(data[start]&0xF0) {
                  case 0xC0 : /* followed by 1 byte 10xx xxxx */
                  case 0xD0 :
                     chars = 1;
                     break;
                  case 0xE0 : /* followed by 2 bytes 10xx xxxx */
                     chars = 2;
                     break;
                  case 0xF0 : /* followed by 3 bytes 10xx xxxx */
                     chars = 3;
                     break;
                  default :
                     chars = 0;
              }
              if(chars===0) {
                  grunt.log.warn('Source file "' + filepath + '" illegal encoding at .');
                  errors++;
                  return;
              } else {
                 for(var j=1; j<=chars; j++) {
                    if(data[start+j]&0xC0!==0x80) {
                        grunt.log.warn('Source file "' + filepath + '" illegal encoding at .');
                        errors++;
                        return;
                    }
                 }
              }
              start=start+chars;
           } 
           start++;
        }
      });

      // Print a success/failure messages.
      if(errors === 0 && warnings === 0) {
         console.log(('Checked ' + this.files.length + ' files').green);
      } else if(errors > 0) {
         grunt.fail.warn(('\nCheckeded ' + this.files.length + ' files. Found ' + errors + ' errors and ' + warnings + ' warnings.').red);
      } else if(warnings > 0) {
         grunt.fail.warn(('\nChecked ' + this.files.length + ' files. Found ' + errors + ' errors and ' + warnings + ' warnings.').yellow);
      }
    });
  });

};
