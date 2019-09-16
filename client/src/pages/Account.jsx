import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { ButtonLink } from 'elements';

const Account = ({ history, user }) => {
    const [userDecks, setUserDecks] = useState([]);

    useEffect(() => {
        if (!user) {
            history.push('/login');
        }

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
                                <h4 key={index}>
                                    <Link to={`/account/${deck.split(' ').join('-')}`}>{deck}</Link>
                                </h4>
                            ))
                        ) : (
                            <p>
                                Hmmm it seems you don't have any decks right now, why not
                                <Link to='/createdeck'>go make one?</Link>
                            </p>
                        )}
                    </section>
                </>
            )}
        </>
    );
};

export default withRouter(Account);

const UserName = styled.h2`
    font-size: 1.75rem;
    text-align: center;
`;

const SectionHeader = styled.h3`
    font-size: 1.25rem;
`;
