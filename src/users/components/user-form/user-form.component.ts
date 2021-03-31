import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormArray,
  FormBuilder,
  Validators,
} from '@angular/forms';

import { User } from '../../models/user.model';

@Component({
  selector: 'user-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['user-form.component.scss'],
  template: `
    <div class="user-form">
      <form [formGroup]="form" class="user-form__form">
        <label class="user-form__field">
          <input 
            type="text" 
            formControlName="name"
            placeholder="e.g. Dude Dudeman"
            class="user-form__input"
            [class.error]="nameControlInvalid">
        </label>
        
        <div class="user-form__actions">
          <button 
            type="button" 
            class="btn btn__ok" 
            *ngIf="exists"
            (click)="onCancel($event)">
            Cancel
          </button>
          <button
            type="button"
            class="btn btn__ok"
            *ngIf="!exists"
            (click)="createUser(form)">
            Create User
          </button>
          <button
            type="button"
            class="btn btn__ok"
            *ngIf="exists"
            [class.btn__disabled]="form.pristine"
            (click)="updateUser(form)">
            Save changes
          </button>
          <button
            type="button"
            class="btn btn__warning"
            *ngIf="exists"
            (click)="removeUser(form)">
            Delete User
          </button>
        </div>
      </form>
    </div>
  `,
})
export class UserFormComponent implements OnChanges {

  exists:boolean = false;

  @Input() user: User;

  @Output() cancel = new EventEmitter<boolean>();
  @Output() create = new EventEmitter<User>();
  @Output() update = new EventEmitter<User>();
  @Output() remove = new EventEmitter<User>();

  form = this.fb.group({
    name: ['', Validators.required]
  });

  constructor(private fb: FormBuilder) {}

  get nameControl() {
    return this.form.get('name') as FormControl;
  }

  get nameControlInvalid() {
    return this.nameControl.hasError('required') && this.nameControl.touched;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.user && this.user.id) {
      this.exists = true;
      this.form.patchValue(this.user);
    }
  }

  createUser(form: FormGroup) {
    const { value, valid } = form;
    if (valid) {
      this.create.emit(value);
      this.form.reset();
    }
  }

  updateUser(form: FormGroup) {
    const { value, valid, touched } = form;
    if (touched && valid) {
      this.update.emit({ ...this.user, ...value });
    }
  }

  removeUser(form: FormGroup) {
    const { value } = form;
    this.remove.emit({ ...this.user, ...value });
  }

  onCancel() {
    this.cancel.emit(false);
  }

}
