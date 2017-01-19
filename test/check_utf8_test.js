'use strict';

   /**
    * @module : Simpler test functions with NodeUnit
    * @author Jonathan Rowell
    * @date 19 January 2017
    * Copyright (c) 2017 Jonathan Rowell
    * Licensed under the MIT license.
*/

var grunt = require('grunt');
var checker = require('../lib/check_utf8');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.check_utf8 = {
  setUp: function(done) {
   // setup here if necessary
   grunt.verbose.write('setup called');
   done();
  },
  BOM_TESTS: function(test) {

   var actual,expected;

   test.expect(6);

   /* BOM required test */

   actual = checker.checkutf8('test/fixtures/ansi.txt',{BOM: 'required'},grunt);
   expected = 'Source file "test/fixtures/ansi.txt" has no BOM.';
   test.equal(actual, expected, 'ansi has no BOM');

   actual = checker.checkutf8('test/fixtures/unicode.txt',{BOM: 'required'},grunt);
   expected = 'Source file "test/fixtures/unicode.txt" has no BOM.';
   test.equal(actual, expected, 'unicode has no BOM');

   actual = checker.checkutf8('test/fixtures/utf8.txt',{BOM: 'required'},grunt);
   expected = '';
   test.equal(actual, expected, 'utf8 has no BOM');

   /* BOM not required test */

   actual = checker.checkutf8('test/fixtures/ansi.txt',{BOM: 'none'},grunt);
   expected = 'Source file "test/fixtures/ansi.txt" illegal encoding at 63 char=eb';
   test.equal(actual, expected, 'No BOM test ansi file');

   actual = checker.checkutf8('test/fixtures/unicode.txt',{BOM: 'none'},grunt);
   expected = 'Source file "test/fixtures/unicode.txt" illegal encoding at 0 char=ff';
   test.equal(actual, expected, 'No BOM test unicode file');

   actual = checker.checkutf8('test/fixtures/utf8.txt',{BOM: 'none'},grunt);
   expected = 'Source file "test/fixtures/utf8.txt" has a BOM.';
   test.equal(actual, expected, 'No BOM test utf8 file with BOM');

   test.done();
	},

   ENCODING_TESTS: function(test) {

   var actual,expected;

   /* Encoding check */
   test.expect(3);

   actual = checker.checkutf8('test/fixtures/ansi.txt',{BOM: 'ignore'},grunt);
   expected = 'Source file "test/fixtures/ansi.txt" illegal encoding at 63 char=eb';
   test.equal(actual, expected, 'ansi not utf8 test');

   actual = checker.checkutf8('test/fixtures/unicode.txt',{BOM: 'ignore'},grunt);
   expected = 'Source file "test/fixtures/unicode.txt" illegal encoding at 0 char=ff';
   test.equal(actual, expected, 'unicode has no BOM');

   actual = checker.checkutf8('test/fixtures/utf8.txt',{BOM: 'ignore'},grunt);
   expected = '';
   test.equal(actual, expected, 'utf8 encoded OK');


    test.done();
  },
};
