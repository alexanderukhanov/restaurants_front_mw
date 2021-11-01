import { CREATE_RESTAURANT_FAILURE, CREATE_RESTAURANT_START, CREATE_RESTAURANT_SUCCESS } from './types';

const initialState = {
    restaurants: [],
    loading: false,
    error: null,
}

export const restaurants = (state = initialState, action: any) => {
    switch (action.type) {
        case CREATE_RESTAURANT_SUCCESS:
            return {
                ...state,
                restaurants: action.payload,
                loading: false,
                error: null,
            }
        case CREATE_RESTAURANT_START:
            return {
                ...state,
                loading: true,
            }

        case CREATE_RESTAURANT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }

        default:
            return state;
    }
}
