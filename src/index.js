export default function ({types: t}) {
  const generateElement = (path, file) => {
    const OPENING_ELEMENT = path.node ? path.node.openingElement : path.openingElement,
    CHILDREN = path.node ? path.node.children : path.children,
    ELEMENT_ATTRIBUTES = OPENING_ELEMENT.attributes,
    elementName = t.StringLiteral(OPENING_ELEMENT.name.name),
    attributes = ELEMENT_ATTRIBUTES.length ? buildAttributeObject(ELEMENT_ATTRIBUTES, file) : t.NullLiteral(),
    children = CHILDREN.length ? t.ArrayExpression(CHILDREN.map(child => generateElement(child, file))) : t.NullLiteral();

    return t.ObjectExpression([
      t.ObjectProperty(t.StringLiteral('elementName'), elementName),
      t.ObjectProperty(t.StringLiteral('attributes'), attributes),
      t.ObjectProperty(t.StringLiteral('children'), children)
    ]);
  };

  const buildAttributeObject = function(attrs, file) {
    let _identifiers = [],
    _objects = [];

    return t.ArrayExpression([]);
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
