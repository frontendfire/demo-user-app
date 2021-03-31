import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import * as userReducers from '../../store/reducers';
import * as userActions from '../../store/actions/users.action';
import { User } from '../../models/user.model';

@Component({
  selector: 'users',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['users.component.scss'],
  template: `
    <div class="users">
      <div class="users__new">
        <user></user>
      </div>
      <div class="users__batch-actions">
        <user-batch-actions
          *ngIf="((users$ | async)?.length > 0)"
          (editAll)="onEditAll()"
          (saveAll)="onSaveAll()"
          (deleteAll)="onDeleteAll()"></user-batch-actions>
      </div>
      <div class="users__list">
        <div *ngIf="!((users$ | async)?.length)">
          Add some users!
        </div>
        <user
          *ngFor="let user of (users$ | async)"
          [user]="user"
          [isBatchEdit]="isBatchEditing$">
        </user>
      </div>
    </div>
  `,
})
export class UsersComponent implements OnInit {
  users$: Observable<User[]>;
  users: User[];
  isBatchEditing:boolean = false;
  isBatchEditingSubject: Subject<boolean>;

  constructor(private store: Store<userReducers.UsersModuleState>) {}

  ngOnInit() {
    this.isBatchEditingSubject = new Subject<boolean>();
    this.users$ = this.store.select(userReducers.getAllUsersSelector);
    this.users$.subscribe(users => this.users = users);
    this.store.dispatch(new userActions.LoadUsers());
  }

  get isBatchEditing$():Observable<boolean> {
    return this.isBatchEditingSubject.asObservable();
  }

  onEditAll() {
    this.isBatchEditingSubject.next(true);
  }

  onDeleteAll() {
    this.store.dispatch(new userActions.DeleteAllUsers(this.users));
  }
}
