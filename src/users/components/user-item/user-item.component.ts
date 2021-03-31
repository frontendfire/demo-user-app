import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'user-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['user-item.component.scss'],
  template: `
    <div class="user-item">
        <h3 class="user-item__name">{{ user.name }}</h3>
        <div class="user-item__actions">
          <button type="button" class="btn btn__ok" (click)="onEdit($event)">Edit User</button>
          <button type="button" class="btn btn__warning" (click)="onDelete($event)">Delete User</button>
        </div>
    </div>
  `,
})
export class UserItemComponent {

  @Input() 
  user: any;

  @Output()
  edit: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  delete: EventEmitter<boolean> = new EventEmitter<boolean>();

  onEdit() {
    this.edit.emit(true);
  }

  onDelete() {
    this.delete.emit({ ...this.user });
  }
}
