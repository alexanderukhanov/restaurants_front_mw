import UsersService from '../../../services/UsersService';
import {
    SET_USER_PROFILE,
    USERS_ERRORS,
    CLEAR_USERS_ERRORS,
    UserDataToLogin,
    UserProfile,
} from './types';
import { Dispatch } from 'redux';
import { push } from 'connected-react-router';

export const loginAndGetProfileRequest = (data: UserDataToLogin) => (
    async (dispatch: Dispatch) => {
        const result = await UsersService.login(data).catch((e) => {
            const {error} = e.response.data;
            dispatch(usersErrors(error ?? e.response.data));
        });

        if (!result) {
            return;
        }

        if (!document.cookie.match('ExpressGeneratorTs')) {
            document.cookie = `ExpressGeneratorTs=123; expires=${new Date(new Date().getTime() + 259200 * 1000).toUTCString()}; path=/; secure; SameSite=None`;
        }

        dispatch(getUserProfileRequest() as any);
        dispatch(push('/'));
    }
);

export const getUserProfileRequest = () => (
    async (dispatch: Dispatch) => {
        const userProfile = await UsersService.getUserProfile().catch((e) => {
            dispatch(usersErrors(e.message));
        });

        userProfile && dispatch(getProfileSuccess(userProfile));
    }
);

export const getProfileSuccess = (payload: UserProfile) => ({
    type: SET_USER_PROFILE,
    payload,
}) as const;


export const usersErrors = (payload: string) => ({
    type: USERS_ERRORS,
    payload,
}) as const;

export const clearUsersErrors = () => ({
    type: CLEAR_USERS_ERRORS,
}) as const;

export const handleLogout = () => {
    document.cookie = `ExpressGeneratorTs=123; expires=${new Date(new Date().getTime() -1).toUTCString()}; path=/; secure; SameSite=None`;
    return  UsersService.logout();
};

export type UserStateActionsTypes = ReturnType<typeof getProfileSuccess>
    | ReturnType<typeof usersErrors>
    | ReturnType<typeof clearUsersErrors>;

