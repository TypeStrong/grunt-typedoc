/*
 * grunt-typedoc
 * https://github.com/grunt-ts/grunt-typedoc
 *
 * Copyright (c) 2013 Bart van der Schoor
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');

	grunt.loadTasks('tasks');

	var path = require('path');

	grunt.registerTask('verify', function () {
		var done = this.async();
		var expected = [
			'classes/_main_.bar.html',
			'classes/_main_.foo.html',
			'modules/_main_.html',
			'globals.html',
			'index.html'
		];

		var recursive = require('recursive-readdir');
		var assert = require('assert');

		recursive('test/tmp', function (err, files) {
			if (err) {
				done(err);
				return;
			}
			expected = expected.map(function (file) {
				return path.join('test', 'tmp', file.replace(/[\\\/]/g, path.sep));
			}).sort();

			files.sort();

			expected.forEach(function (file, i) {
				assert(files.indexOf(file) > -1, 'file ' + i + ' ' + expected[i]);
			});
			grunt.log.writeln('verfied ' + expected.length + ' files');
			done();
		});
	});

	grunt.initConfig({
		clean: {
			test: ['./test/tmp']
		},
		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			all: [
				'Gruntfile.js',
				'tasks/**/*.js'
			]
		},
		typedoc: {
			test: {
				options: {
					module: 'commonjs',
					name: 'test-project',
					target: 'es5',
					out: './test/tmp'
				},
				src: ['./test/fixtures/**']
			}
		}
	});

	grunt.registerTask('test', ['clean', 'jshint', 'typedoc:test', 'verify']);
	grunt.registerTask('default', ['test']);
};
