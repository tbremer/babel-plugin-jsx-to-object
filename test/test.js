import assert from 'assert';
import { transform } from 'babel-core';
import plugin from '../src';

// const transformToJSON = (str) => {};

describe('babel-plugin-jsx-to-object', () => {

  /**
   * SINGLE ELEMENTS
   */
  it('TRANSFORM SINGLE ELEMENTS', () => {});

  /**
   * ELEMENT WITH TEXT
   */
  it('TRANSFORM ELEMENT WITH TEXT', () => {});

  /**
   * SINGLE ELEMENT WITH ATTRIBUTES
   */
  it('TRANSFORM SINGLE ELEMENT WITH ATTRIBUTES', () => {});

  /**
   * SINGLE ELEMENT WITH FUNCTION ATTRIBUTE
   */
  it('TRANSFORM SINGLE ELEMENT WITH FUNCTION ATTRIBUTE', () => {});

  /**
   * SINGLE ELEMENT WITH BOOLEAN ATTRIBUTE
   */
  it('TRANSFORM SINGLE ELEMENT WITH BOOLEAN ATTRIBUTE', () => {});

  /**
   * ELEMENT WITH CHILD
   */
  it('TRANSFORM ELEMENT WITH CHILD', () => {
    const FIXTURE = 'let ace = <div booelan><section>string</section></div>';

    const expectedObj = {
      elementName: 'div',
      attributes: { boolean: true },
      children: [
        {
          elementName: 'section',
          children: [
            'string'
          ]
        }
      ]
    };

    const expected = `let ace = ${JSON.stringify(expectedObj, null, 2)};`;
    let code = transform(FIXTURE, { plugins: [plugin] }).code;

    console.log(code); //eslint-disable-line
    // console.log(expected); //eslint-disable-line

    assert.deepEqual(code, expected);
  });

  /**
   * ELEMENT WITH MANY CHILDREN
   */
  it('TRANSFORM ELEMENT WITH MANY CHILDREN', () => {});
});
