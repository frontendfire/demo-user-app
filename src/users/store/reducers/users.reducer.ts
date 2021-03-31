import * as userActions from '../actions/users.action';
import { User } from '../../models/user.model';

export interface UserState {
  entities: { [id: number]: User };
  loaded: boolean;
  loading: boolean;
}

export const initialState: UserState = {
  entities: {},
  loaded: false,
  loading: false,
};

export function reducer(
  state = initialState,
  action: userActions.UsersAction
): UserState {
  switch (action.type) {
    case userActions.LOAD_USERS: {
      return {
        ...state,
        loading: true,
      };
    }

    case userActions.LOAD_USERS_SUCCESS: {
      const users = action.payload;

      const entities = users.reduce(
        (entities: { [id: number]: User }, user: User) => {
          return {
            ...entities,
            [user.id]: user,
          };
        },
        {
          ...state.entities,
        }
      );

      return {
        ...state,
        loading: false,
        loaded: true,
        entities,
      };
    }

    case userActions.LOAD_USERS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    }

    case userActions.UPDATE_USER_SUCCESS:
    case userActions.CREATE_USER_SUCCESS: {
      const user = action.payload;
      const entities = {
        ...state.entities,
        [user.id]: user,
      };

      return {
        ...state,
        entities,
      };
    }

    case userActions.REMOVE_USER_SUCCESS: {
      const user = action.payload;
      const { [user.id]: removed, ...entities } = state.entities;

      return {
        ...state,
        entities,
      };
    }

    case userActions.DELETE_ALL_USERS_SUCCESS: {

      return {
        entities: [],
        loading: false,
        loaded: true
      };
    }

    
  }

  return state;
}

export const getUsersEntities = (state: UserState) => state.entities;
export const getUsersLoading = (state: UserState) => state.loading;
export const getUsersLoaded = (state: UserState) => state.loaded;
