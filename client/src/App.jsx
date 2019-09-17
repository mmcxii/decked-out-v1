//* Packages
import React, { useState } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Normalize from 'react-normalize';
import styled from 'styled-components';

//* Utilities
import { light, spacing } from 'utilities';

//* Layout Elements
import { Footer, Header } from 'layout';

//* Pages
import { Account, CardSearch, CreateDeck, Deck, Lifetracker, Login } from 'pages';

//* Global Stylesheet
import './Global.scss';

const App = () => {
    //* App Level State:
    //* User Object, stores users name when signed in from '/login'
    const [user, setUser] = useState({ username: 'nicholas' });

    return (
        <BrowserRouter>
            <Normalize />

            <AppWrapper>
                <Header user={user} />

                <PageWrapper>
                    <Switch>
                        <>
                            {user ? (
                                <>
                                    <Route exact path='/' render={props => <Lifetracker user={user} />} />
                                    <Route exact path='/account' render={props => <Account user={user} />} />
                                    <Route path='/account/:deckname' component={Deck} />
                                    <Route path='/login' render={props => <Login setUser={setUser} />} />
                                    <Route path='/createdeck' component={CreateDeck} />
                                    <Route path='/cardsearch' component={CardSearch} />
                                </>
                            ) : (
                                <>
                                    <Redirect to='/login' />
                                    <Route path='/login' render={props => <Login setUser={setUser} />} />
                                </>
                            )}
                        </>
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
