import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';

import { useForm } from 'hooks';
import { Button, Card, CardHeader, CardBody, Form, FormGroupWithIcon, FormInput, FormLabel } from 'elements';

const Login = ({ history, setUser }) => {
    const [formIsSubmitted, setFormIsSubmitted] = useState(false);

    const [values, handleChange] = useForm({ username: '', password: '' });

    useEffect(() => {
        const signIn = async () => {
            const { username, password } = values;

            const res = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (res.status === 200) {
                setUser({ username });
                history.push('/account');
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
                            value={values.username}
                            onChange={handleChange}
                        />
                        <i className='fad fa-user'></i>
                    </FormGroupWithIcon>

                    <FormGroupWithIcon>
                        <FormLabel htmlFor='password'>Password</FormLabel>
                        <FormInput
                            name='password'
                            type='password'
                            value={values.password}
                            onChange={handleChange}
                        />
                        <i className='fad fa-lock-alt'></i>
                    </FormGroupWithIcon>

                    <Button type='submit'>Sign In</Button>
                </Form>
            </CardBody>
        </Card>
    );
};

export default withRouter(Login);
