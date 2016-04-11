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
* JSXElements as references to building other JSX Elements

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
    extends: null,
    type: 'h1',
    attributes: { class: 'title' },
    children: [ 'hello world' ]
});
```

The following JSX (with Declared Nodes):
```javascript
const UL = <ul />;
const LI = <li />;

(<UL>
    <LI>Learn JSX</LI>
    <LI>Write effiecient UI Libraries</LI>
    <LI>Profit</LI>
</UL>);
```
Returns:
```javascript
const UL = {
    extends: null,
    type: 'ul',
    attributes: null,
    children: null
};
const LI = {
    extends: null,
    type: 'li',
    attributes: null,
    children: null
};

({
    extends: UL,
    type: null,
    attributes: null,
    children: [
        {
            extends: LI,
            type: null,
            attributes: null,
            children: [ 'Learn JSX' ]
        },
        {
            extends: LI,
            type: null,
            attributes: null,
            children: [ 'Write efficient UI Libraries' ]
        },
        {
            extends: LI,
            type: null,
            attributes: null,
            children: [ 'Profit' ]
        }
    ]
})
```

## Options
_All the objects keys can be overidden_

**The following JSX:**

```javascript
import jsxTransform from 'babel-plugin-jsx-to-object';

const OPTIONS = {
    extends: 'elementExtension',
    type: 'elementName',
    attributes: 'args',
    children: 'kids'
};

transform('(<h1 class="title">Hello World</h1>);', { plugins: [ [jsxTransform, OPTIONS] ] })
```

**Becomes:**
```javascript
({
    elementExtension: null,
    elementName: 'h1',
    args: { class: 'title' },
    kids: [ 'hello world' ]
});
```
