import React, { useState } from 'react';
import { Button, Icon, Form } from 'semantic-ui-react';
import axios from 'axios';

const REVUE_BASE_URL = 'https://www.getrevue.co/api/v2/';
const REVUE_SUBSCRIBERS_PATH = 'subscribers';

const invite = (name, email) =>
  axios.post(
    `${REVUE_BASE_URL}${REVUE_SUBSCRIBERS_PATH}`,
    {
      email,
      first_name: name,
      double_opt_in: false,
    },
    {
      headers: {
        Authorization: `Token token="${process.env.GATSBY_REVUE_TOKEN}"`,
      },
    }
  );

const Newsletter = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const onSubscribe = event => {
    invite(name, email);

    setName('');
    setEmail('');

    event.preventDefault();
  };

  return (
    <div
      style={{
        marginTop: '40px',
        backgroundColor: '#222222',
        color: '#ffffff',
        padding: '40px',
      }}
    >
      <p>Get always the newest toys to teach your kids code in your inbox.</p>

      <Form onSubmit={onSubscribe}>
        <Form.Field>
          <Form.Input iconPosition="left" placeholder="Name">
            <Icon name="user" />
            <input
              value={name}
              onChange={event => setName(event.target.value)}
            />
          </Form.Input>
        </Form.Field>
        <Form.Field>
          <Form.Input iconPosition="left" placeholder="Email">
            <Icon name="at" />
            <input
              value={email}
              onChange={event => setEmail(event.target.value)}
            />
          </Form.Input>
        </Form.Field>
        <Button type="submit" inverted color="violet">
          Subscribe
        </Button>
      </Form>
    </div>
  );
};

export default Newsletter;
