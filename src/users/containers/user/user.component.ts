import { Component, OnInit, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as userReducers from '../../store/reducers';
import * as userActions from '../../store/actions/users.action';
import { User } from '../../models/user.model';

@Component({
  selector: 'user',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['user.component.scss'],
  template: `
    <div 
      class="user">
      <user-form
        class="user__form"
        *ngIf="isEdit"
        [user]="user"
        (cancel)="onEdit($event)"
        (create)="onCreate($event)"
        (update)="onUpdate($event)"
        (remove)="onRemove($event)">
      </user-form>
      <user-item
        class="user__item"
        *ngIf="!isEdit"
        [user]="user"
        (edit)="onEdit($event)"
        (delete)="onRemove($event)">
      </user-item>
    </div>
  `,
})
export class UserComponent implements OnInit {

  @Input('isBatchEdit')
  isBatchEdit: Observable<boolean>;

  @Input('user')
  user: User;

  isEdit: boolean = false;

  constructor(
    private store: Store<userReducers.UsersModuleState>
  ) {}

  ngOnInit() {
    if(!this.user) {
      this.isEdit = true;
    }
    if(this.isBatchEdit) {
      this.isBatchEdit.subscribe(v => {
        this.isEdit = v;
      });
    }
    
  }

  onEdit(evt: boolean): void {
    this.isEdit = evt;
  }

  onCreate(event: User) {
    this.store.dispatch(new userActions.CreateUser(event));
  }

  onUpdate(event: User) {
    this.store.dispatch(new userActions.UpdateUser(event));
    this.isEdit = false;
  }

  onRemove(event: User) {
    const remove = window.confirm('Are you sure?');
    if (remove) {
      this.store.dispatch(new userActions.RemoveUser(event));
    }
  }
}
