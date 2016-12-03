import assert from 'assert';
import { transform } from 'babel-core';
import plugin from '../src';

const BABEL_EXTEND = 'var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};';

describe('babel-plugin-jsx-to-object', () => {
  describe('SINGLE ELEMENTS', () => {
    it('transforms elements', () => {
      const FIXTURE = '(<div></div>)';
      const EXPECTED = '({"extends":null,"type":"div","attributes":null,"children":null});';

      const ASSERT = transform(FIXTURE, { plugins: [ plugin ], compact: true}).code;

      assert.deepEqual(ASSERT, EXPECTED);
    });

    it('transforms self-closing elements', () => {
      const FIXTURE = '(<br />)';
      const EXPECTED = '({"extends":null,"type":"br","attributes":null,"children":null});';


      const ASSERT = transform(FIXTURE, { plugins: [ plugin ], compact: true}).code;

      assert.deepEqual(ASSERT, EXPECTED);
    });

    it('transforms elements with string attributes', () => {
      const FIXTURE = '(<div attr="string" />)';
      const EXPECTED = '({"extends":null,"type":"div","attributes":{"attr":"string"},"children":null});';

      const ASSERT = transform(FIXTURE, { plugins: [ plugin ], compact: true}).code;

      assert.deepEqual(ASSERT, EXPECTED);
    });

    it('transforms elements with (truthy) boolean attributes', () => {
      const FIXTURE = '(<div boolean />)';
      const EXPECTED = '({"extends":null,"type":"div","attributes":{"boolean":true},"children":null});';

      const ASSERT = transform(FIXTURE, { plugins: [ plugin ], compact: true}).code;

      assert.deepEqual(ASSERT, EXPECTED);
    });

    it('transforms elements with (true) boolean attributes', () => {
      const FIXTURE = '(<div boolean={true} />)';
      const EXPECTED = '({"extends":null,"type":"div","attributes":{"boolean":true},"children":null});';

      const ASSERT = transform(FIXTURE, { plugins: [ plugin ], compact: true}).code;

      assert.deepEqual(ASSERT, EXPECTED);
    });

    it('transforms elements with (false) boolean attributes', () => {
      const FIXTURE = '(<div boolean={false} />)';
      const EXPECTED = '({"extends":null,"type":"div","attributes":{"boolean":false},"children":null});';

      const ASSERT = transform(FIXTURE, { plugins: [ plugin ], compact: true}).code;

      assert.deepEqual(ASSERT, EXPECTED);
    });

    it('transforms elements with Numeric attributes', () => {
      const FIXTURE = '(<div number={1} />)';
      const EXPECTED = '({"extends":null,"type":"div","attributes":{"number":1},"children":null});';

      const ASSERT = transform(FIXTURE, { plugins: [ plugin ], compact: true}).code;

      assert.deepEqual(ASSERT, EXPECTED);
    });

    it('transforms elements with Array attributes', () => {
      const FIXTURE = '(<div arr={[1, 2, "foo", false]} />)';
      const EXPECTED = '({"extends":null,"type":"div","attributes":{"arr":[1,2,"foo",false]},"children":null});';

      const CODE = transform(FIXTURE, { plugins: [ plugin ], compact: true}).code;

      assert.deepEqual(CODE, EXPECTED);
    });

    it('transforms elements with Object attributes', () => {
      const FIXTURE = '(<div obj={{foo: "bar"}} />)';
      const EXPECTED = '({"extends":null,"type":"div","attributes":{"obj":{foo:"bar"}},"children":null});';

      const CODE = transform(FIXTURE, { plugins: [ plugin ], compact: true}).code;
      assert.deepEqual(CODE, EXPECTED);
    });

    it('transforms elements with spread attributes', () => {
      const FIXTURE = '(<div {...spread} />)';
      const EXPECTED = '({"extends":null,"type":"div","attributes":_extends(spread),"children":null});';

      const CODE = transform(FIXTURE, { plugins: [ plugin ], compact: true}).code;

      assert(CODE.indexOf(BABEL_EXTEND) !== -1);
      assert.deepEqual(CODE.replace(BABEL_EXTEND, ''), EXPECTED);
    });

    it('transforms elements with a spread attribute and other attribute', () => {
      const FIXTURE = '(<div {...spread} foo="bar" />)';
      const EXPECTED = '({"extends":null,"type":"div","attributes":_extends({},spread,{"foo":"bar"}),"children":null});';

      const CODE = transform(FIXTURE, { plugins: [ plugin ], compact: true}).code;

      assert(CODE.indexOf(BABEL_EXTEND) !== -1);
      assert.deepEqual(CODE.replace(BABEL_EXTEND, ''), EXPECTED);
    });

    it('transforms elements with spread attribute and multiple attributes', () => {
      const FIXTURE = '(<div {...spread} foo="bar" bar="baz" baz={ thunk }/>)';
      const EXPECTED = '({"extends":null,"type":"div","attributes":_extends({},spread,{"foo":"bar","bar":"baz","baz":thunk}),"children":null});';

      const CODE = transform(FIXTURE, { plugins: [ plugin ], compact: true}).code;

      assert(CODE.indexOf(BABEL_EXTEND) !== -1);
      assert.deepEqual(CODE.replace(BABEL_EXTEND, ''), EXPECTED);
    });

    it('transforms elements with multiple spread attributes', () => {
      const FIXTURE = '(<div {...spread} {...spread2} {...spread3} />)';
      const EXPECTED = '({"extends":null,"type":"div","attributes":_extends({},spread,spread2,spread3),"children":null});';

      const CODE = transform(FIXTURE, { plugins: [ plugin ], compact: true}).code;

      assert(CODE.indexOf(BABEL_EXTEND) !== -1);
      assert.deepEqual(CODE.replace(BABEL_EXTEND, ''), EXPECTED);
    });

    it('transforms elements with functions as attribute values', () => {
      let FIXTURE = '(<div onClick={ function() { return clickhandler(); } } />)';
      const EXPECTED = '({"extends":null,"type":"div","attributes":{"onClick":function(){return clickhandler();}},"children":null});';

      const CODE = transform(FIXTURE, { plugins: [ plugin ], compact: true}).code;

      assert.deepEqual(CODE.replace(BABEL_EXTEND, ''), EXPECTED);
    });

    it('transforms elements with arrow functions as attribute values', () => {
      let FIXTURE = '(<div onClick={ () => clickhandler() } />)';
      const EXPECTED = '({"extends":null,"type":"div","attributes":{"onClick":()=>clickhandler()},"children":null});';

      const CODE = transform(FIXTURE, { plugins: [ plugin ], compact: true}).code;

      assert.deepEqual(CODE.replace(BABEL_EXTEND, ''), EXPECTED);
    });
  });

  describe('ELEMENT WITH CHILDREN', () => {
    it('Single child', () => {
      const FIXTURE = '(<div><div></div></div>)';
      const EXPECTED = '({"extends":null,"type":"div","attributes":null,"children":[{"extends":null,"type":"div","attributes":null,"children":null}]});';

      const ASSERT = transform(FIXTURE, { plugins: [ plugin ], compact: true}).code;

      assert.deepEqual(ASSERT, EXPECTED);
    });

    it('Mutliple children', () => {
      const FIXTURE = '(<div><div></div><div></div><div></div></div>)';
      const EXPECTED = '({"extends":null,"type":"div","attributes":null,"children":[{"extends":null,"type":"div","attributes":null,"children":null},{"extends":null,"type":"div","attributes":null,"children":null},{"extends":null,"type":"div","attributes":null,"children":null}]});';

      const ASSERT = transform(FIXTURE, { plugins: [ plugin ], compact: true}).code;

      assert.deepEqual(ASSERT, EXPECTED);
    });

    it('Single self-closing child', () => {
      const FIXTURE = '(<div><br /></div>)';
      const EXPECTED = '({"extends":null,"type":"div","attributes":null,"children":[{"extends":null,"type":"br","attributes":null,"children":null}]});';

      const ASSERT = transform(FIXTURE, { plugins: [ plugin ], compact: true}).code;


      assert.deepEqual(ASSERT, EXPECTED);
    });

    it('Multiple self-closing children', () => {
      const FIXTURE = '(<div><br /><br /><br /></div>)';
      const EXPECTED = '({"extends":null,"type":"div","attributes":null,"children":[{"extends":null,"type":"br","attributes":null,"children":null},{"extends":null,"type":"br","attributes":null,"children":null},{"extends":null,"type":"br","attributes":null,"children":null}]});';

      const ASSERT = transform(FIXTURE, { plugins: [ plugin ], compact: true}).code;

      assert.deepEqual(ASSERT, EXPECTED);
    });

    it('Grand children', () => {
      const FIXTURE = '(<div><div><br /></div></div>)';
      const EXPECTED = '({"extends":null,"type":"div","attributes":null,"children":[{"extends":null,"type":"div","attributes":null,"children":[{"extends":null,"type":"br","attributes":null,"children":null}]}]});';

      const ASSERT = transform(FIXTURE, { plugins: [ plugin ], compact: true}).code;

      assert.deepEqual(ASSERT, EXPECTED);
    });

    it('Element with Text child', () => {
      const FIXTURE = '(<div>hello world</div>)';
      const EXPECTED = '({"extends":null,"type":"div","attributes":null,"children":["hello world"]});';

      const ASSERT = transform(FIXTURE, { plugins: [ plugin ], compact: true}).code;

      assert.deepEqual(ASSERT, EXPECTED);
    });

    it('Element with identifier as child', () => {
      const FIXTURE = '(<div>{foo}</div>)';
      const EXPECTED = '({"extends":null,"type":"div","attributes":null,"children":[foo]});';

      const ASSERT = transform(FIXTURE, { plugins: [ plugin ], compact: true}).code;

      assert.deepEqual(ASSERT, EXPECTED);
    });
  });

  describe('OPTIONS', () => {
    it('allows users to change the type option', () => {
      const FIXTURE = '(<div />)';
      const EXPECTED = '({"extends":null,"foo":"div","attributes":null,"children":null});';

      const ASSERT = transform( FIXTURE, { plugins: [ [plugin, { 'type': 'foo' } ] ], compact:true } ).code;

      assert.deepEqual(ASSERT, EXPECTED);
    });

    it('allows users to change the attributes option', () => {
      const OPTIONS = {attributes: 'args'};
      const FIXTURE = '(<div foo />)';
      const EXPECTED = '({"extends":null,"type":"div","args":{"foo":true},"children":null});';

      const ASSERT = transform(FIXTURE, { plugins: [ [ plugin, OPTIONS ] ], compact: true}).code;

      assert.deepEqual(ASSERT, EXPECTED);
    });

    it('allows users to change the children option', () => {
      const OPTIONS = {children: 'kids'};
      const FIXTURE = '(<div><section /></div>)';
      const EXPECTED = '({"extends":null,"type":"div","attributes":null,"kids":[{"extends":null,"type":"section","attributes":null,"kids":null}]});';

      const ASSERT = transform(FIXTURE, { plugins: [ [ plugin, OPTIONS ] ], compact: true}).code;

      assert.deepEqual(ASSERT, EXPECTED);
    });

    it('allows users to change the extends option', () => {
      const OPTIONS = {extends: 'extensionFrom'};
      const FIXTURE = '(<div><section /></div>)';
      const EXPECTED = '({"extensionFrom":null,"type":"div","attributes":null,"children":[{"extensionFrom":null,"type":"section","attributes":null,"children":null}]});';

      const ASSERT = transform(FIXTURE, { plugins: [ [ plugin, OPTIONS ] ], compact: true}).code;

      assert.deepEqual(ASSERT, EXPECTED);
    });

    it('allows users to change all or multiple options', () => {
      const OPTIONS = {
        extends: 'null',
        type: 'foo',
        attributes: 'args',
        children: 'kids'
      };
      const FIXTURE = '(<div />)';
      const EXPECTED = '({"null":null,"foo":"div","args":null,"kids":null});';

      const ASSERT = transform(FIXTURE, { plugins: [ [ plugin, OPTIONS ] ], compact: true}).code;

      assert.deepEqual(ASSERT, EXPECTED);
    });
  });

  describe('REFERENCE NODES', () => {
    it('Should support declared JSXElements', () => {
      const FIXTURE = 'const Foo = <div />; <Foo />;';
      const EXPECTED = 'const Foo={"extends":null,"type":"div","attributes":null,"children":null};({"extends":Foo,"type":null,"attributes":null,"children":null});';

      const ASSERT = transform( FIXTURE, { plugins: [ plugin ], compact:true } ).code;

      assert.deepEqual(ASSERT, EXPECTED);
    });

    it('Should support imported JSXElements', () => {
      const FIXTURE = 'import Foo from "foo"; <Foo />;';
      const EXPECTED = '({"extends":Foo,"type":null,"attributes":null,"children":null});';

      const ASSERT = transform( FIXTURE, { plugins: [ plugin ], compact:true } ).code;

      assert(ASSERT.includes(EXPECTED));
    });

    it('Should allow children to be declared', () => {
      const FIXTURE = 'import {Ul, Li} from "DOM"; <Ul><Li /></Ul>;';
      const EXPECTED = '({"extends":Ul,"type":null,"attributes":null,"children":[{"extends":Li,"type":null,"attributes":null,"children":null}]});';

      const ASSERT = transform( FIXTURE, { plugins: [ plugin ], compact:true } ).code;

      assert(ASSERT.includes(EXPECTED));
    });
  });
});
