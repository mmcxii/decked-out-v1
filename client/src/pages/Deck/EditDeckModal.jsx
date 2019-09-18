import React, { useState, useEffect } from 'react';

import { Button, CardBody, CardDisplay, CardHeader, CardImage, CardSearchForm, Modal } from 'elements';

const EditDeckModal = ({ isToggled, setToggle, deckName, setFetchDeck }) => {
    const [searchWasSuccessful, setSearchWasSuccessful] = useState(false);
    const [cardsShouldBeAdded, setCardsShouldBeAdded] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [mainboardToAdd, setMainboardToAdd] = useState([]);
    const [sideboardToAdd, setSideboardToAdd] = useState([]);

    useEffect(() => {
        const updateDeck = () => {
            fetch('/api/updatedeck', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    deckName,
                    cardsToAdd: { main: [...mainboardToAdd], sideboard: [...sideboardToAdd] },
                }),
            }).then(() => {
                setFetchDeck(true);
                setToggle(false);
            });
        };

        if (cardsShouldBeAdded) {
            updateDeck();
        }
    }, [cardsShouldBeAdded]);

    return (
        <Modal isToggled={isToggled} setToggle={setToggle}>
            <CardHeader as='h2'>{deckName}</CardHeader>
            <CardBody>
                <CardSearchForm
                    setSearchResults={setSearchResults}
                    setSearchWasSuccessful={setSearchWasSuccessful}
                />

                {mainboardToAdd.length > 0 && (
                    <section>
                        <h3>Main Deck</h3>
                        <p>Click a card again to add it to your sideboard</p>

                        <CardDisplay>
                            {mainboardToAdd.map(card => (
                                <article key={card.id}>
                                    <CardImage
                                        src={card.img_url}
                                        alt={card.name}
                                        onClick={() => {
                                            setMainboardToAdd(
                                                mainboardToAdd.filter(item => item.id !== card.id)
                                            );
                                            setSideboardToAdd([...sideboardToAdd, card]);
                                        }}
                                    />
                                </article>
                            ))}
                        </CardDisplay>

                        <h3>Sideboard</h3>
                        <p>Click a card again to remove it from the list</p>
                        <CardDisplay>
                            {sideboardToAdd.map(card => (
                                <article key={card.id}>
                                    <CardImage
                                        src={card.img_url}
                                        alt={card.name}
                                        onClick={() => {
                                            setSideboardToAdd(
                                                sideboardToAdd.filter(item => item.id !== card.id)
                                            );
                                            setSearchResults([...searchResults, card]);
                                        }}
                                    />
                                </article>
                            ))}
                        </CardDisplay>

                        <Button onClick={() => setCardsShouldBeAdded(true)}>Add Cards</Button>
                    </section>
                )}

                {searchWasSuccessful && (
                    <>
                        <h3>Search Results</h3>
                        <p>Click a card to add a copy to your deck</p>

                        <CardDisplay>
                            {searchResults.map(card => (
                                <article key={card.id}>
                                    <CardImage
                                        src={card.img_url}
                                        alt={card.name}
                                        onClick={() => {
                                            setMainboardToAdd([...mainboardToAdd, card]);
                                            setSearchResults(
                                                searchResults.filter(item => item.id !== card.id)
                                            );
                                        }}
                                    />
                                </article>
                            ))}
                        </CardDisplay>
                    </>
                )}
            </CardBody>
        </Modal>
    );
};

export default EditDeckModal;
