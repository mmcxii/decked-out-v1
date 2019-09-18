import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { spacing } from 'utilities';
import { ButtonLink } from 'elements';

const Account = ({ user }) => {
    const [userDecks, setUserDecks] = useState([]);

    useEffect(() => {
        const fetchDecks = async () => {
            const res = await fetch('/account', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                credentials: 'include',
            });

            const data = await res.json();
            setUserDecks(data);
        };

        fetchDecks();
    }, []);

    return (
        <>
            {user && (
                <>
                    <UserName>{user.username}</UserName>
                    <hr />

                    <section>
                        <SectionHeader>Decks:</SectionHeader>
                        <ButtonLink as={Link} to='/createdeck'>
                            Add New Deck
                        </ButtonLink>

                        {userDecks.length > 0 ? (
                            userDecks.map((deck, index) => (
                                <DeckTitle key={index} to={`/account/${deck.split(' ').join('-')}`}>
                                    {deck}
                                </DeckTitle>
                            ))
                        ) : (
                            <p>
                                Hmmm it seems you don't have any decks right now, why not
                                <Link to='/createdeck'> go make one?</Link>
                            </p>
                        )}
                    </section>
                </>
            )}
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

const DeckTitle = styled(ButtonLink)`
    display: block;
    font-size: 1.25rem;
    margin: ${spacing.sm} 0;
`;
