import assert from 'assert';
import { transform } from 'babel-core';
import { parse } from 'babylon';
import traverse from 'babel-traverse';
import plugin from '../src';

const removeProps = traverse.removeProperties;

describe('babel-plugin-jsx-to-object', () => {


  describe('SINGLE ELEMENTS', () => {
    it('transforms single elements', () => {
      const FIXTURE = '(<div></div>)';
      const EXPECTED_OBJ = {
        elementName: 'div',
        attributes: {},
        children: []
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
        attributes: {},
        children: []
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
        children: []
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
        children: []
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
        children: []
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
        children: []
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
        children: []
      };

      const CODE = transform(FIXTURE, { plugins: [ plugin ]}).code;
      const EXPECTED = removeProps(parse(`(${JSON.stringify(EXPECTED_OBJ)})`));
      const ASSERT = removeProps(parse(CODE));

      assert.deepEqual(ASSERT, EXPECTED);
    });

    it('transforms single elements with Array attributes', () => {
      const FIXTURE = "(<div arr={[1, 2, 'foo', false]} />)";
      const EXPECTED = "({'elementName':'div','attributes':{'arr':[1,2,'foo',false]},'children':[]});";

      const CODE = transform(FIXTURE, { plugins: [ plugin ], compact: true}).code;

      assert.deepEqual(CODE, EXPECTED);
    });

    it('transforms single elements with Object attributes', () => {
      const FIXTURE = "(<div obj={{foo: 'bar'}} />)";
      const EXPECTED = "({'elementName':'div','attributes':{'obj':{foo:'bar'}},'children':[]});";

      const CODE = transform(FIXTURE, { plugins: [ plugin ], compact: true}).code;
      assert.deepEqual(CODE, EXPECTED);
    });
  });

  describe('ELEMENT WITH CHILDREN', () => {
    it('Single child', () => {
      const FIXTURE = '(<div><div></div></div>)';
      const EXPECTED_OBJ = {
        elementName: 'div',
        attributes: {},
        children: [{
          elementName: 'div',
          attributes: {},
          children: []
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
        attributes: {},
        children: [{
          elementName: 'div',
          attributes: {},
          children: []
        },
        {
          elementName: 'div',
          attributes: {},
          children: []
        },
        {
          elementName: 'div',
          attributes: {},
          children: []
        },]
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
        attributes: {},
        children: [{
          elementName: 'br',
          attributes: {},
          children: []
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
        attributes: {},
        children: [{
          elementName: 'br',
          attributes: {},
          children: []
        },
        {
          elementName: 'br',
          attributes: {},
          children: []
        },
        {
          elementName: 'br',
          attributes: {},
          children: []
        }]
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
        attributes: {},
        children: [{
          elementName: 'div',
          attributes: {},
          children: [{
            elementName: 'br',
            attributes: {},
            children: []
          }]
        }]
      };

      const CODE = transform(FIXTURE, { plugins: [ plugin ]}).code;
      const EXPECTED = removeProps(parse(`(${JSON.stringify(EXPECTED_OBJ)})`));
      const ASSERT = removeProps(parse(CODE));

      assert.deepEqual(ASSERT, EXPECTED);
    });

  });
});
