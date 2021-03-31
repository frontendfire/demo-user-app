import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { Actions } from '@ngrx/effects';

import { hot, cold } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';

import { UserService } from '../../services/user.service';
import * as userEffects from './users.effect';
import * as userActions from '../actions/users.action';

export class TestActions extends Actions {
  constructor() {
    super(empty());
  }

  set stream(source: Observable<any>) {
    this.source = source;
  }
}

export function getActions() {
  return new TestActions();
}

describe('UsersEffects', () => {
  let actions$: TestActions;
  let service: UserService;
  let effects: userEffects.UsersEffects;

  const users = [
    {
      id: 1,
      name: 'User #1'
    },
    {
      id: 2,
      name: 'User #2'
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UserService,
        userEffects.UsersEffects,
        { provide: Actions, useFactory: getActions },
      ],
    });

    actions$ = TestBed.get(Actions);
    service = TestBed.get(UserService);
    effects = TestBed.get(userEffects.UsersEffects);

    spyOn(service, 'getUsers').and.returnValue(of(users));
    spyOn(service, 'createUser').and.returnValue(of(users[0]));
    spyOn(service, 'updateUser').and.returnValue(of(users[0]));
    spyOn(service, 'removeUser').and.returnValue(of(users[0]));
  });

  describe('loadUsers$', () => {
    it('should return a collection from LoadUsersSuccess', () => {
      const action = new userActions.LoadUsers();
      const completion = new userActions.LoadUsersSuccess(users);

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.loadUsers$).toBeObservable(expected);
    });
  });

  describe('createUser$', () => {
    it('should return a new user', () => {
      const action = new userActions.CreateUser(users[0]);
      const completion = new userActions.CreateUserSuccess(users[0]);

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-c', { c: completion });

      expect(effects.createUser$).toBeObservable(expected);
    });
  });

  describe('updateUser$', () => {
    it('should return an updated user', () => {
      const action = new userActions.UpdateUser(users[0]);
      const completion = new userActions.UpdateUserSuccess(users[0]);

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-c', { c: completion });

      expect(effects.updateUser$).toBeObservable(expected);
    });
  });

  describe('removeUser$', () => {
    it('should return the removed user', () => {
      const action = new userActions.RemoveUser(users[0]);
      const completion = new userActions.RemoveUserSuccess(users[0]);

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-c', { c: completion });

      expect(effects.removeUser$).toBeObservable(expected);
    });
  });
});
