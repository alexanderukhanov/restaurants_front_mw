import { History } from 'history';

import { combineReducers } from "redux";
import { users } from "./modules/users/users";
import { restaurants } from './modules/restaurants/restaurants';
import { connectRouter } from "connected-react-router";

export const rootReducer = (history: History) => combineReducers({
    router: connectRouter(history),
    users,
    restaurants
});
