import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Normalize from 'react-normalize';
import styled from 'styled-components';

import Header from './layout/Header';
import Footer from './layout/Footer';
import Lifetracker from './pages/Lifetracker';
import Example from './Example';

const App = () => {
    return (
        <BrowserRouter>
            <Normalize />

            <AppWrapper>
                <Header />

                <Switch>
                    <Route exact path='/' component={Lifetracker} />
                    <Route path='/example' component={Example} />
                </Switch>

                <Footer />
            </AppWrapper>
        </BrowserRouter>
    );
};

export default App;

const AppWrapper = styled.div`
    min-height: 100vh;
    display: grid;
    grid-template-rows: max-content 1fr max-content;
    grid-template-areas:
        'header'
        'content'
        'footer';
`;
