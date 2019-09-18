import React from 'react';

import { Toggle } from 'utilities';
import { Button } from 'elements';
import RollDiceModal from './RollDiceModal';

const RollDice = () => {
    return (
        <Toggle>
            {({ isToggled, setToggle }) => (
                <>
                    <Button onClick={() => setToggle(true)}>Roll Dice</Button>

                    {isToggled && <RollDiceModal isToggled={isToggled} setToggle={setToggle} />}
                </>
            )}
        </Toggle>
    );
};

export default RollDice;
