//* Packages
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

//* Utilities
import { absolute, spacing, Toggle } from 'utilities';

//* Elements
import { Button, ButtonGroup } from 'elements';
import EditDeckModal from './EditDeckModal';
import RemoveCardsModal from './RemoveCardsModal';

const Deck = ({
    match: {
        params: { deckname },
    },
}) => {
    const deckName = deckname.split('-').join(' ');
    const [reducedDeckList, setReducedDeckList] = useState({ main: [], sideboard: [] });
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

            setDeckList(data);
            setReducedDeckList({
                main: reduceDuplicates(data.main),
                sideboard: reduceDuplicates(data.sideboard),
            });
            setFetchDeck(false);
        };

        getDeck();
    }, [fetchDeck]);

    return (
        <Wrapper>
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
                                    reducedDeckList={reducedDeckList}
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

            <DeckList>
                <DeckTitle>{deckName}</DeckTitle>

                <Mainboard>
                    <h3>Main</h3>
                    <Board>
                        {Object.keys(reducedDeckList.main).map((card, index) => (
                            <CardItem key={index}>
                                {reducedDeckList.main[card]} {[card]}
                            </CardItem>
                        ))}
                    </Board>
                </Mainboard>

                <Sideboard>
                    <h3>Sideboard</h3>
                    <Board>
                        {Object.keys(reducedDeckList.sideboard).map((card, index) => (
                            <CardItem key={index}>
                                {reducedDeckList.sideboard[card]} {[card]}
                            </CardItem>
                        ))}
                    </Board>
                </Sideboard>
            </DeckList>
        </Wrapper>
    );
};

export default Deck;

//* Styled Components
const Wrapper = styled.div`
    position: relative;
`;

const DeckList = styled.section`
    display: grid;
    grid-template-rows: repeat(3, max-content);
    grid-template-columns: 1fr;
    grid-template-areas:
        'title'
        'mainboard'
        'sideboard';
    grid-gap: ${spacing.md};
    height: 100%;
    position: relative;

    @media screen and (min-width: 768px) {
        grid-template-rows: max-content 1fr;
        grid-template-columns: 3fr 1fr;
        grid-template-areas:
            'title title'
            'mainboard sideboard';
    }
`;

const DeckTitle = styled.h2`
    grid-area: title;

    @media screen and (min-width: 768px) {
        margin-bottom: ${spacing.xl};
    }
`;

const Mainboard = styled.section`
    grid-area: mainboard;
`;

export const Board = styled.ul`
    list-style: none;
`;

export const CardItem = styled.li`
    font-size: 1.5rem;
`;

const Sideboard = styled.section`
    grid-area: sideboard;
`;

const EditDeckButtons = styled(ButtonGroup)`
    z-index: 2;

    @media screen and (min-width: 768px) {
        ${absolute({ x: 'right' })};
    }
`;
