import React, { useReducer } from 'react';
import styled from 'styled-components';
import { spacing, absolute, Toggle } from 'utilities';
import { Button, Card, CardHeader, CardBody } from 'elements';
import SetLifeModal from './SetLifeModal';

const modifyLifeTotal = (currentLifeTotal, { action, value }) => {
    switch (action) {
        case 'increment':
            return currentLifeTotal + 1;

        case 'decrement':
            return currentLifeTotal - 1;

        case 'set':
            return (currentLifeTotal = value);

        default:
            throw new Error();
    }
};

const PlayerCard = ({ player, removePlayer }) => {
    const [lifeTotal, dispatch] = useReducer(modifyLifeTotal, player.lifeTotal);

    return (
        <Wrapper>
            <CardHeader>{player.name}</CardHeader>

            <PlayerCardBody>
                <PlayerLifeTotal>{lifeTotal}</PlayerLifeTotal>

                <PlayerLifeButtons>
                    <Button onClick={() => dispatch({ action: 'increment' })}>+</Button>

                    <Toggle>
                        {({ isToggled, setToggle }) => (
                            <>
                                <Button onClick={() => setToggle(true)}>Set</Button>

                                {isToggled && (
                                    <SetLifeModal
                                        isToggled={isToggled}
                                        setToggle={setToggle}
                                        lifeTotal={lifeTotal}
                                        handleNewLifeTotal={newLifeTotal =>
                                            dispatch({ action: 'set', value: newLifeTotal })
                                        }
                                    />
                                )}
                            </>
                        )}
                    </Toggle>

                    <Button onClick={() => dispatch({ action: 'decrement' })}>-</Button>
                </PlayerLifeButtons>
            </PlayerCardBody>

            <RemovePlayerButton onClick={removePlayer}>&times;</RemovePlayerButton>
        </Wrapper>
    );
};

export default PlayerCard;

const Wrapper = styled(Card).attrs({ as: 'article' })`
    position: relative;
`;

const PlayerCardBody = styled(CardBody)`
    display: flex;
    justify-content: space-between;
`;

const PlayerLifeTotal = styled.p`
    font-size: 1.5rem;
`;

const PlayerLifeButtons = styled.div`
    > button {
        margin: 0 ${spacing.xs};
    }
`;

const RemovePlayerButton = styled.button`
    cursor: pointer;
    ${absolute({ x: 'right' })};
    padding: ${spacing.sm};
    font-size: 1.5rem;
    font-weight: bolder;
    background: transparent;
    border: none;
`;
