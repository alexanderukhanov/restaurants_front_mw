import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import store from './redux/store';

import Header from "./components/Header";

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route path='/' component={Header}/>
                </Switch>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
