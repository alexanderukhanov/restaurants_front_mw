import BaseService from './BaseService';
import { AddRestaurant, OrderData, UpdateRestaurant } from '../redux/modules/restaurants/types';

class RestaurantsService extends BaseService {
    public createRestaurantRequest = async (restaurantData: AddRestaurant) => (
        this.httpClient.post('restaurants/add', restaurantData)
    )

    public getRestaurantsData = async () => (
        this.httpClient.get('restaurants/all')
    )

    public updateRestaurantLike = async (restaurantData: UpdateRestaurant) => (
        this.httpClient.put('restaurants/likeRestaurant', restaurantData)
    )

    public createOrder = async (orderData: OrderData) => (
        this.httpClient.post('orders/add', orderData)
    )
}

export default new RestaurantsService();
