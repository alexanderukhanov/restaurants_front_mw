export const CREATE_RESTAURANT_SUCCESS = 'CREATE_RESTAURANT_SUCCESS';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const GET_RESTAURANTS_DATA_SUCCESS = 'GET_RESTAURANTS_DATA_SUCCESS';
export const RESTAURANTS_ERRORS = 'RESTAURANTS_ERRORS';
export const CLEAR_RESTAURANTS_ERRORS = 'CLEAR_RESTAURANTS_ERRORS';

export type RestaurantData = {
    id: number,
    name: string,
    address: string,
    previewLink: string,
    type: string,
    likes: number,
    isLiked: number,
}

export type DishData = {
    id: number,
    name: string,
    description: string,
    previewLink: string,
    cost: string,
    restaurantId?: number,
}

export type DishDataWithAmount = DishData & { amount: number }

export type FetchedRestaurantData = RestaurantData & {
    Dishes: DishData[],
}

export type AddRestaurant = {
    restaurant: Omit<RestaurantData, 'id' | 'likes' | 'isLiked'>,
    dishes: Array<Omit<DishData, 'id'>>,
}

export type UpdateRestaurant = Pick<RestaurantData, 'id'> & Partial<RestaurantData>

export type RestaurantState = {
    restaurants: FetchedRestaurantData[],
    isNewRestaurantCreated: boolean,
    isNewOrderCreated: boolean,
    errors: string[],
};

export type OrderData = {
    totalCost: string,
    restaurantId: number,
    dishes: Array<Pick<DishDataWithAmount, 'id' | 'amount' | 'name'>>
}
