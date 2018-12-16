import React, { useState } from 'react';
import { Table, Grid, Dropdown, Input } from 'semantic-ui-react';
import sortBy from 'lodash.sortby';

import logo from '../images/logo.svg';
import Layout from '../components/layout';
import SEO from '../components/seo';

export default ({ pageContext }) => {
  const { toys, categories, materials, query } = pageContext.data;

  const [category, setCategory] = useState(query.category);
  const [material, setMaterial] = useState(query.material);
  const [age, setAge] = useState(query.age);
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
                ageSorted === 'ascending' ? toy.minAge : toy.minAge * -1
              )
            : toys
          )
            .filter(toy =>
              category ? toy.categories.includes(category) : true
            )
            .filter(toy => (material ? toy.materials.includes(material) : true))
            .filter(toy => (age ? toy.minAge < age && toy.maxAge > age : true))
            .map(toy => (
              <Table.Row key={toy.url}>
                <Table.Cell>
                  <a href={toy.url}>
                    <img src={toy.imgSrcOne} border="0" alt={toy.name} />
                    <img
                      src={toy.imgSrcTwo}
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
                  {toy.minAge} - {toy.maxAge}
                </Table.Cell>
                <Table.Cell>{toy.comment}</Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>

      <SubmitToy />

      <small>
        We are a participant in the Amazon Services LLC Associates Program, an
        affiliate advertising program designed to provide a means for us to earn
        fees by linking to Amazon.com and affiliated sites.
      </small>
    </Layout>
  );
};

const SubmitToy = () => (
  <p>
    Did you find a toy that teaches kids to code but couldn't find it on this
    website? <a href="mailto:teachkids2code@gmail.com">Submit a Toy!</a>
  </p>
);

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
