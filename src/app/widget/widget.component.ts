import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, tap } from 'rxjs';
import { WidgetDataService } from './widget-data.service';
import { Task } from '../task.model';
import { WidgetErrorComponent } from './widget-error/widget-error.component';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-widget',
  standalone: true,
  imports: [MatIconModule, CommonModule, MatDividerModule, MatButtonModule, WidgetErrorComponent],
  template: `
    <app-widget-error *ngIf="error" class="error" [error]="error"></app-widget-error>
    <div class="title mat-title">Backlog Widget</div>
    <mat-divider></mat-divider>
    <section class="content">
      <mat-icon class="icon" color="primary">show_chart</mat-icon>
      <ul class="tasks" *ngIf="tasks$ | async as tasks">
        <li class="task mat-body" *ngFor="let task of tasks">{{task.title}}</li>
        <li class="no-data mat-caption" *ngIf="tasks.length === 0">No Tasks In Backlog</li>
      </ul>
      <button (click)="addTask()" mat-stroked-button color="primary" class="add-new-task">Add new Task</button>
    </section>
  `,
  styleUrls: ['./widget.component.css']
})
export class WidgetComponent {

  tasks$!: Observable<Task[]>;
  error: Error | null = null;

  constructor(private widgetData: WidgetDataService) { }

  ngOnInit(): void {
    this.tasks$ = this.widgetData.load().pipe(
      tap({
        error: (error) => this.error = error,
      }),
    );
  }

  addTask() {
    // unreliable method
    try {
      setTimeout(() => {
        this.widgetData.addTaskSync({ id: 0, title: 'New Task' });
      });
    } catch(error) {
      if (error instanceof Error) {
        this.error = error;
        throw error;
      }
    }
    // this.widgetData.addTaskSync({ id: 0, title: 'New Task' });
  }
}
