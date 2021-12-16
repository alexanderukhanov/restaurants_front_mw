import {
    addRestaurant,
    RESTAURANTS_ERRORS,
    CREATE_RESTAURANT_SUCCESS,
    GET_RESTAURANTS_DATA_SUCCESS,
    CLEAR_RESTAURANTS_ERRORS,
    FetchedRestaurantData,
    updateRestaurant,
} from './types';
import { Dispatch } from 'redux';
import RestaurantsService from '../../../services/RestaurantsService';

export const createRestaurantRequest = (restaurantData: addRestaurant) => (
    (dispatch: Dispatch) => {
        RestaurantsService.createRestaurantRequest(restaurantData)
            .then(response => response.status === 201 && dispatch(createRestaurantSuccess(true)))
            .catch(error => dispatch(restaurantsErrors(error.message)));
    }
);

export const createRestaurantSuccess = (payload: boolean) => ({
    type: CREATE_RESTAURANT_SUCCESS,
    payload,
}) as const;

export const getRestaurantsData = () => (
    (dispatch: Dispatch) => {
        RestaurantsService.getRestaurantsData()
            .then(response => dispatch(getRestaurantsDataSuccess(response.data)))
            .catch(error => dispatch(restaurantsErrors(error)));
    }
);

export const getRestaurantsDataSuccess = (payload: FetchedRestaurantData[]) => ({
    type: GET_RESTAURANTS_DATA_SUCCESS,
    payload,
}) as const;

export const updateRestaurantData = (restaurantData: updateRestaurant) => (
    (dispatch: Dispatch) => (
        RestaurantsService.updateRestaurantLike(restaurantData)
            .then(response => response.status === 200)
            .catch(error => dispatch(restaurantsErrors(error.message)))
    )
);

export const restaurantsErrors = (error: string) => ({
    type: RESTAURANTS_ERRORS,
    payload: error,
}) as const;

export const clearRestaurantsErrors = () => ({
    type: CLEAR_RESTAURANTS_ERRORS,
}) as const;

export type RestaurantStateActionTypes = ReturnType<typeof createRestaurantSuccess>
    | ReturnType<typeof getRestaurantsDataSuccess>
    | ReturnType<typeof restaurantsErrors>
    | ReturnType<typeof clearRestaurantsErrors>;
