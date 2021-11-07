import BaseService from './BaseService';
import { addRestaurant } from '../redux/modules/restaurants/types';

class RestaurantsService extends BaseService {
    public createRestaurantRequest = async (restaurantData: addRestaurant) => (
        this.httpClient.post('restaurants/add', restaurantData)
    )
}

export default new RestaurantsService();
