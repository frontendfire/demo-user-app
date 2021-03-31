import * as userActions from './users.action';

describe('Users Actions', () => {
  describe('LoadUsers Actions', () => {
    describe('LoadUsers', () => {
      it('should create an action', () => {
        const action = new userActions.LoadUsers();

        expect({ ...action }).toEqual({
          type: userActions.LOAD_USERS,
        });
      });
    });

    describe('LoadUsersFail', () => {
      it('should create an action', () => {
        const payload = { message: 'Load Error' };
        const action = new userActions.LoadUsersFail(payload);

        expect({ ...action }).toEqual({
          type: userActions.LOAD_USERS_FAIL,
          payload,
        });
      });
    });

    describe('LoadUsersSuccess', () => {
      it('should create an action', () => {
        const payload = [
          {
            id: 1,
            name: 'User #1'
          },
          {
            id: 2,
            name: 'User #2'
          },
        ];
        const action = new userActions.LoadUsersSuccess(payload);

        expect({ ...action }).toEqual({
          type: userActions.LOAD_USERS_SUCCESS,
          payload,
        });
      });
    });
  });

  describe('CreateUser Actions', () => {
    describe('CreateUser', () => {
      it('should create an action', () => {
        const payload = {
          name: 'User #2'
        };
        const action = new userActions.CreateUser(payload);

        expect({ ...action }).toEqual({
          type: userActions.CREATE_USER,
          payload,
        });
      });
    });

    describe('CreateUserFail', () => {
      it('should create an action', () => {
        const payload = { message: 'Create Error' };
        const action = new userActions.CreateUserFail(payload);

        expect({ ...action }).toEqual({
          type: userActions.CREATE_USER_FAIL,
          payload,
        });
      });
    });

    describe('CreateUserSuccess', () => {
      it('should create an action', () => {
        const payload = {
          id: 2,
          name: 'User #2'
        };
        const action = new userActions.CreateUserSuccess(payload);

        expect({ ...action }).toEqual({
          type: userActions.CREATE_USER_SUCCESS,
          payload,
        });
      });
    });
  });

  describe('UpdateUser Actions', () => {
    describe('UpdateUser', () => {
      it('should create an action', () => {
        const payload = {
          id: 2,
          name: 'User #2'
        };
        const action = new userActions.UpdateUser(payload);

        expect({ ...action }).toEqual({
          type: userActions.UPDATE_USER,
          payload,
        });
      });
    });

    describe('UpdateUserFail', () => {
      it('should create an action', () => {
        const payload = { message: 'Update Error' };
        const action = new userActions.UpdateUserFail(payload);

        expect({ ...action }).toEqual({
          type: userActions.UPDATE_USER_FAIL,
          payload,
        });
      });
    });

    describe('UpdateUserSuccess', () => {
      it('should create an action', () => {
        const payload = {
          id: 2,
          name: 'User #2'
        };
        const action = new userActions.UpdateUserSuccess(payload);

        expect({ ...action }).toEqual({
          type: userActions.UPDATE_USER_SUCCESS,
          payload,
        });
      });
    });
  });

  describe('RemoveUser Actions', () => {
    describe('RemoveUser', () => {
      it('should create an action', () => {
        const payload = {
          id: 2,
          name: 'User #2'
        };
        const action = new userActions.RemoveUser(payload);

        expect({ ...action }).toEqual({
          type: userActions.REMOVE_USER,
          payload,
        });
      });
    });

    describe('RemoveUserFail', () => {
      it('should create an action', () => {
        const payload = { message: 'Remove Error' };
        const action = new userActions.RemoveUserFail(payload);

        expect({ ...action }).toEqual({
          type: userActions.REMOVE_USER_FAIL,
          payload,
        });
      });
    });

    describe('RemoveUserSuccess', () => {
      it('should create an action', () => {
        const payload = {
          id: 2,
          name: 'User #2'
        };
        const action = new userActions.RemoveUserSuccess(payload);

        expect({ ...action }).toEqual({
          type: userActions.REMOVE_USER_SUCCESS,
          payload,
        });
      });
    });
  });
});
