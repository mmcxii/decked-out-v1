import React, { useEffect, useRef } from 'react';

import { useForm } from 'hooks';
import { Button, CardBody, CardHeader, Form, FormInput, FormLabel, Modal } from 'elements';

const AddPlayerModal = ({ isToggled, setToggle, players, setPlayers }) => {
    const [values, handleChange] = useForm({ name: '', lifeTotal: 20 });
    const nameInputRef = useRef();
    const lifeTotalInputRef = useRef();

    useEffect(() => {
        lifeTotalInputRef.current.focus();
    }, [values.lifeTotal]);

    useEffect(() => {
        nameInputRef.current.focus();
    }, [values.name]);

    const addPlayer = ({ name, lifeTotal }) => setPlayers([...players, { name, lifeTotal }]);

    return (
        <Modal isToggled={isToggled} setToggle={setToggle}>
            <CardHeader>Add New Player</CardHeader>
            <CardBody>
                <Form
                    onSubmit={e => {
                        e.preventDefault();

                        const { name, lifeTotal } = values;

                        addPlayer({ name, lifeTotal });

                        setToggle(false);
                    }}
                >
                    <FormLabel htmlFor='name'>Player Name</FormLabel>
                    <FormInput
                        name='name'
                        type='text'
                        placeholder="What is the new player's name?"
                        ref={nameInputRef}
                        value={values.name}
                        onChange={handleChange}
                    />

                    <FormLabel htmlFor='lifeTotal'>Life Total</FormLabel>
                    <FormInput
                        name='lifeTotal'
                        type='number'
                        ref={lifeTotalInputRef}
                        value={values.lifeTotal}
                        onChange={handleChange}
                    />

                    <Button type='submit'>Add Player</Button>
                </Form>
            </CardBody>
        </Modal>
    );
};

export default AddPlayerModal;
