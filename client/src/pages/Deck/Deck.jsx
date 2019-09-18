import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Button } from 'elements';
import { absolute, spacing, Toggle } from 'utilities';
import EditDeckModal from './EditDeckModal';
import RemoveCardsModal from './RemoveCardsModal';

const Deck = ({
    match: {
        params: { deckname },
    },
}) => {
    const deckName = deckname.split('-').join(' ');
    const [deckList, setDeckList] = useState({ main: [], sideboard: [] });
    const [fetchDeck, setFetchDeck] = useState(false);

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

            const reduceDuplicates = arr => {
                const map = {};
                //loop over the array of cards
                for (let i = 0; i < arr.length; i++) {
                    //check if the map/counter has a key that is the current cards name, and increment if it exists
                    if (map[arr[i].name]) {
                        map[arr[i].name]++;
                    } else {
                        //create a key withe the current cards name and set it equal to 1 (you have one card)
                        map[arr[i].name] = 1;
                    }
                }

                return map;
            };

            console.log(data.main);

            const reducedMain = reduceDuplicates(data.main);
            const reducedSideboard = reduceDuplicates(data.sideboard);

            console.log(reducedMain);
            console.log(reducedSideboard);

            setDeckList({ main: reducedMain, sideboard: reducedSideboard });
            setFetchDeck(false);
        };

        getDeck();
    }, [fetchDeck]);

    return (
        <DeckList>
            <DeckTitle>{deckName}</DeckTitle>

            <Mainboard>
                <h3>Main</h3>
                <ul>
                    {Object.keys(deckList.main).map((card, index) => (
                        <li key={index}>
                            {deckList.main[card]} {[card]}
                        </li>
                    ))}
                </ul>
            </Mainboard>

            <Sideboard>
                <h3>Sideboard</h3>
                <ul>
                    {Object.keys(deckList.sideboard).map((card, index) => (
                        <li key={index}>
                            {deckList.sideboard[card]} {[card]}
                        </li>
                    ))}
                </ul>
            </Sideboard>

            <EditDeckButtons>
                <Toggle>
                    {({ isToggled, setToggle }) => (
                        <>
                            <Button onClick={() => setToggle(true)}>Add Cards</Button>

                            {isToggled && (
                                <EditDeckModal
                                    deckName={deckName}
                                    setFetchDeck={setFetchDeck}
                                    isToggled={isToggled}
                                    setToggle={setToggle}
                                />
                            )}
                        </>
                    )}
                </Toggle>

                <Toggle>
                    {({ isToggled, setToggle }) => (
                        <>
                            <Button onClick={() => setToggle(true)}>Remove Cards</Button>

                            {isToggled && (
                                <RemoveCardsModal
                                    deckName={deckName}
                                    deckList={deckList}
                                    setFetchDeck={setFetchDeck}
                                    isToggled={isToggled}
                                    setToggle={setToggle}
                                />
                            )}
                        </>
                    )}
                </Toggle>
            </EditDeckButtons>
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
    margin-bottom: ${spacing.md};
`;

const Mainboard = styled.section`
    grid-area: mainboard;
`;

const Sideboard = styled.section`
    grid-area: sideboard;
`;

const EditDeckButtons = styled.section`
    ${absolute({ x: 'right' })};

    > button {
        margin: 0 ${spacing.xs};
    }
`;
