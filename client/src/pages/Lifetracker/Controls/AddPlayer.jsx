//* Packages
import React from 'react';

//* Utilities
import { Toggle } from 'utilities';

//* Elements
import { Button } from 'elements';
import AddPlayerModal from './AddPlayerModal';

const AddPlayer = ({ players, setPlayers }) => {
    return (
        <Toggle>
            {({ isToggled, setToggle }) => (
                <>
                    <Button onClick={() => setToggle(true)}>Add New Player</Button>

                    {isToggled && (
                        <AddPlayerModal
                            isToggled={isToggled}
                            setToggle={setToggle}
                            players={players}
                            setPlayers={setPlayers}
                        />
                    )}
                </>
            )}
        </Toggle>
    );
};

export default AddPlayer;
