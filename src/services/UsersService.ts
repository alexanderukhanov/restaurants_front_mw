import { UserDataToLogin, UserProfile } from '../redux/modules/users/types';
import BaseService from './BaseService';

class UsersService extends BaseService {
    public login = (userData: UserDataToLogin) => (
        this.httpClient.post('auth/login', userData)
    )

    public logout = () => (
        this.httpClient.get('auth/logout')
    )

    public getUserProfile = (): Promise<UserProfile> => (
        this.httpClient.get('users/profile').then((response) => response.data)
    )
}

export default new UsersService();
