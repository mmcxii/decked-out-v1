//* Packages
import React from 'react';

//* Elements
import { ButtonGroup } from 'elements';
import RollDice from './RollDice';
import TossCoin from './TossCoin';
import AddPlayer from './AddPlayer';

const Controls = ({ players, setPlayers }) => {
    return (
        <ButtonGroup>
            <RollDice />
            <TossCoin />
            <AddPlayer players={players} setPlayers={setPlayers} />
        </ButtonGroup>
    );
};

export default Controls;
