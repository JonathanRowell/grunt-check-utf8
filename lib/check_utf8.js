module.exports = {
   
   /**
    * @module The main function
    * @author Jonathan Rowell
    * @date 17 January 2017
    * Copyright (c) 2017 Jonathan Rowell
    * Licensed under the MIT license.
*/ 
   
   /**
    * process one file
    * @param {string} filepath - the filepath to the file to test
    * @param {object} options  - BOM : (required,ignore,none) ZEROS : (true,false)
    * @param {object} grunt    - grunt object
    * @return {string} - empty if OK, error message otherwise
   */

   checkutf8 : function(filepath,options,grunt) {
      
      var byt,data,start,chars;

      function hasBOM() {
         return (data.length>2) &&
                (data[0]===0xEF) &&
                (data[1]===0xBB) &&
                (data[2]===0xBF);
      }

      // Read file source into a buffer.
      data = grunt.file.read(filepath,{encoding:null});
      grunt.verbose.write(filepath+' length='+data.length);
      // now process the buffer
      switch(options.BOM) {
         case 'required' : /* BOM must be present */
            if(hasBOM()) {
               start=3;
            } else {
               return 'Source file "' + filepath + '" has no BOM.';
            }
            break;
         case 'ignore' : /* Ignore any BOM */
            start = (hasBOM()?3:0);
            break;
         case 'none' : /* BOM must be absent */
            if(!hasBOM()) {
               start=0;
            } else {
               return 'Source file "' + filepath + '" has a BOM.';
            }
				break;
         default :
            return 'BOM option invalid "'+options.BOM+'"';
         }
      // now check the encoding
		while(start<data.length) {
			byt = data[start];
			if(byt>0x7F) {
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
					return 'Source file "' + filepath + '" illegal encoding at ' + start;
				} else {
					for(var j=1; j<=chars; j++) {
						var index = start+j;
						if((data[index]&0xC0)!==0x80) {
							return 'Source file "' + filepath + '" illegal encoding at ' + start + ' char=' + data[start].toString(16);
						}
					}
				}
				start=start+chars;
			} else {
				if(byt===0) {
					return 'Source file "' + filepath + '" illegal encoding at ' + start + ' char=' + byt.toString(16);
				}
			}
			start++;
		}
      return '';
   }

};
