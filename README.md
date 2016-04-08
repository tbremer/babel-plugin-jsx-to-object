babel-plugin-jsx-to-object
---
_Transform JSX into opinionated JSON Objects._

[![Travis CI](https://img.shields.io/travis/tbremer/babel-plugin-jsx-to-object.svg?style=flat-square)](https://travis-ci.org/tbremer/babel-plugin-jsx-to-object)
[![Version](https://img.shields.io/npm/v/babel-plugin-jsx-to-object.svg?style=flat-square)](https://www.npmjs.com/package/babel-plugin-jsx-to-object)
[![NPM Downloads](https://img.shields.io/npm/dm/babel-plugin-jsx-to-object.svg?style=flat-square)](https://www.npmjs.com/package/babel-plugin-jsx-to-object)
[![LICENSE](https://img.shields.io/npm/l/babel-plugin-jsx-to-object.svg?style=flat-square)](https://github.com/tbremer/babel-plugin-jsx-to-object/blob/master/LICENSE)

All React conventions of JSX are support, this includes:

* Booleans
* Spreads
* Identifiers
* Functions
* Fat Arrow Functions
* Strings
* Deeply nested children

## Install
```shell
npm install --save-dev babel-plugin-jsx-to-object
```

Add to your`.babelrc` config
```json
{
  "plugins": [ "babel-plugin-jsx-to-object" ]
}
```

## Usage

The following JSX:
```javascript
(<h1 class="title">Hello World</h1>);
```

Returns:
```javascript
({
    type: 'h1',
    attributes: { class: 'title' },
    children: [ 'hello world' ]
});
```

## Options
_All the objects keys can be overidden_

**The following JSX:**

```javascript
import jsxTransform from 'babel-plugin-jsx-to-object';

const OPTIONS = {
    type: 'elementName',
    attributes: 'args',
    children: 'kids'
};

transform("(<h1 class="title">Hello World</h1>);", { plugins: [ [jsxTransform, OPTIONS] ] })
```

**Becomes:**
```javascript
({
    elementName: 'h1',
    args: { class: 'title' },
    kids: [ 'hello world' ]
});
```

*Required reading before contributing:*
* [JSX Type Definitiions](https://github.com/babel/babel/blob/master/packages/babel-types/src/definitions/jsx.js)
* [Plugin handbook](https://github.com/thejameskyle/babel-handbook)
