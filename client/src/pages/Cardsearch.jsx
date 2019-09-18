import React, { useState, useEffect } from 'react';

import { useForm, useCheckbox } from 'hooks';
import { Button, Card, CardHeader, CardBody, CheckboxInput, Form, FormInput, FormLabel, StyledCheckbox, CardSearchForm } from 'elements';
import { Toggle } from 'utilities';

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
