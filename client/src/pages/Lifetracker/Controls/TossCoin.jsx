import React from 'react';

import { Toggle } from 'utilities';
import { Button } from 'elements';
import TossCoinModal from './TossCoinModal';

const TossCoin = () => {
    return (
        <Toggle>
            {({ isToggled, setToggle }) => (
                <>
                    <Button onClick={() => setToggle(true)}>Toss A Coin</Button>
                    {isToggled && <TossCoinModal isToggled={isToggled} setToggle={setToggle} />}
                </>
            )}
        </Toggle>
    );
};

export default TossCoin;
