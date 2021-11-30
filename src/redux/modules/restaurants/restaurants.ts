import {
    RESTAURANTS_ERROR,
    CREATE_RESTAURANT_SUCCESS,
    GET_RESTAURANTS_DATA_SUCCESS,
    RestaurantState,
} from './types';
import { RestaurantStateActionTypes } from './actions';

const initialState: RestaurantState = {
    restaurants: [],
    isNewRestaurantCreated: false,
    errors: [],
};

export const restaurants = (
    state = initialState,
    action: RestaurantStateActionTypes
): RestaurantState => {
    switch (action.type) {
        case CREATE_RESTAURANT_SUCCESS:
            return {
                ...state,
                isNewRestaurantCreated: action.payload,
            };

        case GET_RESTAURANTS_DATA_SUCCESS:
            return {
                ...state,
                restaurants: action.payload,
            };

        case RESTAURANTS_ERROR:
            return {
                ...state,
                errors: state.errors.concat(action.payload),
            };

        default:
            return state;
    }
};
