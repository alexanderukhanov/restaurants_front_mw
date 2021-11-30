import BaseService from './BaseService';
import { addRestaurant, updateRestaurant } from '../redux/modules/restaurants/types';

class RestaurantsService extends BaseService {
    public createRestaurantRequest = async (restaurantData: addRestaurant) => (
        this.httpClient.post('restaurants/add', restaurantData)
    )

    public getRestaurantsData = async () => (
        this.httpClient.get('restaurants/all')
    )

    public updateRestaurantLike = async (restaurantData: updateRestaurant) => (
        this.httpClient.put('restaurants/likeRestaurant', restaurantData)
    )
}

export default new RestaurantsService();
