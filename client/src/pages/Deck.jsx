import React from 'react';

const Deck = ({
    match: {
        params: { deckname },
    },
}) => {
    const deckName = deckname.split('-').join(' ');

    return <p>{deckName}</p>;
};

export default Deck;
