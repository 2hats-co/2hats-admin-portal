'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
require('babel-plugin-transform-class-properties');
require('babel-plugin-transform-object-rest-spread');
require('babel-plugin-transform-react-jsx');
require('babel-plugin-transform-regenerator');
require('babel-plugin-transform-async-to-generator');
require('babel-preset-latest');
require('babel-preset-react');
require('babel-plugin-transform-decorators-legacy');
require('babel-plugin-transform-object-entries');
require('babel-plugin-object-values-to-object-keys');
require('babel-plugin-transform-export-extensions');

var baseCompile = require('../../internal/babelBaseCompiler');

var compiledFileTypes = ['js', 'jsx'];

var compile = function compile(files, distPath) {
  return baseCompile(files, distPath, __dirname, compiledFileTypes);
};

exports.default = { compile: compile };
module.exports = exports['default'];

//# sourceMappingURL=index.js.map
