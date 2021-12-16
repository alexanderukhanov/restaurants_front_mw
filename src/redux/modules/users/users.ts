import {
    USERS_ERRORS,
    SET_USER_PROFILE,
    CLEAR_USERS_ERRORS,
    UsersState,
} from './types';
import { UserStateActionsTypes } from './actions';

const initialState: UsersState = {
    profile: {
        id: 0,
        role: 'user',
        email: '',
        password: '',
    },
    errors: [],
};

export const users = (
    state = initialState,
    action: UserStateActionsTypes
): UsersState => {
    switch (action.type) {
        case SET_USER_PROFILE: {
            return {
                ...state, profile: action.payload
            };
        }

        case USERS_ERRORS: {
            return {
                ...state,
                errors: state.errors
                    .filter((error) => error !== action.payload)
                    .concat(action.payload)
            };
        }

        case CLEAR_USERS_ERRORS: {
            return {
                ...state,
                errors: [],
            };
        }

        default:
            return state;
    }
};
