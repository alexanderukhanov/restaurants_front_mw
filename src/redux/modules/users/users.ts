import {
    GET_USER_PROFILE_FAIL,
    LOGIN_FAIL,
    SET_USER_PROFILE,
    UsersState
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

        case LOGIN_FAIL: {
            return {
                ...state, errors: state.errors.concat(action.payload)
            };
        }

        case GET_USER_PROFILE_FAIL: {
            return {
                ...state, errors: state.errors.concat(action.payload)
            };
        }

        default:
            return state;
    }
};
