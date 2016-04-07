export default function ({types: t}) {
  const generateElement = (path, file) => {
    if (/JSXText/.test(path.type)) return t.StringLiteral(path.value);

    const OPENING_ELEMENT = path.node ? path.node.openingElement : path.openingElement,
    CHILDREN = path.node ? path.node.children : path.children,
    ELEMENT_ATTRIBUTES = OPENING_ELEMENT.attributes;

    let elementName = t.StringLiteral(OPENING_ELEMENT.name.name),
    attributes = ELEMENT_ATTRIBUTES.length ? buildAttributeObject(ELEMENT_ATTRIBUTES, file) : t.NullLiteral(),
    children = CHILDREN.length ? t.ArrayExpression(CHILDREN.map(child => generateElement(child, file))) : t.NullLiteral();

    return t.ObjectExpression([
      t.ObjectProperty(t.StringLiteral('elementName'), elementName),
      t.ObjectProperty(t.StringLiteral('attributes'), attributes),
      t.ObjectProperty(t.StringLiteral('children'), children)
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

      attrObject = t.callExpression(
        file.addHelper('extends'),
        extension
      );
    } else {
      attrObject = attrObject[0];
    }

    return attrObject;
  };

  return {
    inherits: require('babel-plugin-syntax-jsx'),
    visitor: {
      JSXElement: function(path, file) {
        path.replaceWith(
          generateElement(path, file)
        );
      }
    }
  };
}
