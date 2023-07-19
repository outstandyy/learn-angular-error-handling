import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { WidgetComponent } from './widget/widget.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  template: `
    <mat-toolbar color="primary">
      Angular Error Handling
    </mat-toolbar>
    <main id="content">
      <app-widget></app-widget>
    </main>
  `,
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [MatToolbarModule, WidgetComponent],
})
export class AppComponent {
}
