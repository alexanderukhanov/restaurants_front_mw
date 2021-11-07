import { CREATE_RESTAURANT_FAILURE } from './types';

const initialState = {
    restaurants: [],
    errors: [],
};

export const restaurants = (state = initialState, action: any) => {
    switch (action.type) {
        case CREATE_RESTAURANT_FAILURE:
            return {
                ...state,
                errors: state.errors.concat(action.payload),
            };

        default:
            return state;
    }
};
