import assert from 'assert';
import { transform } from 'babel-core';
import plugin from '../src';

describe('FIXTURE SHOUJLD DO STUFF', () => {
  // it('should do things too', () => {
  //   const FIXTURE = `<div />`;
  //   let code = transform(FIXTURE, { plugins: [plugin] }).code;

  //   console.log(code);
  // });

  // it('should do things too', () => {
  //   const FIXTURE = `<div>hello world</div>`;
  //   let code = transform(FIXTURE, { plugins: [plugin] }).code;

  //   console.log(code);
  // });

  it('should do other neat things', () => {
    const FIXTURE = `<div booelan={this.props.foo}><section>{this.props.children}</section></div>`;
    let code = transform(FIXTURE, { plugins: [plugin] }).code;

    console.log(code);
  });
})
