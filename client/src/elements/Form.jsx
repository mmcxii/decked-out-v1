//* Packages
import styled from 'styled-components';

//* Utilities
import { rounded, spacing, dark, manaBlue2, manaBlue } from 'utilities';

//* Styled Components
export const Form = styled.form`
    display: flex;
    flex-direction: column;

    > input,
    > div {
        margin: ${spacing.sm} 0;
    }
`;

export const FormLabel = styled.label`
    padding-left: ${spacing.sm};
`;

export const FormInput = styled.input`
    border-radius: ${rounded};
    border: none;
    padding: ${spacing.sm} ${spacing.md};
    background: ${manaBlue2};
    color: ${dark};
`;

export const FormGroupWithIcon = styled.div`
    display: grid;
    grid-template-columns: max-content 1fr;
    grid-template-rows: repeat(2, max-content);
    grid-template-areas:
        'icon label'
        'icon input';
    align-items: center;

    > i {
        grid-area: icon;
        margin-right: ${spacing.sm};
        font-size: 2rem;
        color: ${manaBlue};
    }

    > label {
        grid-area: label;
    }

    > input {
        grid-area: input;
    }
`;
