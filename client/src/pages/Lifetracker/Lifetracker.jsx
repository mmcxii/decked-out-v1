import React, { useState } from 'react';
import styled from 'styled-components';

import { spacing } from 'utilities';

import Controls from './Controls';
import PlayerCard from './PlayerCard';

const Lifetracker = ({ user }) => {
    const [players, setPlayers] = useState([{ name: user.username, lifeTotal: 20 }]);

    return (
        <>
            <h2>Lifetracker</h2>
            <Controls players={players} setPlayers={setPlayers} />

            <PlayersSection>
                {players.map((player, index) => (
                    <PlayerCard
                        key={index}
                        player={player}
                        removePlayer={() =>
                            setPlayers(players.filter(player => players.indexOf(player) !== index))
                        }
                    />
                ))}
            </PlayersSection>
        </>
    );
};

export default Lifetracker;

const PlayersSection = styled.section`
    display: grid;
    grid-gap: ${spacing.sm};
    padding: ${spacing.md} 0;

    @media screen and (min-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }
`;
