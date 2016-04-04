export default function ({types: t}) {
  const generateElement = (path) => {
    const OPENING_ELEMENT = path.get('openingElement'),
    elementName = t.StringLiteral(OPENING_ELEMENT.node.name.name),
    attributes = t.ObjectExpression(OPENING_ELEMENT.get('attributes').map((attr) => {
      let attrValue = (
        attr.node.value === null ? t.BooleanLiteral(true) : attr.node.value
      );

      if (/JSXExpressionContainer/.test(attrValue.type)) attrValue = attrValue.expression;

      return t.ObjectProperty(
        t.StringLiteral(attr.get('name').node.name),
        attrValue
      );
    })),
    children = t.ArrayExpression(path.get('children').map(() => {
      return t.StringLiteral('foo');
    }));

    return t.ObjectExpression([
      t.ObjectProperty(t.StringLiteral('elementName'), elementName),
      t.ObjectProperty(t.StringLiteral('attributes'), attributes),
      t.ObjectProperty(t.StringLiteral('children'), children)
    ]);
  };

  return {
    inherits: require('babel-plugin-syntax-jsx'),
    visitor: {
      JSXElement: function(path) {
        path.replaceWith(
          generateElement(path)
        );
      }
    }
  };
}
