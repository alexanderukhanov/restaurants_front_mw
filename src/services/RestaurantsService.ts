import BaseService from './BaseService';

class RestaurantsService extends BaseService{
    public createRestaurantRequest = async (restaurantData: any) => (
        this.httpClient.post('api/restaurants', restaurantData)
    )
}

export default new RestaurantsService();
