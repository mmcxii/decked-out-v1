//* Packages
import styled from 'styled-components';

//* Utilities
import { rounded, spacing, manaWhite, manaWhite2, elevation, transition, dark } from 'utilities';

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
