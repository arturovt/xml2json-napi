import fs from 'node:fs';
import url from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

export function readFixture(name) {
	return fs.readFileSync(path.join(__dirname, 'fixtures', name)).toString();
}
