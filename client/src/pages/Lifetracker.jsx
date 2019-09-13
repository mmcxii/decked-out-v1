import React from 'react';
import { Button, Card, CardHeader, CardBody, Modal } from 'elements';
import { Toggle } from 'utilities';
import { Form, FormInput, FormLabel } from 'elements';

const Lifetracker = () => {
    return (
        <Card>
            <CardHeader>Lifetracker</CardHeader>
            <CardBody>
                <Form>
                    <FormLabel for='name'>Name:</FormLabel>
                    <FormInput name='name' type='text' />
                </Form>

                <Toggle>
                    {({ isToggled, setToggle }) => (
                        <>
                            <Button onClick={() => setToggle(!isToggled)}>Hi There</Button>

                            {isToggled && (
                                <Modal isToggled={isToggled} setToggle={setToggle}>
                                    <CardHeader>Welcome to the Modal</CardHeader>
                                    <CardBody>this is some fire content</CardBody>
                                </Modal>
                            )}
                        </>
                    )}
                </Toggle>
            </CardBody>
        </Card>
    );
};

export default Lifetracker;
