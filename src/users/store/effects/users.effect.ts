import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as userActions from '../actions/users.action';
import { UserService } from '../../services/user.service';

@Injectable()
export class UsersEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {}

  @Effect()
  loadUsers$ = this.actions$.ofType(userActions.LOAD_USERS).pipe(
    switchMap(() => {
      return this.userService
        .getUsers()
        .pipe(
          map(users => new userActions.LoadUsersSuccess(users)),
          catchError(error => of(new userActions.LoadUsersFail(error)))
        );
    })
  );

  @Effect()
  createUser$ = this.actions$.ofType(userActions.CREATE_USER).pipe(
    map((action: userActions.CreateUser) => action.payload),
    switchMap(user => {
      return this.userService
        .createUser(user)
        .pipe(
          map(user => new userActions.CreateUserSuccess(user)),
          catchError(error => of(new userActions.CreateUserFail(error)))
        );
    })
  );

  @Effect()
  updateUser$ = this.actions$.ofType(userActions.UPDATE_USER).pipe(
    map((action: userActions.UpdateUser) => action.payload),
    switchMap(user => {
      return this.userService
        .updateUser(user)
        .pipe(
          map(user => new userActions.UpdateUserSuccess(user)),
          catchError(error => of(new userActions.UpdateUserFail(error)))
        );
    })
  );

  @Effect()
  removeUser$ = this.actions$.ofType(userActions.REMOVE_USER).pipe(
    map((action: userActions.RemoveUser) => action.payload),
    switchMap(user => {
      return this.userService
        .removeUser(user)
        .pipe(
          map(() => new userActions.RemoveUserSuccess(user)),
          catchError(error => of(new userActions.RemoveUserFail(error)))
        );
    })
  );

  @Effect()
  removeAllUsers$ = this.actions$.ofType(userActions.DELETE_ALL_USERS).pipe(
    map((action: userActions.DeleteAllUsers) => action.payload),
    switchMap(users => {
      return this.userService
        .removeAllUsers(users)
        .pipe(
          map(() => new userActions.DeleteAllUsersSuccess(users)),
          catchError(error => of(new userActions.DeleteAllUsersFail(error)))
        );
    })
  );

}