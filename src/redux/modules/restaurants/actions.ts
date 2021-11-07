import { addRestaurant, CREATE_RESTAURANT_FAILURE } from './types';
import { Dispatch } from 'redux';
import RestaurantsService from '../../../services/RestaurantsService';

export const createRestaurantRequest = (restaurantData: addRestaurant) => (
    (dispatch: Dispatch) => {
        RestaurantsService.createRestaurantRequest(restaurantData)
            .catch(error => dispatch(createRestaurantFailure(error.message)));
    }
);

export const createRestaurantFailure = (error: string) => ({
    type: CREATE_RESTAURANT_FAILURE,
    payload: error,
});
