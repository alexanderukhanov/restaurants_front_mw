export const CREATE_RESTAURANT_FAILURE = 'CREATE_RESTAURANT_FAILURE';

export type RestaurantData = {
    name: string,
    address: string,
    previewLink: string,
    type: string,
    likes?: number,
}

export type DishData = {
    name: string,
    description: string,
    previewLink: string,
    cost: string,
}

export type addRestaurant = {
    restaurant: RestaurantData,
    dishes: DishData[],
}
