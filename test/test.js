import assert from 'assert';
import { transform } from 'babel-core';
import plugin from '../src';

describe('babel-plugin-jsx-to-object', () => {

  describe('SINGLE ELEMENTS', () => {
    it('transforms single elements', () => {
      const FIXTURE = '(<div></div>)';
      const EXPECTED_OBJ = {
        elementName: 'div',
        attributes: {},
        children: []
      };
      const EXPECTED = `(${JSON.stringify(EXPECTED_OBJ)});`;
      let code = transform(FIXTURE, { plugins: [plugin] }).code;

      assert.deepEqual(code.replace(/\s/g, ''), EXPECTED);
    });

    it('transforms single self-closing elements', () => {
      const FIXTURE = '(<br />)';
      const EXPECTED_OBJ = {
        elementName: 'br',
        attributes: {},
        children: []
      };
      const EXPECTED = `(${JSON.stringify(EXPECTED_OBJ)});`;
      let code = transform(FIXTURE, { plugins: [plugin] }).code;

      assert.deepEqual(code.replace(/\s/g, ''), EXPECTED);
    });

    it('transforms single elements with string attributes', () => {
      const FIXTURE = '(<div attr="string" />)';
      const EXPECTED_OBJ = {
        elementName: 'div',
        attributes: { attr: 'string' },
        children: []
      };
      const EXPECTED = `(${JSON.stringify(EXPECTED_OBJ)});`;
      let code = transform(FIXTURE, { plugins: [plugin] }).code;

      assert.deepEqual(code.replace(/\s/g, ''), EXPECTED);
    });

    it('transforms single elements with (truthy) boolean attributes', () => {
      const FIXTURE = '(<div boolean />)';
      const EXPECTED_OBJ = {
        elementName: 'div',
        attributes: { boolean: true },
        children: []
      };
      const EXPECTED = `(${JSON.stringify(EXPECTED_OBJ)});`;
      let code = transform(FIXTURE, { plugins: [plugin] }).code;

      assert.deepEqual(code.replace(/\s/g, ''), EXPECTED);
    });

    it('transforms single elements with (true) boolean attributes', () => {
      const FIXTURE = '(<div boolean={true} />)';
      const EXPECTED_OBJ = {
        elementName: 'div',
        attributes: { boolean: true },
        children: []
      };
      const EXPECTED = `(${JSON.stringify(EXPECTED_OBJ)});`;
      let code = transform(FIXTURE, { plugins: [plugin] }).code;

      assert.deepEqual(code.replace(/\s/g, ''), EXPECTED);
    });

    it('transforms single elements with (false) boolean attributes', () => {
      const FIXTURE = '(<div boolean={false} />)';
      const EXPECTED_OBJ = {
        elementName: 'div',
        attributes: { boolean: false },
        children: []
      };
      const EXPECTED = `(${JSON.stringify(EXPECTED_OBJ)});`;
      let code = transform(FIXTURE, { plugins: [plugin] }).code;

      assert.deepEqual(code.replace(/\s/g, ''), EXPECTED);
    });

    // it('transforms single elements with Numeric attributes', () => assert.deepEqual(true, false));
    // it('transforms single elements with Array attributes', () => assert.deepEqual(true, false));
    // it('transforms single elements with Object attributes', () => assert.deepEqual(true, false));
    // it('transforms single elements with Spread attributes', () => assert.deepEqual(true, false));
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
      const EXPECTED = `(${JSON.stringify(EXPECTED_OBJ)});`;
      let code = transform(FIXTURE, { plugins: [plugin] }).code;

      assert.deepEqual(code.replace(/\s/g, ''), EXPECTED);
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
      const EXPECTED = `(${JSON.stringify(EXPECTED_OBJ)});`;
      let code = transform(FIXTURE, { plugins: [plugin] }).code;

      assert.deepEqual(code.replace(/\s/g, ''), EXPECTED);
    });
  });

  /**
   * ELEMENT WITH CHILD
   */
  // it('TRANSFORM ELEMENT WITH CHILD', () => {
  //   const FIXTURE = '<div boolean><section>string</section></div>';

  //   const expectedObj = {
  //     elementName: 'div',
  //     attributes: { boolean: true },
  //     children: [
  //       {
  //         elementName: 'section',
  //         children: [
  //           'string'
  //         ]
  //       }
  //     ]
  //   };

  //   const expected = `(${JSON.stringify(expectedObj, null, 2)});`;
  //   let code = transform(FIXTURE, { plugins: [plugin] }).code;

  //   console.log(code); //eslint-disable-line
  //   // console.log(expected); //eslint-disable-line

  //   assert.deepEqual(code, expected);
  // });

  /**
   * ELEMENT WITH MANY CHILDREN
   */
  //it('TRANSFORM ELEMENT WITH MANY CHILDREN', () => {});
});
