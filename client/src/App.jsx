import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Normalize from 'react-normalize';
import styled from 'styled-components';

import Header from './layout/Header';
import Footer from './layout/Footer';
import Lifetracker from 'pages/Lifetracker';
import Login from 'pages/Login';
import Account from 'pages/Account';
import Cardsearch from 'pages/Cardsearch';
import { light, spacing } from 'utilities';

import './Global.css';

const App = () => {
    return (
        <BrowserRouter>
            <Normalize />

            <AppWrapper>
                <Header />

                <PageWrapper>
                    <Switch>
                        <Route exact path='/' component={Lifetracker} />
                        <Route path='/login' component={Login} />
                        <Route path='/account' component={Account} />
                        <Route path='/cardsearch' component={Cardsearch} />
                    </Switch>
                </PageWrapper>

                <Footer />
            </AppWrapper>
        </BrowserRouter>
    );
};

export default App;

const AppWrapper = styled.div`
    --margin: 0.5rem;

    margin: 0 var(--margin);

    @media screen and (min-width: 576px) {
        --margin: 1rem;
    }
    @media screen and (min-width: 768px) {
        --margin: 2rem;
    }
    @media screen and (min-width: 992px) {
        --margin: 4rem;
    }
    @media screen and (min-width: 1200px) {
        --margin: 10%;
    }

    min-height: 100vh;
    display: grid;
    grid-template-columns: --margin 1fr --margin;
    grid-template-rows: max-content 1fr max-content;
    grid-template-areas:
        '. header .'
        '. content .'
        '. footer .';
    color: ${light};
    font-family: 'Sorts Mill Goudy', serif;
    padding: ${spacing.md} 0;
`;

const PageWrapper = styled.main`
    grid-area: content;
`;
