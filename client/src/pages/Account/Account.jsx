//* Packages
import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';

//* Utilities
import { absolute, spacing } from 'utilities';

//* Elements
import { Button, ButtonLink, LoadingSpinner } from 'elements';
import DeckItem from './DeckItem';

const Account = ({ history, user, setUser }) => {
  const [userDecks, setUserDecks] = useState([]);
  const [fetchDecks, setFetchDecks] = useState(false);
  const [dataIsLoading, setDataIsLoading] = useState(true);
  const [userLoggedOut, setUserLoggedOut] = useState(false);

  useEffect(() => {
    fetch('/account', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => setUserDecks(data))
      .then(setDataIsLoading(false));

    setFetchDecks(false);
  }, [fetchDecks]);

  useEffect(() => {
    const logout = async () => {
      const res = await fetch('/logout', { method: 'GET' });

      if (res.status === 200) {
        setUser(null);
        return history.push('/');
      }
    };

    if (userLoggedOut) {
      logout();
    }
  }, [userLoggedOut]);

  return (
    <>
      {dataIsLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <UserName>{user.username}</UserName>
          <hr />

          <ProfileWrapper>
            <SectionHeader>Decks:</SectionHeader>
            <ButtonLink as={Link} to='/createdeck'>
              Add New Deck
            </ButtonLink>

            {userDecks.length > 0 ? (
              <UserDecks>
                {userDecks.map((deckName, index) => (
                  <DeckItem
                    key={index}
                    deckName={deckName}
                    setFetchDecks={setFetchDecks}
                  />
                ))}
              </UserDecks>
            ) : (
              <p>
                Hmmm it seems you don't have any decks right now, why not
                <Link to='/createdeck'> go make one?</Link>
              </p>
            )}

            <LogoutButton onClick={() => setUserLoggedOut(true)}>
              Log Out
            </LogoutButton>
          </ProfileWrapper>
        </>
      )}
    </>
  );
};

export default withRouter(Account);

//* Styled Components
const UserName = styled.h2`
  font-size: 1.75rem;
  text-align: center;
`;

const SectionHeader = styled.h3`
  font-size: 1.5rem;
`;

const ProfileWrapper = styled.section`
  position: relative;
`;

const UserDecks = styled.section`
  display: flex;
  flex-direction: column;
`;

const LogoutButton = styled(Button)`
  ${absolute({ x: 'right' })};
  top: ${spacing.sm};
`;
