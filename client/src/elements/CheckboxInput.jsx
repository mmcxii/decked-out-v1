//* Packages
import styled from 'styled-components';

//* Utilities
import { spacing, transition } from 'utilities';

//* Styled Components
export const CheckboxInput = styled.input.attrs({ type: 'checkbox' })`
    border: none;
    size: 16px;
    clip: rect(0 0 0 0);
    overflow: hidden;
    position: relative;
    white-space: nowrap;
    margin: ${spacing.xs};
    ${transition({ prop: 'border' })};

    &:hover {
        border: 3px solid red;
    }
`;

export const StyledCheckbox = styled.div`
    display: inline-block;
    width: 16px;
    height: 16px;
    background: ${props => (props.checked ? 'salmon' : 'papayawhip')};
    border-radius: 3px;
    transition: all 150ms;
`;
