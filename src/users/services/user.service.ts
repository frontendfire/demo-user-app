import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError, mergeMap, last } from 'rxjs/operators';
import 'rxjs/add/observable/throw';
import { of } from 'rxjs/observable/of';

import { User } from '../models/user.model';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(`/api/users`)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  createUser(payload: User): Observable<User> {
    return this.http
      .post<User>(`/api/users`, payload)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  updateUser(payload: User): Observable<User> {
    return this.http
      .put<User>(`/api/users/${payload.id}`, payload)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  removeUser(payload: User): Observable<User> {
    return this.http
      .delete<any>(`/api/users/${payload.id}`)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  removeAllUsers(payload: User[]): Observable<User[]> {
    return of<User>(...payload).pipe(
      mergeMap((user:User) => { 
        return this.http.delete<any>(`/api/users/${user.id}`)
          .pipe(
            catchError((error: any) => {
              return Observable.throw(error.json());
            })
          )
      }),
      last()
    );
  }
}
