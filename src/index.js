export default function ({types: t}) {
  const generateElement = (path, state) => {
    const FILE = state.file,
    OPTIONS = Object.assign({}, {type: 'type', 'extends': 'extends', attributes: 'attributes', children: 'children'}, state.opts);

    const NODE = path.node;

    if (!/JSXElement/.test(NODE.type)) return NODE.expression ? NODE.expression : t.StringLiteral(NODE.value);

    const OPENING_ELEMENT = NODE.openingElement,
    CHILDREN = path.get('children'),
    ELEMENT_ATTRIBUTES = OPENING_ELEMENT.attributes,
    EXTENDS = isExtension(OPENING_ELEMENT, path);

    let type = t.StringLiteral(OPENING_ELEMENT.name.name),
    attributes = ELEMENT_ATTRIBUTES.length ? buildAttributeObject(ELEMENT_ATTRIBUTES, FILE) : t.NullLiteral(),
    children = CHILDREN.length ? t.ArrayExpression(CHILDREN.map(child => generateElement(child, state))) : t.NullLiteral();

    return t.ObjectExpression([
      t.ObjectProperty(t.StringLiteral(OPTIONS.extends), EXTENDS ? t.Identifier(OPENING_ELEMENT.name.name) : t.NullLiteral()),
      t.ObjectProperty(t.StringLiteral(OPTIONS.type), EXTENDS ? t.NullLiteral() : type),
      t.ObjectProperty(t.StringLiteral(OPTIONS.attributes), attributes),
      t.ObjectProperty(t.StringLiteral(OPTIONS.children), children)
    ]);
  };

  const generateAttrObject = (nodes) => {
    let arr = nodes.map(node => {
      let name = t.StringLiteral(node.name.name);
      let value = (
        !node.value ? t.BooleanLiteral(true) :
        /JSXExpressionContainer/i.test(node.value.type) ? node.value.expression :
        node.value
      );

      return t.ObjectProperty(name, value);
    });

    return [t.ObjectExpression(arr)];
  };

  const buildAttributeObject = function(attrs, file) {
    let _expressions = [],
    _spreads = [];

    while (attrs.length) {
      let attr = attrs.shift();

      /^JSXSpreadAttribute$/i.test(attr.type) ? _spreads.push(attr.argument) : _expressions.push(attr);
    }

    let attrObject = _expressions.length ? generateAttrObject(_expressions) : null;

    if (_spreads.length) {
      let extension = attrObject ? _spreads.concat(attrObject) : _spreads;

      if (extension.length > 1) extension.unshift(t.ObjectExpression([]));

      attrObject = t.callExpression(
        file.addHelper('extends'),
        extension
      );
    } else {
      attrObject = attrObject[0];
    }

    return attrObject;
  };

  const isExtension = (openingElement, path) => path.scope.hasBinding(openingElement.name.name);

  return {
    inherits: require('babel-plugin-syntax-jsx'),
    visitor: {
      JSXElement: function(path, state) {
        path.replaceWith(
          generateElement(path, state)
        );
      }
    }
  };
}
