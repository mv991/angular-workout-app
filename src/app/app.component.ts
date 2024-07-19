import { WorkoutTableComponent } from './workout-table/workout-table.component';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AddWorkoutModalComponent } from './add-workout-modal/add-workout-modal.component';
import { WorkoutService } from './workout.service';
import { ChartConfiguration } from 'chart.js';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,AddWorkoutModalComponent,WorkoutTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'workout-app';
  constructor( private workoutService: WorkoutService) {}
   showModal:Boolean = false

  toggleModal() {
    this.showModal = !this.showModal;
  }
   

}