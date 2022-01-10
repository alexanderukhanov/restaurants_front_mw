import React, { createContext, Dispatch, SetStateAction, useState } from 'react';
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
import Cart from './components/Cart/Cart';
import { DishDataWithAmount } from './redux/modules/restaurants/types';

export const Context = createContext<[
    Array<DishDataWithAmount>,
    Dispatch<SetStateAction<Array<DishDataWithAmount>>>
]>(
    [[], () => {
    }]
);

function App() {
    const [context, setContext] = useState<Array<DishDataWithAmount>>([]);

    return (
        <Provider store={store}>
            <Router history={history}>
                <Route path='/' component={Header}/>
                <Route path='/' component={Notifier}/>
                <Context.Provider value={[context, setContext]}>
                    <Route path='/' render={({location: {pathname}}) => {
                        if (['/login', '/dashboard'].includes(pathname)) return null;
                        return <Cart/>;
                    }}/>
                </Context.Provider>
                <Route exact path='/' component={MainContent}/>
                <Context.Provider value={[context, setContext]}>
                    <Route exact path='/restaurant/:id' render={({match}) => (
                        <Dishes restaurantId={Number(match.params.id)}/>
                    )}/>
                </Context.Provider>
                <Route exact path='/login' component={Login}/>
                <Route exact path='/dashboard' component={Dashboard}/>
            </Router>
        </Provider>
    );
}

export default App;
