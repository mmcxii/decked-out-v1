import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Banner, ButtonLink } from 'elements';
import { spacing, dark } from 'utilities';

const Header = ({ user }) => {
    return (
        <HeaderWrapper>
            <Banner />
            <Title>Welcome to Decked Out</Title>
            {user ? (
                <SubTitle>
                    Welcome back <Link to='/account'>{user.username}</Link>
                </SubTitle>
            ) : (
                <SignIn to='/login'>Log In</SignIn>
            )}
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

const SubTitle = styled.p`
    font-size: 1.25rem;
    font-weight: bolder;
`;

const SignIn = styled(ButtonLink)`
    /* text-decoration: none; */
    color: ${dark};
`;
