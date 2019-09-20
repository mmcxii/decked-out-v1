//* Packages
import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Normalize from 'react-normalize';
import styled, { createGlobalStyle } from 'styled-components';

//* Utilities
import { light, spacing, PrivateRoute } from 'utilities';

//* Layout Elements
import { Container, Footer, Header, Navbar } from 'layout';

//* Pages
import { Account, CardSearch, CreateDeck, CreateUser, Deck, Lifetracker, Login } from 'pages';

const App = () => {
    //* App Level State:
    //* User Object, stores users name when signed in from '/login'
    const [user, setUser] = useState(null);

    return (
        <BrowserRouter>
            <Normalize />
            <GlobalStyles />

            <AppWrapper>
                <Header user={user} />
                <Navbar user={user} />

                {/* Pages */}
                <PageWrapper>
                    <Switch>
                        <Route exact path='/' render={() => <Lifetracker user={user} />} />
                        <PrivateRoute
                            isLoggedIn={user}
                            exact
                            path='/account'
                            component={Account}
                            user={user}
                            setUser={setUser}
                        />
                        <PrivateRoute isLoggedIn={user} path='/account/:deckname' component={Deck} />
                        <Route path='/login' render={() => <Login setUser={setUser} />} />
                        <Route path='/createuser' render={() => <CreateUser setUser={setUser} />} />
                        <Route path='/createdeck' component={CreateDeck} />
                        <Route path='/cardsearch' component={CardSearch} />
                    </Switch>
                </PageWrapper>

                <Footer />
            </AppWrapper>
        </BrowserRouter>
    );
};

export default App;

//* Styled Components
const GlobalStyles = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Sorts+Mill+Goudy&display=swap');

    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    html,
    body {
        background: rgb(69, 53, 25);
        font-family: 'Sorts Mill Goudy', serif;

    }

    a {
        color: inherit;
        text-decoration: none;
    }

`;

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
    padding-top: ${spacing.md};
    padding-bottom: ${spacing.xxl};
`;

const PageWrapper = styled.main`
    grid-area: content;
`;
