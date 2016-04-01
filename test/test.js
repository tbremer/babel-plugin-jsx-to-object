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
  it('TRANSFORM ELEMENT WITH CHILD', () => {});

  /**
   * ELEMENT WITH MANY CHILDREN
   */
  it('TRANSFORM ELEMENT WITH MANY CHILDREN', () => {
    const FIXTURE = `<div booelan={this.props.foo}><section>{this.props.children}</section></div>`;
    let code = transform(FIXTURE, { plugins: [plugin] }).code;

    console.log(code);
  });
})
