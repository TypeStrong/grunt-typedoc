'use strict';

module.exports = function (grunt) {

	grunt.registerMultiTask('typedoc', 'Generate TypeScript docs', function () {
		var options = this.options({});

		var args = [];
		for (var key in options) {
			if (options.hasOwnProperty(key) && (typeof options[key] !== 'boolean' || options[key])) {
				args.push('--' + key);
				if (typeof options[key] !== 'boolean' && !!options[key]) {
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
		var typedoc;

		try {
			typedoc = require.resolve('../../typedoc/package.json');
		} catch(e) {
			typedoc = require.resolve('typedoc/package.json');
		}

		var winExt = /^win/.test(process.platform) ? '.cmd' : '';

		var done = this.async();
		var executable = path.resolve(typedoc, '..', '..', '.bin', 'typedoc' + winExt);

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
