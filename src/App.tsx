import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import { Route, Router } from 'react-router-dom';
import store, { history } from './redux/store';

import Header from "./components/Header/Header";
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import MainContent from './components/MainContent/MainContent';
import Dishes from './components/Dishes/Dishes';
import Notifier from './components/Notifier/Notifier';

function App() {
    return (
        <Provider store={store}>
            <Router history={history}>
                <Route path='/' component={Header}/>
                <Route path='/' component={Notifier}/>
                <Route exact path='/' component={MainContent}/>
                <Route exact path='/restaurant/:id' render={({match}) => (
                    <Dishes restaurantId={Number(match.params.id)}/>
                )}/>
                <Route exact path='/login' component={Login}/>
                <Route exact path='/dashboard' component={Dashboard}/>
            </Router>
        </Provider>
    );
}

export default App;
