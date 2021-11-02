export const SET_USER_PROFILE = 'SET_USER_PROFILE';
export const GET_USER_PROFILE_FAIL = 'GET_USER_PROFILE_FAIL';
export const LOGIN_FAIL = 'LOGIN_FAIL';

export type UsersState = {
    profile: UserProfile,
    errors: string[],
}

export type UserDataToLogin = {
    email: string,
    password: string,
}

export type UserProfile = UserDataToLogin & {
    id: number,
    role: 'user' | 'admin',
}
