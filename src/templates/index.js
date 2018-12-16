import React, { useState } from 'react';
import { Table, Grid, Dropdown, Input } from 'semantic-ui-react';
import sortBy from 'lodash.sortby';

import logo from '../images/logo.svg';
import Layout from '../components/layout';
import SEO from '../components/seo';

// google.client
//   .init({
//     apiKey: process.env.GATSBY_GOOGLE_SHEETS_API_KEY,
//     clientId: process.env.GATSBY_GOOGLE_SHEETS_CLIENT_ID,
//     discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
//     scope: 'https://www.googleapis.com/auth/spreadsheets.readonly',
//   })
//   .then(
//     function() {
//       // Listen for sign-in state changes.
//       // gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
//       // Handle the initial sign-in state.
//       // updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
//     },
//     function(error) {
//       console.log(error);
//     }
//   );

// function listMajors() {
//   gapi.client.sheets.spreadsheets.values
//     .get({
//       spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
//       range: 'Class Data!A2:E',
//     })
//     .then(
//       function(response) {
//         var range = response.result;
//         if (range.values.length > 0) {
//           appendPre('Name, Major:');
//           for (i = 0; i < range.values.length; i++) {
//             var row = range.values[i];
//             // Print columns A and E, which correspond to indices 0 and 4.
//             appendPre(row[0] + ', ' + row[4]);
//           }
//         } else {
//           appendPre('No data found.');
//         }
//       },
//       function(response) {
//         appendPre('Error: ' + response.result.error.message);
//       }
//     );
// }

const toys = [
  {
    name: 'Dash Robot',
    url: 'https://amzn.to/2rB6UzY',
    categories: ['Robot'],
    materials: ['Plastic'],
    age: { min: 6, max: 99 },
    gender: null,
    comment: '',
    photo: {
      srcOne:
        '//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B00SKURVKY&Format=_SL160_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=rwieruch-20&language=en_US',
      srcTwo:
        'https://ir-na.amazon-adsystem.com/e/ir?t=rwieruch-20&language=en_US&l=li2&o=1&a=B00SKURVKY',
    },
  },
  {
    name: 'Think and Learn Code-a-pillar toy',
    url: 'https://amzn.to/2EmbpWK',
    categories: ['Robot'],
    materials: ['Plastic'],
    age: { min: 3, max: 6 },
    gender: null,
    comment: '',
    photo: {
      srcOne:
        '//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B01ASVD2L4&Format=_SL160_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=rwieruch-20&language=en_US',
      srcTwo:
        'https://ir-na.amazon-adsystem.com/e/ir?t=rwieruch-20&language=en_US&l=li2&o=1&a=B01ASVD2L4',
    },
  },
  {
    name:
      'LEGO Boost Creative Toolbox 17101 Fun Robot Building Set and Educational Coding Kit for Kids',
    url: 'https://amzn.to/2Enb0TV',
    categories: ['Robot', 'Interactive Kit'],
    materials: ['Lego'],
    age: { min: 7, max: 12 },
    gender: null,
    comment: '',
    photo: {
      srcOne:
        '//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B072MK1PDV&Format=_SL100_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=rwieruch-20&language=en_US',
      srcTwo:
        'https://ir-na.amazon-adsystem.com/e/ir?t=rwieruch-20&language=en_US&l=li2&o=1&a=B072MK1PDV',
    },
  },
];

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

export default ({ pageContext }) => {
  const [category, setCategory] = useState(null);
  const [material, setMaterial] = useState(null);
  const [age, setAge] = useState(null);
  const [ageSorted, setAgeSorted] = useState(null);

  const handleAgeSort = () => {
    if (!ageSorted) {
      setAgeSorted('ascending');
    }

    if (ageSorted === 'ascending') {
      setAgeSorted('descending');
    }

    if (ageSorted === 'descending') {
      setAgeSorted(null);
    }
  };

  return (
    <Layout>
      <SEO
        title={pageContext.title}
        description={pageContext.description}
        keywords={pageContext.keywords}
      />

      <div style={{ marginTop: '50px', marginBottom: '30px' }}>
        <img src={logo} alt="teach kids code logo" width="400" />
      </div>

      <Grid divided columns="3">
        <Grid.Row stretched>
          <Filter
            label="Category"
            placeholder="Toy's Category"
            value={category}
            options={[{ key: 'All', value: null, text: 'All' }].concat(
              categories
            )}
            onChange={(e, { value }) => setCategory(value)}
          />
          <Filter
            label="Material"
            placeholder="Toy's Material"
            value={material}
            options={[{ key: 'All', value: null, text: 'All' }].concat(
              materials
            )}
            onChange={(e, { value }) => setMaterial(value)}
          />

          <Grid.Column>
            <label>
              <div>Age</div>
              <Input
                onChange={(e, { value }) => setAge(value)}
                placeholder="Kid's Age"
                type="number"
              />
            </label>
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <Table sortable basic="very">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell singleLine />
            <Table.HeaderCell singleLine>Name</Table.HeaderCell>
            <Table.HeaderCell singleLine>Category</Table.HeaderCell>
            <Table.HeaderCell singleLine>Material</Table.HeaderCell>
            <Table.HeaderCell
              singleLine
              sorted={ageSorted}
              onClick={handleAgeSort}
            >
              Age
            </Table.HeaderCell>
            <Table.HeaderCell singleLine>Comment</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {(ageSorted
            ? sortBy(toys, toy =>
                ageSorted === 'ascending' ? toy.age.min : toy.age.min * -1
              )
            : toys
          )
            .filter(toy =>
              category ? toy.categories.includes(category) : true
            )
            .filter(toy => (material ? toy.materials.includes(material) : true))
            .filter(toy =>
              age ? toy.age.min < age && toy.age.max > age : true
            )
            .map(toy => (
              <Table.Row key={toy.url}>
                <Table.Cell>
                  <a href={toy.url}>
                    <img src={toy.photo.srcOne} border="0" alt={toy.name} />
                    <img
                      src={toy.photo.srcTwo}
                      width="1"
                      height="1"
                      border="0"
                      alt={toy.name}
                    />
                  </a>
                </Table.Cell>
                <Table.Cell>
                  <a href={toy.url}>{toy.name}</a>
                </Table.Cell>
                <Table.Cell singleLine>
                  {toy.categories.map(v => v.toUpperCase()).join(', ')}
                </Table.Cell>
                <Table.Cell singleLine>
                  {toy.materials.map(v => v.toUpperCase()).join(', ')}
                </Table.Cell>
                <Table.Cell singleLine>
                  {toy.age.min} - {toy.age.max}
                </Table.Cell>
                <Table.Cell>{toy.comment}</Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>

      <p>
        Did you find a toy that teaches kids to code but couldn't find it on
        this website?{' '}
        <a href="mailto:teachkids2code@gmail.com">Submit a Toy!</a>
      </p>

      <small>
        We are a participant in the Amazon Services LLC Associates Program, an
        affiliate advertising program designed to provide a means for us to earn
        fees by linking to Amazon.com and affiliated sites.
      </small>
    </Layout>
  );
};

const Filter = ({ label, placeholder, value, options, onChange }) => (
  <Grid.Column>
    <label htmlFor={label}>
      {label}
      <Dropdown
        id={label}
        placeholder={placeholder}
        value={value}
        options={options}
        onChange={onChange}
        fluid
        search
        selection
      />
    </label>
  </Grid.Column>
);
