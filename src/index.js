export default function ({types: t}) {
  const generateElement = (path) => {
    const OPENING_ELEMENT = path.get('openingElement'),
    elementName = OPENING_ELEMENT.node.name.name,
    attributes = OPENING_ELEMENT.get('attributes').map((attr) => {
      return t.ObjectProperty(
        t.StringLiteral(attr.get('name').node.name),
        (attr.node.value === null ? t.BooleanLiteral(true) : attr.get('value'))
      );
    });

    return t.ObjectExpression([
      t.ObjectProperty(t.StringLiteral('elementName'), t.StringLiteral(elementName)),
      t.ObjectProperty(t.StringLiteral('attributes'), t.ObjectExpression(attributes))
    ]);
  };

  return {
    inherits: require('babel-plugin-syntax-jsx'),
    visitor: {
      JSXElement: function(path) {
        console.log('ELEMENT'); //eslint-disable-line
        path.replaceWith(
          generateElement(path)
        );
        console.log(); //eslint-disable-line
        // console.log(this);
        // let type = path.get('openingElement').get('name').node.name;
        // let children = path.get('children').map(() => {
        //   return 'kid';
        // });
        // let attributes = path.get('openingElement').get('attributes').map(() => {
        //   return 'attribute';
        // });

        // console.log(type);
        // console.log(children);
        // console.log(attributes);
      }
    }
  };
}

// export default function ({types: t}) {
//   const ELEMENT_PRAGMA = {
//     type: String,
//     attributes: Object,
//     children: Array
//   };

//   const updateElement = {
//     JSXElement: function (path) {
//       console.log('oh, hello');
//     }
//     // JSXOpeningElement: function(path) {
//       // console.log('OPENING ELEMENT SCOPE')
//       // console.log(path.scope.parent)
//     // },
//     // JSXClosingElement: function() { /*console.log('closing');*/ },
//     // JSXText: function() { /*console.log('TEXT'); */ },
//     // JSXAttribute: function() { /*console.log('ATTR'); */},
//   };

//   return {
//     inherits: require('babel-plugin-syntax-jsx'),
//     visitor: {
//       JSXElement: function(path) {
//         console.log('ELEMENT');
//         let ar = path.get('children').map(() => {
//           return 'foo'
//         });

//         console.log(ar);
//         // console.log(path.scope.parent);
//         // path.traverse(updateElement);
//         /*console.log("AFTER ALL"); */
//       }
//     }
//   }
// }
