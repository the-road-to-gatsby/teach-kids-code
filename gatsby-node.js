const path = require('path');

exports.createPages = ({ graphql, actions }) => {
  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            allContentfulToy {
              edges {
                node {
                  id
                  name
                  url
                  imgSrcOne
                  imgSrcTwo
                  categories
                  materials
                  minAge
                  maxAge
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          reject(result.errors);
        }

        const template = path.resolve(`src/templates/index.js`);

        const toys = result.data.allContentfulToy.edges.map(edge => edge.node);

        const categories = toys.reduce((result, { categories }) => {
          categories.forEach(category => {
            if (!result.map(v => v.key).includes(category)) {
              result.push({
                key: category,
                value: category,
                text: category,
              });
            }
          });

          return result;
        }, []);

        const materials = toys.reduce((result, { materials }) => {
          materials.forEach(material => {
            if (!result.map(v => v.key).includes(material)) {
              result.push({
                key: material,
                value: material,
                text: material,
              });
            }
          });

          return result;
        }, []);

        actions.createPage({
          path: `/`,
          component: template,
          context: {
            title: 'Teach Kids Code',
            description:
              'Teack Kids Code: STEM Toys to make your children curious about coding. Everything from physical toys to online classes to teach your kids code ...',
            keywords: [
              'teach kids code',
              'teach your kids to code',
              'how to teach coding kids',
              'coding games for kids',
              'computer coding for kids',
              'coding for beginners',
              'how to teach coding',
              'teaching kids to code',
            ],
            data: {
              toys,
              categories,
              materials,
              query: {
                category: null,
                material: null,
                age: null,
              },
            },
          },
        });
      })
    );
  });
};
