module.exports = function (grunt) {
  'use strict';
  var typedocModule = require("typedoc");

  grunt.registerMultiTask('typedoc', 'Generate TypeScript docs', function () {
    var options = this.options({});

    // leaving the 'out' or 'version' option in causes typedoc error for some reason
    var out = options.out;
    delete options.out;
    delete options.version;

    // typedoc instance
    var app = new typedocModule.Application(options);
    var src = app.expandInputFiles(this.filesSrc);
    var project = app.convert(src);
    if (project) {
      if (out) app.generateDocs(project, out);
      if (options.json) app.generateJson(project, options.json);
      if (app.logger.hasErrors()) {
        grunt.log.error('Error in TypeDoc generation');
        return false;
      }
    } else {
      grunt.log.error('Error in TypeDoc generation');
      return false;
    }
  });
};
