import * as usersReducer from './users.reducer';
import * as userActions from '../actions/users.action';
import { User } from '../../models/user.model';

describe('UsersReducer', () => {
  describe('default', () => {
    it('should return the default state', () => {
      const { initialState } = usersReducer;
      const action = {} as any;
      const state = usersReducer.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('LOAD_USERS action', () => {
    it('should set loading to true', () => {
      const { initialState } = usersReducer;
      const action = new userActions.LoadUsers();
      const state = usersReducer.reducer(initialState, action);

      expect(state.loading).toEqual(true);
      expect(state.loaded).toEqual(false);
      expect(state.entities).toEqual({});
    });
  });

  describe('LOAD_USERS_SUCCESS action', () => {
    it('should populate the users array', () => {
      const users: User[] = [
        { id: 1, name: 'User #1' },
        { id: 2, name: 'User #2' },
      ];
      const entities = {
        1: users[0],
        2: users[1],
      };
      const { initialState } = usersReducer;
      const action = new userActions.LoadUsersSuccess(users);
      const state = usersReducer.reducer(initialState, action);

      expect(state.loaded).toEqual(true);
      expect(state.loading).toEqual(false);
      expect(state.entities).toEqual(entities);
    });
  });

  describe('LOAD_USERS_FAIL action', () => {
    it('should return the initial state', () => {
      const { initialState } = usersReducer;
      const action = new userActions.LoadUsersFail({});
      const state = usersReducer.reducer(initialState, action);

      expect(state).toEqual(initialState);
    });

    it('should return the previous state', () => {
      const { initialState } = usersReducer;
      const previousState = { ...initialState, loading: true };
      const action = new userActions.LoadUsersFail({});
      const state = usersReducer.reducer(previousState, action);

      expect(state).toEqual(initialState);
    });
  });

  describe('CREATE_USER_SUCCESS action', () => {
    it('should add the new user to the users array', () => {
      const users: User[] = [
        { id: 1, name: 'User #1' },
        { id: 2, name: 'User #2' },
      ];
      const newUser: User = {
        id: 3,
        name: 'User #3'
      };
      const entities = {
        1: users[0],
        2: users[1],
      };
      const { initialState } = usersReducer;
      const previousState = { ...initialState, entities };
      const action = new userActions.CreateUserSuccess(newUser);
      const state = usersReducer.reducer(previousState, action);

      expect(Object.keys(state.entities).length).toEqual(3);
      expect(state.entities).toEqual({ ...entities, 3: newUser });
    });
  });

  describe('UPDATE_USER_SUCCESS action', () => {
    it('should update the user', () => {
      const users: User[] = [
        { id: 1, name: 'User #1' },
        { id: 2, name: 'User #2' },
      ];
      const updatedUser = {
        id: 2,
        name: 'User #2'
      };
      const entities = {
        1: users[0],
        2: users[1],
      };
      const { initialState } = usersReducer;
      const previousState = { ...initialState, entities };
      const action = new userActions.UpdateUserSuccess(updatedUser);
      const state = usersReducer.reducer(previousState, action);

      expect(Object.keys(state.entities).length).toEqual(2);
      expect(state.entities).toEqual({ ...entities, 2: updatedUser });
    });
  });

  describe('REMOVE_USER_SUCCESS action', () => {
    it('should remove the user', () => {
      const users: User[] = [
        { id: 1, name: 'User #1' },
        { id: 2, name: 'User #2' },
      ];
      const entities = {
        1: users[0],
        2: users[1],
      };
      const { initialState } = usersReducer;
      const previousState = { ...initialState, entities };
      const action = new userActions.RemoveUserSuccess(users[0]);
      const state = usersReducer.reducer(previousState, action);

      expect(Object.keys(state.entities).length).toEqual(1);
      expect(state.entities).toEqual({ 2: users[1] });
    });
  });
});

describe('UsersReducer Selectors', () => {
  describe('getUserEntities', () => {
    it('should return .entities', () => {
      const entities: { [key: number]: User } = {
        1: { id: 1, name: 'User #1' },
        2: { id: 2, name: 'User #2' },
      };
      const { initialState } = usersReducer;
      const previousState = { ...initialState, entities };
      const slice = usersReducer.getUsersEntities(previousState);

      expect(slice).toEqual(entities);
    });
  });

  describe('getUsersLoading', () => {
    it('should return .loading', () => {
      const { initialState } = usersReducer;
      const previousState = { ...initialState, loading: true };
      const slice = usersReducer.getUsersLoading(previousState);

      expect(slice).toEqual(true);
    });
  });

  describe('getUsersLoaded', () => {
    it('should return .loaded', () => {
      const { initialState } = usersReducer;
      const previousState = { ...initialState, loaded: true };
      const slice = usersReducer.getUsersLoaded(previousState);

      expect(slice).toEqual(true);
    });
  });
});
