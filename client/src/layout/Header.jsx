import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Banner, Button } from 'elements';
import { spacing, dark } from 'utilities';

const Header = () => {
    return (
        <HeaderWrapper>
            <ManaBanner />
            <Title>Welcome to Decked Out</Title>
            <SignIn as={Link} to='/login'>
                Log In
            </SignIn>
        </HeaderWrapper>
    );
};

export default Header;

const HeaderWrapper = styled.header`
    grid-area: header;
    text-align: center;
    padding-bottom: ${spacing.md};
    display: grid;
    grid-template-rows: repeat(3, max-content);
`;

const Title = styled.h1`
    margin: 0;
    margin-top: ${spacing.sm};
`;

const ManaBanner = styled(Banner)``;

const SignIn = styled(Button)`
    text-decoration: none;
    color: ${dark};
`;
