import { CREATE_RESTAURANT_FAILURE, CREATE_RESTAURANT_START, CREATE_RESTAURANT_SUCCESS } from './types';
import { Dispatch } from 'redux';
import RestaurantsService from '../../../services/RestaurantsService';

export const createRestaurantRequest = (restaurantData: any) => (
    (dispatch: Dispatch) => {
        dispatch(createRestaurantStart());

        RestaurantsService.createRestaurantRequest(restaurantData)
            .then((restaurantResponseData: any) => createRestaurantSuccess(restaurantResponseData))
            .catch(error => dispatch(createRestaurantFailure(error)));
    }
);

export const createRestaurantStart = () => ({
    type: CREATE_RESTAURANT_START,
});

export const createRestaurantSuccess = (restaurantResponseData: any) => ({
    type: CREATE_RESTAURANT_SUCCESS,
    payload: restaurantResponseData,
});

export const createRestaurantFailure = (error: any) => ({
    type: CREATE_RESTAURANT_FAILURE,
    payload: error,
});
