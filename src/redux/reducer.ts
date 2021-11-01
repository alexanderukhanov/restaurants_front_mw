import { combineReducers } from "redux";
import { users } from "./modules/users/users";
import { restaurants } from './modules/restaurants/restaurants';

export const rootReducer = combineReducers({
    users,
    restaurants,
})
