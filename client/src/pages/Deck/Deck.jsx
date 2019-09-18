import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button } from 'elements';
import { absolute, Toggle } from 'utilities';
import EditDeckModal from './EditDeckModal';

const Deck = ({
    match: {
        params: { deckname },
    },
}) => {
    const deckName = deckname.split('-').join(' ');
    const [deckList, setDeckList] = useState({ main: [], sideboard: [] });

    useEffect(() => {
        const getDeck = async () => {
            const res = await fetch(`/account/${deckname}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            const data = await res.json();

            setDeckList(data);
        };

        getDeck();
    }, []);

    return (
        <DeckList>
            <DeckTitle>{deckName}</DeckTitle>

            <Mainboard>
                <h3>Main</h3>
                <ul>
                    {deckList.main.map(card => (
                        <li>{card.name}</li>
                    ))}
                </ul>
            </Mainboard>

            <Sideboard>
                <h3>Sideboard</h3>
                <ul>
                    {deckList.sideboard.map(card => (
                        <li>{card.name}</li>
                    ))}
                </ul>
            </Sideboard>
            <Toggle>
                {({ isToggled, setToggle }) => (
                    <>
                        <EditDeckButton onClick={() => setToggle(true)}>Edit</EditDeckButton>

                        {isToggled && (
                            <EditDeckModal
                                deckName={deckName}
                                deckList={deckList}
                                setDeckList={setDeckList}
                                isToggled={isToggled}
                                setToggle={setToggle}
                            />
                        )}
                    </>
                )}
            </Toggle>
        </DeckList>
    );
};

export default Deck;

const DeckList = styled.section`
    display: grid;
    grid-template-rows: max-content 1fr;
    grid-template-columns: 3fr 1fr;
    grid-template-areas:
        'title title'
        'mainboard sideboard';
    height: 100%;
    position: relative;
`;

const DeckTitle = styled.h2`
    grid-area: title;
`;

const Mainboard = styled.section`
    grid-area: mainboard;
`;

const Sideboard = styled.section`
    grid-area: sideboard;
`;

const EditDeckButton = styled(Button)`
    ${absolute({ x: 'right' })};
`;
