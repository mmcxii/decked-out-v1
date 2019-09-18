import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { useFetch } from 'hooks';
import { ButtonLink } from 'elements';
import DeckItem from './DeckItem';

const Account = ({ user }) => {
    const [userDecks, setUserDecks] = useState([]);
    const [fetchDecks, setFetchDecks] = useState(false);

    useEffect(() => {
        fetch('/account', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => setUserDecks(data));

        setFetchDecks(false);
    }, [fetchDecks]);

    return (
        <>
            <UserName>{user.username}</UserName>
            <hr />

            <section>
                <SectionHeader>Decks:</SectionHeader>
                <ButtonLink as={Link} to='/createdeck'>
                    Add New Deck
                </ButtonLink>

                {userDecks.length > 0 ? (
                    <UserDecks>
                        {userDecks.map((deckName, index) => (
                            <DeckItem key={index} deckName={deckName} setFetchDecks={setFetchDecks} />
                        ))}
                    </UserDecks>
                ) : (
                    <p>
                        Hmmm it seems you don't have any decks right now, why not
                        <Link to='/createdeck'> go make one?</Link>
                    </p>
                )}
            </section>
        </>
    );
};

export default Account;

const UserName = styled.h2`
    font-size: 1.75rem;
    text-align: center;
`;

const SectionHeader = styled.h3`
    font-size: 1.5rem;
`;

const UserDecks = styled.section`
    display: flex;
    flex-direction: column;
`;
