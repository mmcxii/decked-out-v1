import React, { useState, useEffect } from 'react';

const Example = () => {
    const [examples, setExample] = useState([]);

    useEffect(() => {
        console.log('effect firing');
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
                <div key={example.id}>
                    <h3>{example.text}</h3>
                    <p>{example.description}</p>
                </div>
            ))}
        </>
    );
};

export default Example;
