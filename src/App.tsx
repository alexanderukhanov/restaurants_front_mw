import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import { Route, Router } from 'react-router-dom';
import store, { history } from './redux/store';

import Header from "./components/Header/Header";
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
    return (
        <Provider store={store}>
            <Router history={history}>
                <Route path='/' component={Header}/>
                <Route exact path='/login' component={Login}/>
                <Route exact path='/dashboard' component={Dashboard}/>
            </Router>
        </Provider>
    );
}

export default App;
