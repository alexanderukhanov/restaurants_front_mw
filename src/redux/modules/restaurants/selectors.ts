import { createSelector } from 'reselect';
import { AppState } from '../../store';

const selectAppState = (state: AppState) => state;

export const selectIsNewRestaurantCreated = createSelector(
    selectAppState,
    state => state.restaurants.isNewRestaurantCreated
);

export const selectRestaurantsData = createSelector(
    selectAppState,
    state => state.restaurants.restaurants
);
