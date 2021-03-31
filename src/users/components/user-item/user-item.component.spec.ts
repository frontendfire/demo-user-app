import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { DebugElement } from '@angular/core';
import { UserItemComponent } from './user-item.component';
import { By } from '@angular/platform-browser';

describe('UserItemComponent', () => {

  let component: UserItemComponent;
  let fixture: ComponentFixture<UserItemComponent>;
  let el: DebugElement;
  let mockUser = { id: 1, name: 'dude' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        UserItemComponent
      ]
    });

    fixture = TestBed.createComponent(UserItemComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    component.user = mockUser;
  });

  it('should emit edit output when edit button clicked', () => {
    spyOn(component.edit, 'emit').and.callThrough();
    el.query(By.css('button:first-child')).triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.edit.emit).toHaveBeenCalledWith(true);
  });

  it('should emit delete output with the user when delete button clicked', () => {
    spyOn(component.delete, 'emit').and.callThrough();
    el.query(By.css('button:last-child')).triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.delete.emit).toHaveBeenCalledWith(mockUser);
  });

});
