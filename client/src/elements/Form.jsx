import styled from 'styled-components';
import { rounded, spacing, dark, manaBlue2 } from 'utilities';

const Form = styled.form`
    display: flex;
    flex-direction: column;

    > input {
        margin: ${spacing.sm} 0;
    }
`;

const FormLabel = styled.label`
    padding-left: ${spacing.sm};
`;

const FormInput = styled.input`
    border-radius: ${rounded};
    border: none;
    padding: ${spacing.sm} ${spacing.md};
    background: ${manaBlue2};
    color: ${dark};
`;

export { Form, FormInput, FormLabel };
