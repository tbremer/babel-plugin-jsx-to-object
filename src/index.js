export default function ({types: t}) {
  const generateElement = (path, file) => {
    const OPENING_ELEMENT = path.get('openingElement'),
    elementName = t.StringLiteral(OPENING_ELEMENT.node.name.name),
    /**
     * MAPPING MIGHT HAVE TO GO AWAY TO SUPPORT JSX SPREAD ATTRIBUTES
     * @url https://github.com/babel/babel/blob/master/packages/babel-helper-builder-react-jsx/src/index.js#L118
     */
    attributes = t.ObjectExpression(OPENING_ELEMENT.get('attributes').map((attr) => {
      let attrValue = (
        attr.node.value === null ? t.BooleanLiteral(true) : attr.node.value
      );

      if (attrValue && /JSXExpressionContainer/.test(attrValue.type)) attrValue = attrValue.expression;

      if (!attrValue) {
        attrValue = t.callExpression(file.addHelper('extends'), objs);
      }

      return t.ObjectProperty(
        t.StringLiteral(attr.get('name').node.name),
        attrValue
      );
    })),
    children = t.ArrayExpression(path.get('children').map(child => generateElement(child)));

    return t.ObjectExpression([
      t.ObjectProperty(t.StringLiteral('elementName'), elementName),
      t.ObjectProperty(t.StringLiteral('attributes'), attributes),
      t.ObjectProperty(t.StringLiteral('children'), children)
    ]);
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
