import React from 'react';
import styled from 'styled-components';
import { Banner } from 'elements';
import { spacing } from 'utilities';

const Header = () => {
    return (
        <HeaderWrapper>
            <Banner />
            <Title>Welcome to Decked Out</Title>
        </HeaderWrapper>
    );
};

export default Header;

const HeaderWrapper = styled.header`
    grid-area: header;
    text-align: center;
    padding-bottom: ${spacing.md};
`;

const Title = styled.h1`
    margin: 0;
    margin-top: ${spacing.sm};
`;
