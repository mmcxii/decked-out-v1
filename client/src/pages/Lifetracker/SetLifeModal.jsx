//* Packages
import React, { useState, useEffect, useRef } from 'react';

//* Elements
import { Button, CardBody, CardHeader, Form, FormInput, Modal } from 'elements';

const SetLifeModal = ({ isToggled, setToggle, lifeTotal, handleNewLifeTotal }) => {
    const [newLifeTotal, setNewLifeTotal] = useState(lifeTotal);
    const inputRef = useRef();

    useEffect(() => {
        inputRef.current.focus();
    }, [newLifeTotal]);

    return (
        <Modal isToggled={isToggled} setToggle={setToggle}>
            <CardHeader>Set Life Total</CardHeader>
            <CardBody>
                <Form
                    onSubmit={e => {
                        e.preventDefault();

                        handleNewLifeTotal(newLifeTotal);
                        setToggle(false);
                    }}
                >
                    <FormInput
                        type='number'
                        ref={inputRef}
                        value={newLifeTotal}
                        onChange={e => setNewLifeTotal(e.target.value)}
                    />
                    <Button type='submit'>Set</Button>
                </Form>
            </CardBody>
        </Modal>
    );
};

export default SetLifeModal;
