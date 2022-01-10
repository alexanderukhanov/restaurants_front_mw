import {
    RESTAURANTS_ERRORS,
    CREATE_RESTAURANT_SUCCESS,
    GET_RESTAURANTS_DATA_SUCCESS,
    CLEAR_RESTAURANTS_ERRORS,
    CREATE_ORDER_SUCCESS,
    RestaurantState,
} from './types';
import { RestaurantStateActionTypes } from './actions';

const initialState: RestaurantState = {
    restaurants: [],
    isNewRestaurantCreated: false,
    isNewOrderCreated: false,
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
        case CREATE_ORDER_SUCCESS:
            return {
                ...state,
                isNewOrderCreated: action.payload,
            };

        case GET_RESTAURANTS_DATA_SUCCESS:
            return {
                ...state,
                restaurants: action.payload,
            };

        case RESTAURANTS_ERRORS:
            return {
                ...state,
                errors: state.errors
                    .filter((error) => error !== action.payload)
                    .concat(action.payload),
            };

        case CLEAR_RESTAURANTS_ERRORS:
            return {
                ...state,
                errors: [],
            };

        default:
            return state;
    }
};
