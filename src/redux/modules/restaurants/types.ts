export const CREATE_RESTAURANT_SUCCESS = 'CREATE_RESTAURANT_SUCCESS';
export const GET_RESTAURANTS_DATA_SUCCESS = 'GET_RESTAURANTS_DATA_SUCCESS';
export const RESTAURANTS_ERROR = 'RESTAURANTS_ERROR';

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
}

export type FetchedRestaurantData = RestaurantData & {
    Dishes: DishData[],
}

export type addRestaurant = {
    restaurant: Omit<RestaurantData, 'id' | 'likes' | 'isLiked'>,
    dishes: Array<Omit<DishData, 'id'>>,
}

export type updateRestaurant = Pick<RestaurantData, 'id'> & Partial<RestaurantData>

export type RestaurantState = {
    restaurants: FetchedRestaurantData[],
    isNewRestaurantCreated: boolean,
    errors: string[],
};
