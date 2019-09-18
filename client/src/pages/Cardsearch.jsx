import React from 'react';

import { Card, CardHeader, CardBody, CardSearchForm } from 'elements';

const CardSearch = () => {
    return (
        <Card>
            <CardHeader as='h2'>Oracle Search</CardHeader>
            <CardBody>
                <CardSearchForm />
            </CardBody>
        </Card>
    );
};

export default CardSearch;
