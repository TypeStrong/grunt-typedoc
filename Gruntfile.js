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

	grunt.registerTask('verify', function () {
		var done = this.async();
		var expected = [
			'modules/main.html',
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
			files = files.map(function (file) {
				return file.replace(/\\/, '/');
			}).sort();

			assert(files.length, expected.length, 'length');

			files.forEach(function (file, i) {
				assert(files[i], expected[i], 'file ' + i);
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
