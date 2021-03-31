import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  styleUrls: ['app.component.scss'],
  template: `
  <div class="app">
    <div class="app__header">
      <h1>Demo Users App</h1>
    </div>
    <div class="app__content">
      <div class="app__container">
        <users></users>
      </div>
      <div class="app__footer">
        <p>&copy; Users App</p>
      </div>
    </div>
  </div>
  `,
})
export class AppComponent {}
