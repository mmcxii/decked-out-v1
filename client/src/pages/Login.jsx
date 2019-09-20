//* Packages
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';

//* Hooks
import { useForm } from 'hooks';

//* Elements
import {
  Button,
  ButtonGroup,
  ButtonLink,
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroupWithIcon,
  FormInput,
  FormLabel
} from 'elements';

const Login = ({ history, location, setUser }) => {
  const [formIsSubmitted, setFormIsSubmitted] = useState(false);
  const [userMadeError, setUserMadeError] = useState(false);
  const [values, handleChange] = useForm({ username: '', password: '' });

  useEffect(() => {
    const signIn = async () => {
      const { username, password } = values;
      const { from } = location.state || { from: null };

      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (res.status === 200) {
        setUser({ username });

        // If the user attempted to access a protected route
        // redirect them after they sign in
        if (from) {
          return history.push(from);
        }

        // If the use clicked the sign in button
        // return them to the page they were on
        return history.goBack();
      } else {
        setUserMadeError(true);
      }
    };

    if (formIsSubmitted) {
      signIn();
    }
  }, [formIsSubmitted]);

  return (
    <Card>
      <CardHeader>Please Sign in to Access Decked Out</CardHeader>
      <CardBody>
        {userMadeError && (
          <p>Oops! Either your username or password was incorrect!</p>
        )}
        <Form
          onSubmit={e => {
            e.preventDefault();

            setFormIsSubmitted(true);
          }}
        >
          <FormGroupWithIcon>
            <FormLabel htmlFor='username'>Username</FormLabel>
            <FormInput
              name='username'
              type='text'
              required
              value={values.username}
              onChange={handleChange}
            />
            <i className='fad fa-user' />
          </FormGroupWithIcon>

          <FormGroupWithIcon>
            <FormLabel htmlFor='password'>Password</FormLabel>
            <FormInput
              name='password'
              type='password'
              required
              value={values.password}
              onChange={handleChange}
            />
            <i className='fad fa-lock-alt' />
          </FormGroupWithIcon>

          <ButtonGroup>
            <Button type='submit'>Sign In</Button>
            <ButtonLink to='createuser'>Create Account</ButtonLink>
          </ButtonGroup>
        </Form>
      </CardBody>
    </Card>
  );
};

export default withRouter(Login);
