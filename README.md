# grunt-typedoc

> Grunt [plugin](http://gruntjs.com/) to generate TypeScript docs with [TypeDoc](https://github.com/sebastian-lenz/typedoc)

[![Build Status](https://api.travis-ci.org/TypeStrong/grunt-typedoc.png?branch=master)](http://travis-ci.org/TypeStrong/grunt-typedoc)
[![Dependency Status](https://gemnasium.com/TypeStrong/grunt-typedoc.png)](https://gemnasium.com/TypeStrong/grunt-typedoc)
[![NPM version](https://badge.fury.io/js/grunt-typedoc.png)](http://badge.fury.io/js/grunt-typedoc)

Based on [gulp-typedoc](https://github.com/rogierschouten/gulp-typedoc) by @rogierschouten

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
$ npm install grunt-typedoc --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-typedoc');
```

## The "grunt-typedoc" task

### Default Options

All options are passed directly to [TypeDoc](https://sebastian-lenz.github.io/typedoc/).

```js
grunt.initConfig({
	typedoc: {
		build: {
			options: {
				module: 'commonjs',
				out: './docs',
				name: 'my-project',
				target: 'es5'
			},
			src: ['./src/**/*']
		}
	}
});
```


## History

* 0.1.1 - First release

## Contributing

Contributions are very welcome, please create an Issue before doing something major.

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).


## License

Copyright (c) 2014 [Bart van der Schoor](https://github.com/Bartvds)

Licensed under the MIT license.
