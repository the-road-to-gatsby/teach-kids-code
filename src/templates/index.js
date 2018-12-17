import React, { useState } from 'react';
import { Grid, Dropdown, Input, Card, Icon } from 'semantic-ui-react';
import sortBy from 'lodash.sortby';

import logo from '../images/logo.svg';
import Layout from '../components/layout';
import SEO from '../components/seo';

export default ({ pageContext }) => {
  const { toys, categories, materials, query } = pageContext.data;

  const [category, setCategory] = useState(query.category);
  const [material, setMaterial] = useState(query.material);
  const [age, setAge] = useState(query.age);

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
                value={age}
                onChange={(e, { value }) => setAge(value)}
                placeholder="Kid's Age"
                type="number"
              />
            </label>
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <Card.Group style={{ margin: '20px 0' }}>
        {sortBy(toys, toy => toy.minAge)
          .filter(toy => (category ? toy.categories.includes(category) : true))
          .filter(toy => (material ? toy.materials.includes(material) : true))
          .filter(toy => {
            if (!age) {
              return true;
            }

            if (toy.maxAge) {
              return toy.minAge <= age && toy.maxAge >= age;
            }

            return toy.minAge <= age;
          })
          .map(toy => (
            <Card key={toy.url}>
              <a href={toy.url} style={{ margin: '0 auto' }}>
                <img src={toy.imgSrcOne} border="0" alt={toy.name} />
                <img
                  src={toy.imgSrcTwo}
                  width="1"
                  height="1"
                  border="0"
                  alt={toy.name}
                />
              </a>
              <Card.Content>
                <Card.Header>
                  <a href={toy.url}>{toy.name}</a>
                </Card.Header>
                <Card.Meta>
                  <span>{toy.comment}</span>
                </Card.Meta>
              </Card.Content>
              <Card.Content extra>
                <Icon name="user" />
                {toy.maxAge ? (
                  <span>
                    From {toy.minAge} to {toy.maxAge} years old.
                  </span>
                ) : (
                  <span>From {toy.minAge}+ years old.</span>
                )}
              </Card.Content>
              <Card.Content extra>
                <Icon name="money" />
                {toy.priceDecimal}
              </Card.Content>
              <Card.Content extra>
                <Icon name="game" />
                {toy.categories.map(v => v.toUpperCase()).join(', ')}
              </Card.Content>
              <Card.Content extra>
                <Icon name="tree" />
                {toy.materials.map(v => v.toUpperCase()).join(', ')}
              </Card.Content>
            </Card>
          ))}
      </Card.Group>

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
