//* Packages
import styled from 'styled-components';

//* Utilities
import { spacing } from 'utilities';

//* Styled Components
export const CardDisplay = styled.article`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
`;

export const CardImage = styled.img`
    height: 250px;
    margin: ${spacing.xs};
    cursor: pointer;
`;
