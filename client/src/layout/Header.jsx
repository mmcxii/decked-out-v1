import React from 'react';
import styled from 'styled-components';

const Header = () => {
    return <HeaderWrapper>hello from the header</HeaderWrapper>;
};

export default Header;

const HeaderWrapper = styled.header`
    grid-area: header;
`;
