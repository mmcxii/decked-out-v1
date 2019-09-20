//* Packages
import React, { useEffect, useState } from 'react';
import { withRouter, Link } from 'react-router-dom';

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
    CardError,
    Form,
    FormGroupWithIcon,
    FormInput,
    FormLabel,
} from 'elements';

const Login = ({ history, location, setUser }) => {
    const [formIsSubmitted, setFormIsSubmitted] = useState(false);
    const [userMadeError, setUserMadeError] = useState(false);
    const [values, handleChange] = useForm({ username: '', password: '' });

    const errorMessages = [
        'You know a lot of people who play White Weenies get this question wrong...',
        'You were probably just thinking about how much skill it takes to say "draw, go."',
        "Sorry, you can't pay life to make this one any easier.",
        'Try again! You probably play Red Deck Wins though so just keep at it.',
        'Hurr durr big creatures. Yeah we get it, try again though.',
    ];
    const errorMessage = errorMessages[Math.floor(Math.random() * errorMessages.length)];

    useEffect(() => {
        const signIn = async () => {
            const { username, password } = values;
            const { from } = location.state || { from: null };

            const res = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            // Catches if username or password is incorrect
            if (res.redirected) {
                setFormIsSubmitted(false);

                return setUserMadeError(true);
            }

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
                    <CardError>
                        <CardHeader as='h4'>Error: Username or Password was incorrect</CardHeader>
                        <CardBody>
                            <p>{errorMessage}</p>
                            <p><Link to='/reset'>Reset Password?</Link></p>
                        </CardBody>
                    </CardError>
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
