import React, { useState } from 'react';

import { CardBody, CardHeader, CardSearchForm, Modal } from 'elements';

const EditDeckModal = ({ isToggled, setToggle, deckName }) => {
    const [searchResults, setSearchResults] = useState();
    return (
        <Modal isToggled={isToggled} setToggle={setToggle}>
            <CardHeader>{deckName}</CardHeader>
            <CardBody>
                <CardSearchForm />
            </CardBody>
        </Modal>
    );
};

export default EditDeckModal;
