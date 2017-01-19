# grunt-check-utf8

> Check UTF8 encodings

Check files for being in UTF8 to avoid decoding exceptions, also to check whether a Byte Order Marker (BOM) is present or absent.
Many systems require files in UTF8 without a BOM; Windows 10 now requires them with.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-check-utf8 --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-check-utf8');
```

## The "check_utf8" task

### Overview
In your project's Gruntfile, add a section named `check_utf8` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  check_utf8: {
    options: {
      // Task-specific options go here.
		BOM: "none"
    },
    files: [
      // Target-specific file lists go in here.
    ]
  },
  ...
});
```

### Options

#### options.BOM
Type: `String`
Default value: `'none'`

Possible values are "required" checks that a BOM is present; "ignore" ignores a correct UTF8 BOM if present, and "none" there should be no BOM present.


### Usage Examples

#### Default Options
The default is BOM: "none"

```js
grunt.initConfig({
  check_utf8: {
    options: {},
    files: 
      ['src/testing', 'src/123'],
    },
  },
  ...
});
```


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
