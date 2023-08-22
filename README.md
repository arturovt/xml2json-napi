# xml2json-napi

Node.js library that offers bindings for the `xml2json` C++ library (https://github.com/Cheedoong/xml2json).

To install the package, execute the following command:

```sh
$ npm install xml2json-napi
# Or if you're using yarn
$ yarn add xml2json-napi
# Or if you're using pnpm
$ pnpm install xml2json-napi
```

Please note that this package doesn't offer any options, as the original `xml2json` C++ library exclusively accepts the XML as a string and returns the resulting JSON-formatted string.

Given the following example:

```js
import { xml2json } from 'xml2json-napi';

const xml =
  '<?xml version="1.0" encoding="utf-8"?>' +
  '<note importance="high" logged="true">' +
  '    <title>Happy</title>' +
  '    <todo>Work</todo>' +
  '    <todo>Play</todo>' +
  '</note>';

xml2json(xml);
// This will output the following string:
// '{"note":{"@importance":"high","@logged":"true","title":"Happy","todo":["Work","Play"]}}'

JSON.parse(xml2json(xml));
// Since this is a JSON-formatted string, we can pass it to JSON.parse:
// {
//   note: {
//     '@importance': 'high',
//     '@logged': 'true',
//     title: 'Happy',
//     todo: [ 'Work', 'Play' ]
//   }
// }
```
