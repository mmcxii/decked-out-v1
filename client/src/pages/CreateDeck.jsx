import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';

import { useForm } from 'hooks';
import { Button, Card, CardBody, CardHeader, Form, FormInput, FormLabel } from 'elements';
import { FormGroupWithIcon } from 'elements/Form';

const CreateDeck = ({ history }) => {
    const [formIsSubmitted, setFormIsSubmitted] = useState(false);
    const [values, handleChange] = useForm({ deckName: '' });

    useEffect(() => {
        const createNewDeck = async () => {
            const { deckName } = values;

            const res = await fetch('/api/createdeck', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ deckName, deckList: { main: [], sideboard: [] } }),
                credentials: 'include',
            });

            if (res.status === 200) {
                history.push(`/account/${deckName.split(' ').join('-')}`);
            } else {
                console.log(res.status);
            }
        };

        if (formIsSubmitted) {
            createNewDeck();
        }
    }, [formIsSubmitted]);

    return (
        <Card>
            <CardHeader>Create a New Deck</CardHeader>
            <CardBody>
                <Form
                    onSubmit={e => {
                        e.preventDefault();

                        setFormIsSubmitted(true);
                    }}
                >
                    <FormGroupWithIcon>
                        <FormLabel>Deck Name</FormLabel>
                        <FormInput
                            name='deckName'
                            type='text'
                            placeholder='What is your deck called?'
                            value={values.deckName}
                            onChange={handleChange}
                        />
                        <i className='fad fa-align-justify'></i>
                    </FormGroupWithIcon>

                    <Button type='submit'>Create Deck</Button>
                </Form>
            </CardBody>
        </Card>
    );
};

export default withRouter(CreateDeck);
