//* Packages
import React, { useEffect, useState } from 'react';

//* Hooks
import { useForm } from 'hooks';

//* Elements
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    CardError,
    Form,
    FormGroupWithIcon,
    FormInput,
    FormLabel,
} from 'elements';

const ResetPassword = () => {
    const [values, handleChange] = useForm({ username: '', secret: '', password: '', password_confirm:'' });
    const [formIsSubmitted, setFormIsSubmitted] = useState(false);
    const [userMadeError, setUserMadeError] = useState(false);

    useEffect(()=> {
        const resetPassword = async () => {
            const { username, secretQuestion, newPassword } = values;

            const res = await fetch('/api/changepass', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: { username, secretQuestion, newPassword }
            })
        }

        if (formIsSubmitted) {
            resetPassword();
        }
    },[formIsSubmitted])

    return (
        <Card>
            <CardHeader as='h2'>Reset Password</CardHeader>
            <CardBody>
                <Form onSubmit={e => {
                    e.preventDefault();

                    if (values.password === values.password_confirm) {
                        setFormIsSubmitted(true);
                    } else {
                        setUserMadeError(true);
                    }
                }}>
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
                        <FormLabel htmlFor='secret'>Favorite Card</FormLabel>
                        <FormInput name='secretQuestion' type='text' required placeholder='What is your favorite Magic Card?' value={values.secret} onChange={handleChange} />
                        <i className='fad fa-hat-witch' />
                    </FormGroupWithIcon>
                    
                    <FormGroupWithIcon>
                        <FormLabel htmlFor='password'>New Password</FormLabel>    
                        <FormInput name='newPassword' type='password' required placeholder='Enter new password' value={values.password} onChange={handleChange} />
                        <i className='fad fa-lock-alt' />
                    </FormGroupWithIcon>

                    <FormGroupWithIcon>
                        <FormLabel htmlFor='password_confirm'>Confirm Password</FormLabel>    
                        <FormInput name='password_confirm' type='password' required placeholder='Reenter your new password' value={values.password_confirm} onChange={handleChange} />
                        <i className='fad fa-lock-alt' />
                    </FormGroupWithIcon>

                    <Button type='submit'>Reset Password</Button>
                </Form>
            </CardBody>
        </Card>
    );
};

export default ResetPassword;
