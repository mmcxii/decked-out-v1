import React from 'react';

import { Button, CardBody, CardHeader, Modal } from 'elements';

const RemoveCardsModal = () => {
    return (
        <Modal>
            <CardHeader as='h2'>Remove Cards</CardHeader>
            <CardBody>
                <p>Click a card to remove a copy from your deck</p>

                <Button>Save Changes</Button>
            </CardBody>
        </Modal>
    );
};

export default RemoveCardsModal;
