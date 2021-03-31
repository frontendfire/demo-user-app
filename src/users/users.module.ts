import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// store
import { UsersEffects } from './store/effects/users.effect';
import * as userReducers from './store/reducers';

// containers
import { UserComponent } from './containers/user/user.component';
import { UsersComponent } from './containers/users/users.component';

// components
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserItemComponent } from './components/user-item/user-item.component';
import { UserBatchActionsComponent } from './components/user-batch-actions/user-batch-actions.component';

// services
import { UserService } from './services/user.service';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('users', userReducers.reducers),
    EffectsModule.forFeature([UsersEffects]),
  ],
  providers: [UserService],
  declarations: [
    UserComponent,
    UsersComponent,
    UserItemComponent,
    UserFormComponent,
    UserBatchActionsComponent
  ],
  exports: [UsersComponent],
})
export class UsersModule {}
