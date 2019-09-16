import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Card, CardHeader, CardBody, Form, FormLabel, FormInput } from 'elements';

const Login = ({ history, setUser }) => {
    const [formIsSubmitted, setFormIsSubmitted] = useState(false);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const signIn = async () => {
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
                    <FormLabel htmlFor='username'>Username:</FormLabel>
                    <FormInput
                        name='username'
                        type='text'
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />

                    <FormLabel htmlFor='password'>Password:</FormLabel>
                    <FormInput
                        name='password'
                        type='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />

                    <Button type='submit'>Sign In</Button>
                </Form>
            </CardBody>
        </Card>
    );
};

export default withRouter(Login);
