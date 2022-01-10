import { createSelector } from 'reselect';
import { AppState } from '../../store';

const selectAppState = (state: AppState) => state;

export const selectIsNewRestaurantCreated = createSelector(
    selectAppState,
    state => state.restaurants.isNewRestaurantCreated
);

export const selectIsNewOrderCreated = createSelector(
    selectAppState,
    state => state.restaurants.isNewOrderCreated
);

export const selectRestaurantsData = createSelector(
    selectAppState,
    state => state.restaurants.restaurants
);

export const selectRestaurantsErrors = createSelector(
    selectAppState,
    state => state.restaurants.errors
);
