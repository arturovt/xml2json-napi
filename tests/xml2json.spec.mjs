import test from 'ava';

import { xml2json } from '../index.mjs';
import { readFixture } from './utils.mjs';

test('converts to json (1)', (t) => {
	const xml = readFixture('test-track-1.xml');
	const result = JSON.parse(xml2json(xml));
	const json = JSON.parse(readFixture('test-track-1.json'));
	t.deepEqual(result, json);
});

test('converts to json (2)', (t) => {
	const xml = readFixture('test-track-2.xml');
	const result = JSON.parse(xml2json(xml));
	const json = JSON.parse(readFixture('test-track-2.json'));
	t.deepEqual(result, json);
});
