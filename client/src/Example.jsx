import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody } from 'elements';

const Example = () => {
    const [examples, setExample] = useState([]);

    useEffect(() => {
        fetch('/api/examples', {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        })
            .then(res => res.json())
            .then(data => setExample(data));
    }, []);

    return (
        <>
            {examples.map(example => (
                <Card key={example.id}>
                    <CardHeader>{example.text}</CardHeader>
                    <CardBody>
                        <p>{example.description}</p>
                    </CardBody>
                </Card>
            ))}
        </>
    );
};

export default Example;
