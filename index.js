'use strict';

const binding = require('node-gyp-build')(__dirname);

module.exports = { xml2json: binding.xml2json };
