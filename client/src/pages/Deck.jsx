import React from 'react';

const Deck = ({
    match: {
        params: { deckName },
    },
}) => {
    return <p>{deckName}</p>;
};

export default Deck;
