module.exports = function (grunt) {
	'use strict';

	grunt.registerMultiTask('typedoc', 'Generate TypeScript docs', function () {
		var options = this.options({});

		var args = [];
		for (var key in options) {
			if (options.hasOwnProperty(key)) {
				if (options[key] === true) {
					args.push('--' + key);
				} else if (options[key] !== false) {
					args.push('--' + key);
					args.push(options[key]);
				}
			}
		}
		for (var i = 0; i < this.filesSrc.length; i++) {
			args.push(this.filesSrc[i]);
		}

		// lazy init
		var path = require('path');
		var child_process = require('child_process');

		var winExt = /^win/.test(process.platform) ? '.cmd' : '';

		var done = this.async();
		var executable = path.resolve(__dirname, '..', 'node_modules', '.bin', 'typedoc' + winExt);

		var child = child_process.spawn(executable, args, {
			stdio: 'inherit',
			env: process.env
		}).on('exit', function (code) {
			if (code !== 0) {
				done(false);
			}
			if (child) {
				child.kill();
			}
			done();
		});
	});
};
