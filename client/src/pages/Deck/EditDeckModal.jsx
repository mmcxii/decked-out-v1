import React from 'react';

import { CardBody, CardHeader, Modal } from 'elements';

const EditDeckModal = ({ isToggled, setToggle, deckName }) => {
    return (
        <Modal isToggled={isToggled} setToggle={setToggle}>
            <CardHeader>{deckName}</CardHeader>
            <CardBody></CardBody>
        </Modal>
    );
};

export default EditDeckModal;
