//* Packages
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

//* Utilities
import { spacing, dark } from 'utilities';

//* Elements
import { Banner, ButtonLink } from 'elements';

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

//* Styled Components
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
    color: ${dark};
`;
