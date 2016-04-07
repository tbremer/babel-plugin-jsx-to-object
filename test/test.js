import assert from 'assert';
import { transform } from 'babel-core';
import { parse } from 'babylon';
import traverse from 'babel-traverse';
import plugin from '../src';

const BABEL_EXTEND = 'var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};';
const removeProps = traverse.removeProperties;

describe('babel-plugin-jsx-to-object', () => {
  describe('SINGLE ELEMENTS', () => {
    it('transforms single elements', () => {
      const FIXTURE = '(<div></div>)';
      const EXPECTED_OBJ = {
        elementName: 'div',
        attributes: null,
        children: null
      };

      const CODE = transform(FIXTURE, { plugins: [ plugin ]}).code;
      const EXPECTED = removeProps(parse(`(${JSON.stringify(EXPECTED_OBJ)})`));
      const ASSERT = removeProps(parse(CODE));

      assert.deepEqual(ASSERT, EXPECTED);
    });

    it('transforms single self-closing elements', () => {
      const FIXTURE = '(<br />)';
      const EXPECTED_OBJ = {
        elementName: 'br',
        attributes: null,
        children: null
      };


      const CODE = transform(FIXTURE, { plugins: [ plugin ]}).code;
      const EXPECTED = removeProps(parse(`(${JSON.stringify(EXPECTED_OBJ)})`));
      const ASSERT = removeProps(parse(CODE));

      assert.deepEqual(ASSERT, EXPECTED);
    });

    it('transforms single elements with string attributes', () => {
      const FIXTURE = '(<div attr="string" />)';
      const EXPECTED_OBJ = {
        elementName: 'div',
        attributes: { attr: 'string' },
        children: null
      };

      const CODE = transform(FIXTURE, { plugins: [ plugin ]}).code;
      const EXPECTED = removeProps(parse(`(${JSON.stringify(EXPECTED_OBJ)})`));
      const ASSERT = removeProps(parse(CODE));

      assert.deepEqual(ASSERT, EXPECTED);
    });

    it('transforms single elements with (truthy) boolean attributes', () => {
      const FIXTURE = '(<div boolean />)';
      const EXPECTED_OBJ = {
        elementName: 'div',
        attributes: { boolean: true },
        children: null
      };

      const CODE = transform(FIXTURE, { plugins: [ plugin ]}).code;
      const EXPECTED = removeProps(parse(`(${JSON.stringify(EXPECTED_OBJ)})`));
      const ASSERT = removeProps(parse(CODE));

      assert.deepEqual(ASSERT, EXPECTED);
    });

    it('transforms single elements with (true) boolean attributes', () => {
      const FIXTURE = '(<div boolean={true} />)';
      const EXPECTED_OBJ = {
        elementName: 'div',
        attributes: { boolean: true },
        children: null
      };

      const CODE = transform(FIXTURE, { plugins: [ plugin ]}).code;
      const EXPECTED = removeProps(parse(`(${JSON.stringify(EXPECTED_OBJ)})`));
      const ASSERT = removeProps(parse(CODE));

      assert.deepEqual(ASSERT, EXPECTED);
    });

    it('transforms single elements with (false) boolean attributes', () => {
      const FIXTURE = '(<div boolean={false} />)';
      const EXPECTED_OBJ = {
        elementName: 'div',
        attributes: { boolean: false },
        children: null
      };

      const CODE = transform(FIXTURE, { plugins: [ plugin ]}).code;
      const EXPECTED = removeProps(parse(`(${JSON.stringify(EXPECTED_OBJ)})`));
      const ASSERT = removeProps(parse(CODE));

      assert.deepEqual(ASSERT, EXPECTED);
    });

    it('transforms single elements with Numeric attributes', () => {
      const FIXTURE = '(<div number={1} />)';
      const EXPECTED_OBJ = {
        elementName: 'div',
        attributes: { number: 1 },
        children: null
      };

      const CODE = transform(FIXTURE, { plugins: [ plugin ]}).code;
      const EXPECTED = removeProps(parse(`(${JSON.stringify(EXPECTED_OBJ)})`));
      const ASSERT = removeProps(parse(CODE));

      assert.deepEqual(ASSERT, EXPECTED);
    });

    it('transforms single elements with Array attributes', () => {
      const FIXTURE = "(<div arr={[1, 2, 'foo', false]} />)";
      const EXPECTED = "({'elementName':'div','attributes':{'arr':[1,2,'foo',false]},'children':null});";

      const CODE = transform(FIXTURE, { plugins: [ plugin ], compact: true}).code;

      assert.deepEqual(CODE, EXPECTED);
    });

    it('transforms single elements with Object attributes', () => {
      const FIXTURE = "(<div obj={{foo: 'bar'}} />)";
      const EXPECTED = "({'elementName':'div','attributes':{'obj':{foo:'bar'}},'children':null});";

      const CODE = transform(FIXTURE, { plugins: [ plugin ], compact: true}).code;
      assert.deepEqual(CODE, EXPECTED);
    });

    it('transforms single elements with spread attributes', () => {
      const FIXTURE = '(<div {...spread} />)';
      const EXPECTED = '({"elementName":"div","attributes":_extends(spread),"children":null});';

      const CODE = transform(FIXTURE, { plugins: [ plugin ], compact: true}).code;

      assert(CODE.indexOf(BABEL_EXTEND) !== -1);
      assert.deepEqual(CODE.replace(BABEL_EXTEND, ''), EXPECTED);
    });

    it('transforms single elements with spread and other attributes', () => {
      const FIXTURE = '(<div {...spread} foo="bar" />)';
      const EXPECTED = '({"elementName":"div","attributes":_extends(spread,{"foo":"bar"}),"children":null});';

      const CODE = transform(FIXTURE, { plugins: [ plugin ], compact: true}).code;

      assert(CODE.indexOf(BABEL_EXTEND) !== -1);
      assert.deepEqual(CODE.replace(BABEL_EXTEND, ''), EXPECTED);
    });
  });

  describe('ELEMENT WITH CHILDREN', () => {
    it('Single child', () => {
      const FIXTURE = '(<div><div></div></div>)';
      const EXPECTED_OBJ = {
        elementName: 'div',
        attributes: null,
        children: [{
          elementName: 'div',
          attributes: null,
          children: null
        }]
      };

      const CODE = transform(FIXTURE, { plugins: [ plugin ]}).code;
      const EXPECTED = removeProps(parse(`(${JSON.stringify(EXPECTED_OBJ)})`));
      const ASSERT = removeProps(parse(CODE));

      assert.deepEqual(ASSERT, EXPECTED);
    });

    it('Mutliple children', () => {
      const FIXTURE = '(<div><div></div><div></div><div></div></div>)';
      const EXPECTED_OBJ = {
        elementName: 'div',
        attributes: null,
        children: [
          {
            elementName: 'div',
            attributes: null,
            children: null
          },
          {
            elementName: 'div',
            attributes: null,
            children: null
          },
          {
            elementName: 'div',
            attributes: null,
            children: null
          }
        ]
      };

      const CODE = transform(FIXTURE, { plugins: [ plugin ]}).code;
      const EXPECTED = removeProps(parse(`(${JSON.stringify(EXPECTED_OBJ)})`));
      const ASSERT = removeProps(parse(CODE));

      assert.deepEqual(ASSERT, EXPECTED);
    });

    it('Single self-closing child', () => {
      const FIXTURE = '(<div><br /></div>)';
      const EXPECTED_OBJ = {
        elementName: 'div',
        attributes: null,
        children: [{
          elementName: 'br',
          attributes: null,
          children: null
        }]
      };

      const CODE = transform(FIXTURE, { plugins: [ plugin ]}).code;
      const EXPECTED = removeProps(parse(`(${JSON.stringify(EXPECTED_OBJ)})`));
      const ASSERT = removeProps(parse(CODE));

      assert.deepEqual(ASSERT, EXPECTED);
    });

    it('Multiple self-closing children', () => {
      const FIXTURE = '(<div><br /><br /><br /></div>)';
      const EXPECTED_OBJ = {
        elementName: 'div',
        attributes: null,
        children: [
          {
            elementName: 'br',
            attributes: null,
            children: null
          },
          {
            elementName: 'br',
            attributes: null,
            children: null
          },
          {
            elementName: 'br',
            attributes: null,
            children: null
          }
        ]
      };

      const CODE = transform(FIXTURE, { plugins: [ plugin ]}).code;
      const EXPECTED = removeProps(parse(`(${JSON.stringify(EXPECTED_OBJ)})`));
      const ASSERT = removeProps(parse(CODE));

      assert.deepEqual(ASSERT, EXPECTED);
    });

    it('Grand children', () => {
      const FIXTURE = '(<div><div><br /></div></div>)';
      const EXPECTED_OBJ = {
        elementName: 'div',
        attributes: null,
        children: [
          {
            elementName: 'div',
            attributes: null,
            children: [
              {
                elementName: 'br',
                attributes: null,
                children: null
              }
            ]
          }
        ]
      };

      const CODE = transform(FIXTURE, { plugins: [ plugin ]}).code;
      const EXPECTED = removeProps(parse(`(${JSON.stringify(EXPECTED_OBJ)})`));
      const ASSERT = removeProps(parse(CODE));

      assert.deepEqual(ASSERT, EXPECTED);
    });

    it('Element with Text child', () => {
      const FIXTURE = '(<div>hello world</div>)';
      const EXPECTED_OBJ = {
        'elementName': 'div',
        'attributes': null,
        'children': [
          'hello world'
        ]
      };

      const CODE = transform(FIXTURE, { plugins: [ plugin ]}).code;
      const EXPECTED = removeProps(parse(`(${JSON.stringify(EXPECTED_OBJ)})`));
      const ASSERT = removeProps(parse(CODE));

      assert.deepEqual(ASSERT, EXPECTED);
    });
  });
});
