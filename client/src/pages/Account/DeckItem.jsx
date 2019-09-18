import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { spacing, absolute, transition, manaRed, Toggle } from 'utilities';
import { Button, ButtonLink, CardBody, CardHeader, Modal } from 'elements';

const DeckItem = ({ deckName, setFetchDecks }) => {
    const [userDeletedDeck, setUserDeletedDeck] = useState(false);

    useEffect(() => {
        const deleteDeck = () => {
            fetch('/api/deletedeck', {
                method: 'DELETE',

                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ deckName }),
            });

            setFetchDecks(true);
        };

        if (userDeletedDeck) {
            deleteDeck();
        }
    }, [userDeletedDeck]);

    return (
        <Wrapper>
            <DeckTitle to={`/account/${deckName.split(' ').join('-')}`}>{deckName}</DeckTitle>

            <Toggle>
                {({ isToggled, setToggle }) => (
                    <>
                        <RemoveDeckButton onClick={() => setToggle(true)}>Delete</RemoveDeckButton>

                        {isToggled && (
                            <Modal isToggled={isToggled} setToggle={setToggle}>
                                <CardHeader>Delete {deckName}</CardHeader>
                                <CardBody>
                                    <p>Are you sure you want to delete {deckName}?</p>
                                    <p>
                                        <strong>This action can not be undone.</strong>
                                    </p>

                                    <Button onClick={() => setToggle(false)}>
                                        No, don't delete {deckName}
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            setUserDeletedDeck(true);
                                            setToggle(false);
                                        }}
                                    >
                                        Yes, I want to delete {deckName}
                                    </Button>
                                </CardBody>
                            </Modal>
                        )}
                    </>
                )}
            </Toggle>
        </Wrapper>
    );
};

export default DeckItem;

const Wrapper = styled.article`
    position: relative;
`;

const DeckTitle = styled(ButtonLink)`
    display: block;
    font-size: 1.25rem;
    margin: ${spacing.sm} 0;
`;

const RemoveDeckButton = styled.button`
    ${absolute({ x: 'right' })};
    padding: ${spacing.md};
    font-weight: bolder;
    border: none;
    background: transparent;
    cursor: pointer;
    ${transition({ prop: 'color' })};

    &:hover {
        color: ${manaRed};
    }
`;
