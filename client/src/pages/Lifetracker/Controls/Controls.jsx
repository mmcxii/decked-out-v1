import React from 'react';
import styled from 'styled-components';

import { spacing } from 'utilities';

import RollDice from './RollDice';
import TossCoin from './TossCoin';
import AddPlayer from './AddPlayer';

const Controls = ({ players, setPlayers }) => {
    return (
        <Wrapper>
            <RollDice />
            <TossCoin />
            <AddPlayer players={players} setPlayers={setPlayers} />
        </Wrapper>
    );
};

export default Controls;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;

    > button {
        width: 100%;
        margin: ${spacing.xs} 0;
    }

    @media screen and (min-width: 768px) {
        flex-direction: row;
        justify-content: space-evenly;

        > button {
            margin: 0 ${spacing.xs};
        }
    }
`;
