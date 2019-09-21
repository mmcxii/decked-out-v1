//* Packages
import styled from 'styled-components';

//* Utilities
import {
    rounded,
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
    elevation,
    transition,
    light,
    dark,
} from 'utilities';

//* Styled Components
export const Card = styled.div`
    border-radius: ${rounded};
    background: ${manaWhite};
    overflow: hidden;
    ${elevation[3]};
    ${transition({ prop: 'box-shadow' })};
    color: ${dark};

    &:hover {
        ${elevation[4]};
    }
`;

export const CardHeader = styled.h3`
    border-radius: ${rounded};
    padding: ${spacing.md};
    background: ${manaWhite2};
`;

export const CardBody = styled.div`
    padding: ${spacing.md};
`;

export const CardError = styled(Card)`
    background: ${manaRed2};
    box-shadow: none;

    &:hover {
        box-shadow: none;
    }

    ${CardHeader} {
        background: ${manaRed};
    }
`;

export const CardSuccess = styled(Card)`
    background: ${manaGreen2};
    box-shadow: none;

    &:hover {
        box-shadow: none;
    }

    ${CardHeader} {
        background: ${manaGreen};
    }
`;

export const CardColor = styled(Card)`
    background: ${props => `mana${props.color}`};
    background: ${props => {
        switch (props.color) {
            case 'White':
                return manaWhite2;
            case 'Blue':
                return manaBlue2;
            case 'Black':
                return manaBlack2;
            case 'Red':
                return manaRed2;
            case 'Green':
                return manaGreen2;
        }
    }};
    color: ${props => (props.color === 'Black' ? light : dark)};

    ${CardHeader} {
        background: ${props => {
            switch (props.color) {
                case 'White':
                    return manaWhite;
                case 'Blue':
                    return manaBlue;
                case 'Black':
                    return manaBlack;
                case 'Red':
                    return manaRed;
                case 'Green':
                    return manaGreen;
            }
        }};
    }
`;
