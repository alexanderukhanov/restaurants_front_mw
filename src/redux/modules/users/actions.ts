import UsersService from '../../../services/UsersService';
import {
    GET_USER_PROFILE_FAIL,
    LOGIN_FAIL,
    SET_USER_PROFILE,
    UserDataToLogin,
    UserProfile
} from './types';
import { Dispatch } from 'redux';
import { push } from 'connected-react-router';

export const loginAndGetProfileRequest = (data: UserDataToLogin) => (
    async (dispatch: Dispatch) => {
        const result = await UsersService.login(data).catch((e) => {
            dispatch(loginFailure(e.message));
        });

        if (!result) {
            return;
        }

        dispatch(getUserProfileRequest() as any);
    }
);

export const getUserProfileRequest = () => (
    async (dispatch: Dispatch) => {
        const userProfile = await UsersService.getUserProfile().catch((e) => {
            dispatch(getProfileFailure(e.message));
        });

        userProfile && dispatch(getProfileSuccess(userProfile));
        dispatch(push('/'));
    }
);

export const getProfileSuccess = (payload: UserProfile) => ({
    type: SET_USER_PROFILE,
    payload,
}) as const;

export const loginFailure = (payload: string) => ({
    type: LOGIN_FAIL,
    payload,
}) as const;

export const getProfileFailure = (payload: string) => ({
    type: GET_USER_PROFILE_FAIL,
    payload,
}) as const;

export const handleLogout = () => (
    UsersService.logout()
);

export type UserStateActionsTypes = ReturnType<typeof getProfileSuccess>
    | ReturnType<typeof getProfileFailure>
    | ReturnType<typeof loginFailure>;

