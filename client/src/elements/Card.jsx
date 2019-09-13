import styled from 'styled-components';
import { rounded, spacing, manaWhite, manaWhite2, elevation, transition, dark } from 'utilities';

const Card = styled.div`
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

const CardHeader = styled.h3`
    border-radius: ${rounded};
    padding: ${spacing.md};
    background: ${manaWhite2};
`;

const CardBody = styled.div`
    padding: ${spacing.md};
`;

export { Card, CardHeader, CardBody };
