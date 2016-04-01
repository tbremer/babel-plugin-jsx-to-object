export default function ({types: t}) {
  return {
    inherits: require('babel-plugin-syntax-jsx'),
    visitor: {
      JSXElement: function(path) {
        console.log('ELEMENT');
        let type = path.get('openingElement').get('name').node.name;
        // let children = path.get('children').map(() => {
        //   return 'kid';
        // });
        let attributes = path.get('openingElement').get('attributes').map(() => {
          return 'attribute';
        })

        console.log(type);
        // console.log(children);
        console.log(attributes);
      }
    }
  }
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
