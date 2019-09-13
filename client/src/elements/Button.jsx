import styled from 'styled-components';
import { rounded, spacing, manaBlue, manaBlue2, transition } from 'utilities';

const Button = styled.button`
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

export default Button;