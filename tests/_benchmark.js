const xmlJs = require('xml-js');
const { performance } = require('node:perf_hooks');

const { xml2json } = require('../index.js');

async function benchmark() {
  const { readFixture } = await import('./utils.mjs');
  const xml = readFixture('test-track-2.xml');

  let t0 = performance.now();
  for (let i = 0; i < 500; i++) {
    xmlJs.xml2json(xml);
  }
  let t1 = performance.now();

  console.log(`xml-js package took ${t1 - t0}ms.`);

  t0 = performance.now();
  for (let i = 0; i < 500; i++) {
    xml2json(xml);
  }
  t1 = performance.now();

  console.log(`native binding took ${t1 - t0}ms.`);
}

benchmark();
