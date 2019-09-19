import React, { useEffect, useState } from 'react';

import { spacing } from 'utilities';
import { Button, CardBody, CardHeader, Modal } from 'elements';
import { Board, CardItem } from './Deck';

const RemoveCardsModal = ({ isToggled, setToggle, deckName, reducedDeckList, deckList, setFetchDeck }) => {
    const [mainboardToRemove, setMainboardToRemove] = useState([]);
    const [sideboardToRemove, setSideboardToRemove] = useState([]);
    const [cardsShouldBeRemoved, setCardsShouldBeRemoved] = useState(false);

    useEffect(() => {
        const removeCards = () => {
            fetch('/api/updatedeck', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    deckName,
                    cardsToAdd: { main: [], sideboard: [] },
                    cardsToRemove: { main: [...mainboardToRemove], sideboard: [...sideboardToRemove] },
                }),
            }).then(() => {
                setFetchDeck(true);
                setToggle(false);
            });
        };

        if (cardsShouldBeRemoved) {
            removeCards();
        }
    }, [cardsShouldBeRemoved]);

    const findCardObjectInMain = cardName => {
        for (let i = 0; i < deckList.main.length; i++) {
            if (deckList.main[i].name === cardName) {
                return deckList.main[i];
            }
        }
    };

    const findCardObjectInSideboard = cardName => {
        for (let i = 0; i < deckList.sideboard.length; i++) {
            if (deckList.sideboard[i].name === cardName) {
                return deckList.sideboard[i];
            }
        }
    };

    return (
        <Modal isToggled={isToggled} setToggle={setToggle}>
            <CardHeader as='h2'>Remove Cards</CardHeader>
            <CardBody>
                <p>Click a card to remove a copy from your deck</p>

                <h3>Main</h3>
                <Board>
                    {Object.keys(reducedDeckList.main).map((card, index) => (
                        <CardItem
                            key={index}
                            style={reducedDeckList.main[card] === 0 ? { textDecoration: 'line-through' } : {}}
                        >
                            {reducedDeckList.main[card]} {[card]}
                            {reducedDeckList.main[card] > 0 && (
                                <Button
                                    style={{ marginLeft: spacing.xs }}
                                    onClick={() => {
                                        setMainboardToRemove([
                                            ...mainboardToRemove,
                                            findCardObjectInMain(card),
                                        ]);
                                        reducedDeckList.main[card]--;
                                    }}
                                >
                                    -
                                </Button>
                            )}
                        </CardItem>
                    ))}
                </Board>

                <h3>Sideboard</h3>
                <Board>
                    {Object.keys(reducedDeckList.sideboard).map((card, index) => (
                        <CardItem
                            key={index}
                            style={
                                reducedDeckList.sideboard[card] === 0
                                    ? { textDecoration: 'line-through' }
                                    : {}
                            }
                        >
                            {reducedDeckList.sideboard[card]} {[card]}
                            {reducedDeckList.sideboard[card] > 0 && (
                                <Button
                                    style={{ marginLeft: spacing.xs }}
                                    onClick={() => {
                                        setSideboardToRemove([
                                            ...sideboardToRemove,
                                            findCardObjectInSideboard(card),
                                        ]);

                                        reducedDeckList.sideboard[card]--;
                                    }}
                                >
                                    -
                                </Button>
                            )}
                        </CardItem>
                    ))}
                </Board>
                <Button onClick={() => setCardsShouldBeRemoved(true)}>Save Changes</Button>
            </CardBody>
        </Modal>
    );
};

export default RemoveCardsModal;
