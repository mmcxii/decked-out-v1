import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, Form, FormInput, FormLabel } from 'elements';

const CreateDeck = ({ history }) => {
    const [formIsSubmitted, setFormIsSubmitted] = useState(false);
    const [deckName, setDeckName] = useState('');

    useEffect(() => {
        const createNewDeck = async () => {
            const res = await fetch('/api/createdeck', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ deckName, deckList: { main: [], sideboard: [] } }),
                credentials: 'include',
            });

            if (res.status === 200) {
                history.push('/account');
            } else {
                console.log(res.status);
            }
        };

        if (formIsSubmitted) {
            createNewDeck();
        }
    }, [formIsSubmitted]);

    return (
        <>
            <Card>
                <CardHeader>Create a New Deck</CardHeader>
                <CardBody>
                    <Form
                        onSubmit={e => {
                            e.preventDefault();

                            setFormIsSubmitted(true);
                        }}
                    >
                        <FormLabel>Deck Name</FormLabel>
                        <FormInput
                            type='text'
                            placeholder='What is your deck called?'
                            value={deckName}
                            onChange={e => setDeckName(e.target.value)}
                        />

                        <Button type='submit'>Create Deck</Button>
                    </Form>
                </CardBody>
            </Card>
        </>
    );
};

export default withRouter(CreateDeck);
