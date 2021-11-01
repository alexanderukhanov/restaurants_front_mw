import axios from 'axios'

class RestaurantsService {
    public createRestaurantRequest = async (restaurantData: any) => (
        axios.post('http://localhost:4001/api/restaurants', restaurantData)
    )
};

export default new RestaurantsService();
