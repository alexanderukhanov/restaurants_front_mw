import {
    RESTAURANTS_ERRORS,
    CREATE_RESTAURANT_SUCCESS,
    GET_RESTAURANTS_DATA_SUCCESS,
    CLEAR_RESTAURANTS_ERRORS,
    CREATE_ORDER_SUCCESS,
    FetchedRestaurantData,
    UpdateRestaurant,
    OrderData,
    AddRestaurant,
} from './types';
import { Dispatch } from 'redux';
import RestaurantsService from '../../../services/RestaurantsService';

export const createRestaurantRequest = (restaurantData: AddRestaurant) => (
    (dispatch: Dispatch) => {
        RestaurantsService.createRestaurantRequest(restaurantData)
            .then(response => response.status === 201 && dispatch(createRestaurantSuccess(true)))
            .catch(e => {
                const {data} = e.response;
                const {error} = data;
                dispatch(restaurantsErrors(error || data));
            });
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
            .catch(error => dispatch(restaurantsErrors(error.message || error)));
    }
);

export const getRestaurantsDataSuccess = (payload: FetchedRestaurantData[]) => ({
    type: GET_RESTAURANTS_DATA_SUCCESS,
    payload,
}) as const;

export const updateRestaurantData = (restaurantData: UpdateRestaurant) => (
    (dispatch: Dispatch) => (
        RestaurantsService.updateRestaurantLike(restaurantData)
            .then(response => response.status === 200)
            .catch(error => dispatch(restaurantsErrors(error.message)))
    )
);

export const createOrderRequest = (orderData: OrderData) => (
    (dispatch: Dispatch) => {
        RestaurantsService.createOrder(orderData)
            .then(response => response.status === 201 && dispatch(createOrderSuccess(true)))
            .catch(e => {
                const {data, statusText} = e.response;
                dispatch(restaurantsErrors(data || statusText));
            });
    }
);

export const createOrderSuccess = (payload: boolean) => ({
    type: CREATE_ORDER_SUCCESS,
    payload,
}) as const;

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
    | ReturnType<typeof clearRestaurantsErrors>
    | ReturnType<typeof createOrderSuccess>;
