import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'user-batch-actions',
    styleUrls: ['./user-batch-actions.component.scss'],
    template: `
        <div class="user-batch-actions">
            <div class="user-batch-actions__btns">
                <button type="button" class="btn btn__ok" (click)="onEditAll($event)">Edit All</button>
                <button type="button" class="btn btn__warning" (click)="onDeleteAll($event)">Delete All</button>
            </div>
        </div>
    `
})
export class UserBatchActionsComponent {

    @Output()
    editAll: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Output()
    deleteAll: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Output()
    saveAll: EventEmitter<boolean> = new EventEmitter<boolean>();

    onEditAll() {
        this.editAll.emit(true);
    }

    onDeleteAll() {
        this.deleteAll.emit(true);
    }

}