import {
  ActionReducerMap,
  createSelector,
  createFeatureSelector,
} from '@ngrx/store';

import * as usersReducer from './users.reducer';

export interface UsersModuleState {
  users: usersReducer.UserState;
  // .. could be other entities / state segments
}

export const reducers: ActionReducerMap<UsersModuleState> = {
  users: usersReducer.reducer,
};

// selectors //////////////////////////////////////////////////////////////////
// todo: move to own file, actually probs dont really need them for this

export const getUsersStateSelector = createFeatureSelector<UsersModuleState>(
  'users'
);

export const getUserStateSelector = createSelector(
  getUsersStateSelector,
  (state: UsersModuleState) => {
    return state.users;
  }
);

export const getUsersEntitiesSelector = createSelector(
  getUserStateSelector,
  usersReducer.getUsersEntities
);

export const getAllUsersSelector = createSelector(getUsersEntitiesSelector, entities => {
  // map entities to plain array of users
  return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
});

export const getUsersLoadedSelector = createSelector(
  getUserStateSelector,
  usersReducer.getUsersLoaded
);
export const getUsersLoadingSelector = createSelector(
  getUserStateSelector,
  usersReducer.getUsersLoading
);
