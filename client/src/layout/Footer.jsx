//* Packages
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Footer = () => {
    return (
        <FooterWrapper>
            <ByLine to='/teamtaco'>Team Taco &copy;2019</ByLine>

            <Disclaimer>
                Magic the Gathering, FNM is TM and copyright Wizards of the Coast, Inc, a subsidiary of
                Hasbro, Inc. All rights reserved. This site is <em>unaffiliated</em>. Articles and comments
                are user-submitted and do not represent official endorsements of this site.
            </Disclaimer>
        </FooterWrapper>
    );
};

export default Footer;

//* Styled Components
const FooterWrapper = styled.footer`
    grid-area: footer;
    text-align: center;
`;

const ByLine = styled(Link)`
    text-transform: capitalize;
`;

const Disclaimer = styled.p`
    font-size: 0.8rem;
`;
