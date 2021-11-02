import axios from 'axios';

class BaseService {
    public get apiUrl() {
        return process.env.REACT_APP_BACKEND_URL;
    }

    protected get httpClient() {
        return axios.create({baseURL: this.apiUrl, withCredentials: true});
    }
}

export default BaseService;
