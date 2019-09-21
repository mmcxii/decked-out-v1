//* Packages
import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';

//* Hooks
import { useForm } from 'hooks';

//* Elements
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    CardError,
    CardSuccess,
    Form,
    FormGroupWithIcon,
    FormInput,
    FormLabel,
} from 'elements';

const ResetPassword = ({ history }) => {
    const [values, handleChange] = useForm({
        username: '',
        secretQuestion: '',
        newPassword: '',
        newPassword_confirm: '',
    });
    const [resetWasSuccessful, setResetWasSuccessful] = useState(false);
    const [errors, setErrors] = useState({
        userMadeError: false,
        passwordsDoNotMatch: false,
        secretIsIncorrect: false,
        userDoesNotExist: false,
    });
    const errorMessage = errors.passwordsDoNotMatch
        ? 'Passwords must match'
        : errors.secretIsIncorrect
        ? 'Secret Answer is incorrect'
        : errors.userDoesNotExist
        ? 'User does not exist in database'
        : 'Unknown error';
    const [formIsSubmitted, setFormIsSubmitted] = useState(false);

    useEffect(() => {
        const resetPassword = async () => {
            const { username, secretQuestion, newPassword } = values;

            try {
                const res = await fetch('/api/changepass', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                    body: JSON.stringify({ username, secretQuestion, newPassword }),
                });

                const data = await res.json();

                if (data.message === "User doesn't exist") {
                    setErrors({
                        userMadeError: true,
                        secretIsIncorrect: false,
                        userDoesNotExist: true,
                        passwordsDoNotMatch: false,
                    });
                    return setFormIsSubmitted(false);
                } else if (data.message === 'Secret was Incorrect') {
                    setErrors({
                        userMadeError: true,
                        secretIsIncorrect: true,
                        userDoesNotExist: false,
                        passwordsDoNotMatch: false,
                    });
                    return setFormIsSubmitted(false);
                }

                setErrors({
                    userMadeError: false,
                    secretIsIncorrect: false,
                    userDoesNotExist: false,
                    passwordsDoNotMatch: false,
                });

                setTimeout(() => {
                    history.push('/account');
                }, 2500);

                return setResetWasSuccessful(true);
            } catch (e) {
                console.log(e);
            }
        };

        if (formIsSubmitted) {
            resetPassword();
        }
    }, [formIsSubmitted]);

    return (
        <Card>
            <CardHeader as='h2'>Reset Password</CardHeader>
            <CardBody>
                {errors.userMadeError && (
                    <CardError>
                        <CardHeader>Error</CardHeader>
                        <CardBody>Error: {errorMessage}.</CardBody>
                    </CardError>
                )}

                {resetWasSuccessful && (
                    <CardSuccess>
                        <CardHeader>Reset Successful</CardHeader>
                        <CardBody>
                            <p>
                                Password for <strong>{values.username}</strong> was successfully reset!
                            </p>
                            <p>
                                You should be redirected in a few moments. If you aren't,
                                <Link to='/account'> click here</Link>
                            </p>
                        </CardBody>
                    </CardSuccess>
                )}

                <Form
                    onSubmit={e => {
                        e.preventDefault();

                        if (values.newPassword === values.newPassword_confirm) {
                            setFormIsSubmitted(true);
                        } else {
                            setErrors({
                                userMadeError: true,
                                secretIsIncorrect: false,
                                userDoesNotExist: false,
                                passwordsDoNotMatch: true,
                            });
                        }
                    }}
                >
                    <FormGroupWithIcon>
                        <FormLabel htmlFor='username'>Username</FormLabel>
                        <FormInput
                            name='username'
                            type='text'
                            required
                            placeholder='Enter your username'
                            value={values.username}
                            onChange={handleChange}
                        />
                        <i className='fad fa-user' />
                    </FormGroupWithIcon>

                    <FormGroupWithIcon>
                        <FormLabel htmlFor='secretQuestion'>
                            Favorite Card <br /> <small>It's case sensitive!</small>
                        </FormLabel>
                        <FormInput
                            name='secretQuestion'
                            type='text'
                            required
                            placeholder='What is your favorite Magic Card?'
                            value={values.secretQuestion}
                            onChange={handleChange}
                        />
                        <i className='fad fa-hat-witch' />
                    </FormGroupWithIcon>

                    <FormGroupWithIcon>
                        <FormLabel htmlFor='newPassword'>New Password</FormLabel>
                        <FormInput
                            name='newPassword'
                            type='password'
                            required
                            placeholder='Enter new password'
                            value={values.newPassword}
                            onChange={handleChange}
                        />
                        <i className='fad fa-lock-alt' />
                    </FormGroupWithIcon>

                    <FormGroupWithIcon>
                        <FormLabel htmlFor='newPassword_confirm'>Confirm Password</FormLabel>
                        <FormInput
                            name='newPassword_confirm'
                            type='password'
                            required
                            placeholder='Reenter your new password'
                            value={values.newPassword_confirm}
                            onChange={handleChange}
                        />
                        <i className='fad fa-lock-alt' />
                    </FormGroupWithIcon>

                    <Button type='submit'>Reset Password</Button>
                </Form>
            </CardBody>
        </Card>
    );
};

export default withRouter(ResetPassword);
