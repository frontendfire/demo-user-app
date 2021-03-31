import { Action } from '@ngrx/store';
import { User } from '../../models/user.model';

// get users
export const LOAD_USERS = '[Users] Load Users';
export const LOAD_USERS_FAIL = '[Users] Load Users Fail';
export const LOAD_USERS_SUCCESS = '[Users] Load Users Success';

export class LoadUsers implements Action {
  readonly type = LOAD_USERS;
}

export class LoadUsersFail implements Action {
  readonly type = LOAD_USERS_FAIL;
  constructor(public payload: any) {}
}

export class LoadUsersSuccess implements Action {
  readonly type = LOAD_USERS_SUCCESS;
  constructor(public payload: User[]) {}
}

// create user
export const CREATE_USER = '[Users] Create User';
export const CREATE_USER_FAIL = '[Users] Create User Fail';
export const CREATE_USER_SUCCESS = '[Users] Create User Success';

export class CreateUser implements Action {
  readonly type = CREATE_USER;
  constructor(public payload: User) {}
}

export class CreateUserFail implements Action {
  readonly type = CREATE_USER_FAIL;
  constructor(public payload: any) {}
}

export class CreateUserSuccess implements Action {
  readonly type = CREATE_USER_SUCCESS;
  constructor(public payload: User) {}
}

// update user
export const UPDATE_USER = '[Users] Update User';
export const UPDATE_USER_FAIL = '[Users] Update User Fail';
export const UPDATE_USER_SUCCESS = '[Users] Update User Success';

export class UpdateUser implements Action {
  readonly type = UPDATE_USER;
  constructor(public payload: User) {}
}

export class UpdateUserFail implements Action {
  readonly type = UPDATE_USER_FAIL;
  constructor(public payload: any) {}
}

export class UpdateUserSuccess implements Action {
  readonly type = UPDATE_USER_SUCCESS;
  constructor(public payload: User) {}
}

// remove user
export const REMOVE_USER = '[Users] Remove User';
export const REMOVE_USER_FAIL = '[Users] Remove User Fail';
export const REMOVE_USER_SUCCESS = '[Users] Remove User Success';

export class RemoveUser implements Action {
  readonly type = REMOVE_USER;
  constructor(public payload: User) {}
}

export class RemoveUserFail implements Action {
  readonly type = REMOVE_USER_FAIL;
  constructor(public payload: any) {}
}

export class RemoveUserSuccess implements Action {
  readonly type = REMOVE_USER_SUCCESS;
  constructor(public payload: User) {}
}

// delete users
export const DELETE_ALL_USERS = '[Users] Delete All Users';
export const DELETE_ALL_USERS_FAIL = '[Users] Delete All Users Fail';
export const DELETE_ALL_USERS_SUCCESS = '[Users] Delete All Users Success';

export class DeleteAllUsers implements Action {
  readonly type = DELETE_ALL_USERS;
  constructor(public payload: User[]) {}
}

export class DeleteAllUsersFail implements Action {
  readonly type = DELETE_ALL_USERS_FAIL;
  constructor(public payload: any) {}
}

export class DeleteAllUsersSuccess implements Action {
  readonly type = DELETE_ALL_USERS_SUCCESS;
  constructor(public payload: User[]) {}
}

// action types
export type UsersAction = 
  LoadUsers 
  | LoadUsersFail 
  | LoadUsersSuccess
  | CreateUser
  | CreateUserFail
  | CreateUserSuccess
  | UpdateUser
  | UpdateUserFail
  | UpdateUserSuccess
  | RemoveUser
  | RemoveUserFail
  | RemoveUserSuccess
  | DeleteAllUsers
  | DeleteAllUsersFail
  | DeleteAllUsersSuccess;
