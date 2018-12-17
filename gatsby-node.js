const path = require('path');

const KEYWORDS = [
  'teach kids code',
  'teach your kids to code',
  'how to teach coding kids',
  'coding games for kids',
  'computer coding for kids',
  'coding for beginners',
  'how to teach coding',
  'teaching kids to code',
];

const createPagesMain = (actions, template, toys, categories, materials) => {
  actions.createPage({
    path: `/`,
    component: template,
    context: {
      keywords: [...KEYWORDS],
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
};

const createPagesCategory = (
  actions,
  template,
  toys,
  categories,
  materials
) => {
  categories.forEach(({ value }) => {
    actions.createPage({
      path: `/teach-kids-code-with-${value.replace(/\s/g, '-').toLowerCase()}`,
      component: template,
      context: {
        keywords: [`teach kids code with ${value.toLowerCase()}`, ...KEYWORDS],
        data: {
          toys,
          categories,
          materials,
          query: {
            category: value,
            material: null,
            age: null,
          },
        },
      },
    });
  });
};

const createPagesMaterial = (
  actions,
  template,
  toys,
  categories,
  materials
) => {
  materials.forEach(({ value }) => {
    actions.createPage({
      path: `/teach-kids-code-with-toys-made-from-${value
        .replace(/\s/g, '-')
        .toLowerCase()}`,
      component: template,
      context: {
        keywords: [
          `teach kids code with toys made from ${value.toLowerCase()}`,
          ...KEYWORDS,
        ],
        data: {
          toys,
          categories,
          materials,
          query: {
            category: null,
            material: value,
            age: null,
          },
        },
      },
    });
  });
};

const createPagesAge = (actions, template, toys, categories, materials) => {
  new Array(22)
    .fill(0)
    .map((v, i) => v + i)
    .forEach(value => {
      actions.createPage({
        path: `/teach-kids-code-from-age-${value}-years`,
        component: template,
        context: {
          keywords: [`teach kids code from age ${value} years`, ...KEYWORDS],
          data: {
            toys,
            categories,
            materials,
            query: {
              category: null,
              material: null,
              age: value,
            },
          },
        },
      });
    });
};

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
                  priceDecimal
                  comment
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

        createPagesMain(actions, template, toys, categories, materials);
        createPagesCategory(actions, template, toys, categories, materials);
        createPagesMaterial(actions, template, toys, categories, materials);
        createPagesAge(actions, template, toys, categories, materials);
      })
    );
  });
};
