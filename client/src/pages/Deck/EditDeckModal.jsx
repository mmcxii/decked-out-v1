//* Packages
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

//* Elements
import {
    Button,
    CardBody,
    CardDisplay,
    CardHeader,
    CardImage,
    CardSearchForm,
    LoadingSpinner,
    Modal,
} from 'elements';

const EditDeckModal = ({ isToggled, setToggle, deckName, setFetchDeck }) => {
    const [dataIsLoading, setDataIsLoading] = useState(true);
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
                    cardsToRemove: { main: [], sideboard: [] },
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
                    setDataIsLoading={setDataIsLoading}
                    setSearchResults={setSearchResults}
                    setSearchWasSuccessful={setSearchWasSuccessful}
                />

                {searchWasSuccessful && (
                    <>
                        {dataIsLoading ? (
                            <LoadingSpinner />
                        ) : (
                            <Wrapper>
                                <section>
                                    <h3>Main Deck</h3>
                                    <p>Click a card again to add it to your sideboard</p>

                                    <CardDisplay>
                                        {mainboardToAdd.map((card, index) => (
                                            <article key={index}>
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
                                        {sideboardToAdd.map((card, index) => (
                                            <article key={index}>
                                                <CardImage
                                                    src={card.img_url}
                                                    alt={card.name}
                                                    onClick={() =>
                                                        setSideboardToAdd(
                                                            sideboardToAdd.filter(item => item.id !== card.id)
                                                        )
                                                    }
                                                />
                                            </article>
                                        ))}
                                    </CardDisplay>

                                    <Button onClick={() => setCardsShouldBeAdded(true)}>Add Cards</Button>
                                </section>

                                <h3>Search Results</h3>
                                <p>Click a card to add a copy to your deck</p>

                                <CardDisplay>
                                    {searchResults.map(card => (
                                        <article key={card.id}>
                                            <CardImage
                                                src={card.img_url}
                                                alt={card.name}
                                                onClick={() => setMainboardToAdd([...mainboardToAdd, card])}
                                            />
                                        </article>
                                    ))}
                                </CardDisplay>
                            </Wrapper>
                        )}
                    </>
                )}
            </CardBody>
        </Modal>
    );
};

export default EditDeckModal;

const Wrapper = styled.section`
    display: flex;
    flex-direction: column;
`;
