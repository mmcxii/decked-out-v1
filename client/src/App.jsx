//* Packages
import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Normalize from 'react-normalize';
import styled from 'styled-components';

//* Utilities
import { light, spacing, PrivateRoute } from 'utilities';

//* Layout Elements
import { Container, Footer, Header, Navbar } from 'layout';

//* Pages
import { Account, CardSearch, CreateDeck, Deck, Lifetracker, Login } from 'pages';

//* Global Stylesheet
import './Global.scss';

const App = () => {
    //* App Level State:
    //* User Object, stores users name when signed in from '/login'
    const [user, setUser] = useState(null);

    return (
        <BrowserRouter>
            <Normalize />

            <AppWrapper>
                {/* Static Layout Components */}
                <Header user={user} />
                <Navbar user={user} />
                <Footer />

                {/* Pages */}
                <PageWrapper>
                    <Switch>
                        <>
                            <Route exact path='/' render={() => <Lifetracker user={user} />} />
                            <PrivateRoute
                                isLoggedIn={user}
                                exact
                                path='/account'
                                component={Account}
                                user={user}
                            />
                            <Route path='/account/:deckname' component={Deck} />
                            <Route path='/login' render={() => <Login setUser={setUser} />} />
                            <Route path='/createdeck' component={CreateDeck} />
                            <Route path='/cardsearch' component={CardSearch} />
                        </>
                    </Switch>
                </PageWrapper>
            </AppWrapper>
        </BrowserRouter>
    );
};

export default App;

const AppWrapper = styled(Container)`
    min-height: 100vh;
    display: grid;
    grid-template-columns: var(--margin) 1fr var(--margin);
    grid-template-rows: max-content 1fr max-content;
    grid-template-areas:
        '. header .'
        '. content .'
        '. footer .';
    color: ${light};
    font-family: 'Sorts Mill Goudy', serif;
    padding-top: ${spacing.md};
    padding-bottom: ${spacing.xxl};
`;

const PageWrapper = styled.main`
    grid-area: content;
`;
