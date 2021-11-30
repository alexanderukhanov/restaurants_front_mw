import {
    addRestaurant,
    RESTAURANTS_ERROR,
    CREATE_RESTAURANT_SUCCESS,
    GET_RESTAURANTS_DATA_SUCCESS,
    FetchedRestaurantData,
    updateRestaurant
} from './types';
import { Dispatch } from 'redux';
import RestaurantsService from '../../../services/RestaurantsService';

export const createRestaurantRequest = (restaurantData: addRestaurant) => (
    (dispatch: Dispatch) => {
        RestaurantsService.createRestaurantRequest(restaurantData)
            .then(response => response.status === 201 && dispatch(createRestaurantSuccess(true)))
            .catch(error => dispatch(restaurantsError(error.message)));
    }
);

export const createRestaurantSuccess = (payload: boolean) => ({
    type: CREATE_RESTAURANT_SUCCESS,
    payload,
}) as const;

export const restaurantsError = (error: string) => ({
    type: RESTAURANTS_ERROR,
    payload: error,
}) as const;

export const getRestaurantsData = () => (
    (dispatch: Dispatch) => {
        RestaurantsService.getRestaurantsData()
            .then(response => dispatch(getRestaurantsDataSuccess(response.data)))
            .catch(error => dispatch(restaurantsError(error)));
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
            .catch(error => dispatch(restaurantsError(error.message)))
    )
);

export type RestaurantStateActionTypes = ReturnType<typeof createRestaurantSuccess>
    | ReturnType<typeof getRestaurantsDataSuccess>
    | ReturnType<typeof restaurantsError>;
