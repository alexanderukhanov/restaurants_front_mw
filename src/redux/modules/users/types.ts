export const SET_USER_PROFILE = 'SET_USER_PROFILE';
export const USERS_ERRORS = 'USERS_ERRORS';
export const CLEAR_USERS_ERRORS = 'CLEAR_USERS_ERRORS';

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
