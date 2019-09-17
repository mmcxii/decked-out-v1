import React from 'react';
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';
import { spacing, brown, rounded, fixed, light, absolute, transition } from 'utilities';
import { Container } from './Container';

const Navbar = ({ user }) => {
    const pages = [
        {
            name: 'Lifetracker',
            route: '/',
            icon: 'fad fa-swords',
        },
        {
            name: user ? user.username : 'Account',
            route: '/account',
            icon: 'fad fa-user',
        },
        {
            name: 'Oracle',
            route: '/cardsearch',
            icon: 'fad fa-search',
        },
    ];

    return (
        <Nav>
            <NavContainer>
                {pages.map((link, index) => (
                    <NavLink key={index} exact to={link.route}>
                        <NavIcon className={link.icon} />

                        {link.name}
                    </NavLink>
                ))}
            </NavContainer>
        </Nav>
    );
};

export default Navbar;

const Nav = styled.nav`
    ${fixed({ y: 'bottom' })};
    padding: ${spacing.sm};
    background: ${brown};
    width: 100%;
    border-top-left-radius: ${rounded};
    border-top-right-radius: ${rounded};
`;

const NavContainer = styled(Container)`
    margin: 0 var(--margin);
    display: grid;
    grid-auto-flow: column;
    justify-content: space-evenly;
`;

const NavLink = styled(Link)`
    position: relative;

    &::after {
        content: '';
        height: 2px;
        width: 100%;
        background: ${light};
        transform: scaleX(0);
        ${absolute({ y: 'bottom' })};
        ${transition({ prop: 'transform' })}
    }
    &.active {
        &::after {
            transform: scaleX(1);
        }
    }
`;

const NavIcon = styled.i`
    margin-right: ${spacing.sm};
`;
