//* Packages
import styled from 'styled-components';
import { Link } from 'react-router-dom';

//* Utilities
import { rounded, spacing, manaBlue, manaBlue2, transition } from 'utilities';

//* Styled Components
export const Button = styled.button`
    cursor: pointer;
    border-radius: ${rounded};
    padding: ${spacing.sm} ${spacing.md};
    border: none;
    font-weight: bolder;
    background: ${manaBlue2};
    ${transition({ prop: 'background' })}

    &:hover {
        background: ${manaBlue};
    }
`;

export const ButtonLink = styled(Link)`
    display: inline-block;
    text-align: center;
    margin: ${spacing.xs} 0;
    cursor: pointer;
    border-radius: ${rounded};
    padding: ${spacing.sm} ${spacing.md};
    border: none;
    font-weight: bolder;
    background: ${manaBlue2};
    ${transition({ prop: 'background' })};

    &:hover {
        background: ${manaBlue};
    }
`;

export const ButtonGroup = styled.div`
    display: flex;
    flex-direction: column;

    > * {
        width: 100%;
        margin: ${spacing.xs} 0;
    }

    @media screen and (min-width: 768px) {
        flex-direction: row;
        justify-content: space-evenly;

        > * {
            margin: 0 ${spacing.xs};
        }
    }
`;
