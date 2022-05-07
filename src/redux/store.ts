import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from 'history';
import { routerMiddleware } from "connected-react-router";

import { rootReducer } from "./reducer";

export const history = createBrowserHistory();
const reducer = rootReducer(history);

const store = createStore(
    reducer,
    compose(
        applyMiddleware(thunk, routerMiddleware(history)),
        (window as any).__REDUX_DEVTOOLS_EXTENSION__
            ? (window as any).__REDUX_DEVTOOLS_EXTENSION__()
            : (f: any) => f
    )
);

export default store;

export type AppState = ReturnType<typeof reducer>
