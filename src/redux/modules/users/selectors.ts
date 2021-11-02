import { AppState } from '../../store';
import { createSelector } from 'reselect';

const selectAppState = (state: AppState) => state;

export const selectUserProfile = createSelector(selectAppState, (state) => state.users.profile);
