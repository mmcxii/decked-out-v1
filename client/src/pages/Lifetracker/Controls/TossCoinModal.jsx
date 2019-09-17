import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { useForm } from 'hooks';
import { spacing } from 'utilities';
import { Button, CardBody, CardHeader, Form, FormInput, FormLabel, Modal } from 'elements';

const TossCoinModal = ({ isToggled, setToggle }) => {
    const [values, handleChange] = useForm({ numCoins: 1 });
    const [coinResults, setCoinResults] = useState([]);
    const numCoinsRef = useRef();

    useEffect(() => {
        numCoinsRef.current.focus();
    }, [values.numCoins]);

    const tossCoins = () => {
        const { numCoins } = values;
        const results = [];

        for (let i = 0; i < numCoins; i++) {
            results.push(Math.round(Math.random()));
        }

        setCoinResults(results);
    };

    return (
        <Modal isToggled={isToggled} setToggle={setToggle}>
            <CardHeader>Toss a Coin</CardHeader>
            <CardBody>
                {coinResults.length > 0 && (
                    <CoinResults>
                        {coinResults.map((result, index) => (
                            <CoinResult key={index}>
                                Coin {index + 1} came up: {result > 0.5 ? 'Heads' : 'Tails'}
                            </CoinResult>
                        ))}
                    </CoinResults>
                )}

                <Form
                    onSubmit={e => {
                        e.preventDefault();

                        tossCoins();
                    }}
                >
                    <FormLabel htmlFor='numCoins'>Number of Coins</FormLabel>
                    <FormInput
                        name='numCoins'
                        ref={numCoinsRef}
                        type='number'
                        value={values.numCoins}
                        onChange={handleChange}
                    />
                    <Button type='submit'>Toss Coin</Button>
                </Form>
            </CardBody>
        </Modal>
    );
};

export default TossCoinModal;

const CoinResult = styled.li`
    font-weight: bolder;
`;

const CoinResults = styled.ol`
    list-style: none;
    display: grid;
    text-align: center;
    grid-gap: ${spacing.sm};

    @media screen and (min-width: 768px) {
        grid-template-columns: repeat(5, 1fr);
    }
`;
