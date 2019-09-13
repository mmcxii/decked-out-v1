import styled from 'styled-components';

const ManaSymbol = styled.i`
    font-size: 2.5rem;
    --fa-secondary-opacity: 1;
    --fa-primary-color: ${props => props.primary};
    --fa-secondary-color: ${props => props.secondary};
`;

export default ManaSymbol;
