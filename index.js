const { load } = require('node-gyp-build-esm');

const binding = load(__dirname, () => ({
  'linux-x64': () => require('./prebuilds/linux-x64+ia32/xml2json-napi.node'),
  'darwin-x64': () =>
    require('./prebuilds/darwin-x64+arm64/xml2json-napi.node'),
  'win32-x64': () => require('./prebuilds/win32-x64+ia32/xml2json-napi.node'),
}));

module.exports = { xml2json: binding.xml2json };
