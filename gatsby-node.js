const path = require('path');

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  const template = path.resolve(`src/templates/index.js`);
  createPage({
    path: `/`,
    component: template,
    context: {
      title: 'Teach Kids Code',
      description: 'Toys by age to teach your children and kids to code ...',
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
    },
  });
};
