import React from 'react';
import styled from 'styled-components';
import ManaSymbol from './ManaSymbol';
import {
    spacing,
    manaWhite,
    manaWhite2,
    manaBlue,
    manaBlue2,
    manaBlack,
    manaBlack2,
    manaRed,
    manaRed2,
    manaGreen,
    manaGreen2,
} from 'utilities';

const Banner = () => {
    const ManaSymbols = [
        {
            classNames: 'fad fa-sun',
            primary: manaWhite,
            secondary: manaWhite2,
        },
        {
            classNames: 'fad fa-tint',
            primary: manaBlue2,
            secondary: manaBlue,
        },
        {
            classNames: 'fad fa-skull',
            primary: manaBlack2,
            secondary: manaBlack,
        },
        {
            classNames: 'fad fa-fire',
            primary: manaRed2,
            secondary: manaRed,
        },
        {
            classNames: 'fad fa-tree-alt',
            primary: manaGreen,
            secondary: manaGreen2,
        },
    ];
    return (
        <ManaBanner>
            {ManaSymbols.map(({ classNames, primary, secondary }, index) => (
                <ManaSymbol key={index} className={classNames} primary={primary} secondary={secondary} />
            ))}
        </ManaBanner>
    );
};

export default Banner;

const ManaBanner = styled.div`
    display: flex;
    justify-content: space-evenly;
    padding: ${spacing.sm};
`;
