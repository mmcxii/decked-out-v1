import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { useForm } from 'hooks';
import { spacing } from 'utilities';
import { Button, CardBody, CardHeader, Form, FormInput, FormLabel, Modal } from 'elements';

const RollDiceModal = ({ isToggled, setToggle }) => {
    const [values, handleChange] = useForm({ numDice: 1, typeDice: 20 });
    const numDiceRef = useRef();
    const typeDiceRef = useRef();

    const [rolls, setRolls] = useState([]);

    useEffect(() => {
        typeDiceRef.current.focus();
    }, [values.typeDice]);

    useEffect(() => {
        numDiceRef.current.focus();
    }, [values.numDice]);

    const rollDice = () => {
        const { numDice, typeDice } = values;

        const results = [];

        for (let i = 0; i < numDice; i++) {
            results.push(Math.round(Math.random() * typeDice + 1));

            setRolls(results);
        }

        return setRolls(results);
    };

    return (
        <Modal isToggled={isToggled} setToggle={setToggle}>
            <CardHeader>Roll Dice</CardHeader>
            <CardBody>
                {rolls.length > 0 && (
                    <DiceResults>
                        {rolls.map((roll, index) => (
                            <DiceResult key={index}>
                                Dice {index + 1}: {roll}
                            </DiceResult>
                        ))}
                    </DiceResults>
                )}
                <Form
                    onSubmit={e => {
                        e.preventDefault();

                        rollDice();
                    }}
                >
                    <FormLabel htmlFor='numDice'>Number of Dice</FormLabel>
                    <FormInput
                        name='numDice'
                        type='number'
                        ref={numDiceRef}
                        value={values.numDice}
                        onChange={handleChange}
                    />

                    <FormLabel htmlFor='typeDice'>Type of Dice</FormLabel>
                    <FormInput
                        name='typeDice'
                        type='number'
                        ref={typeDiceRef}
                        value={values.typeDice}
                        onChange={handleChange}
                    />

                    <Button type='submit'>Roll Dice</Button>
                </Form>
            </CardBody>
        </Modal>
    );
};

export default RollDiceModal;

const DiceResult = styled.li`
    font-weight: bolder;
`;

const DiceResults = styled.ol`
    list-style: none;
    display: grid;
    text-align: center;
    grid-gap: ${spacing.sm};

    @media screen and (min-width: 768px) {
        grid-template-columns: repeat(5, 1fr);
    }
`;
