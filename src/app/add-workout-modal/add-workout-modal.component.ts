import { WorkoutService } from './../workout.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { Output,EventEmitter } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
interface WorkoutData {
  userName:String,
  id:String
  workouts:[{
  type:String,
  minutes:Number
  }]



}
@Component({
  selector: 'app-add-workout-modal',
  standalone: true,
  imports: [FormsModule,MatFormFieldModule, MatInputModule, MatSelectModule,MatIconModule],
  templateUrl: './add-workout-modal.component.html',
  styleUrl: './add-workout-modal.component.css'
})
export class AddWorkoutModalComponent {
   constructor(private workoutservice:WorkoutService) {}
     @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

   close() {
     this.closeModal.emit();
   }
   workoutData: WorkoutData = {
    id:'',
    userName:"",
    workouts:[{
    type:'',
    minutes:0
    }]

    
   }


  onSubmit(form:any) {
    const id = uuidv4();
    this.workoutData.id= id;
    this.workoutData.userName=form.value.userName;
    this.workoutData.workouts[0].type =form.value.type;
    this.workoutData.workouts[0].minutes = form.value.minutes;
     console.log("workoutsbefore adding",this.workoutData)
    this.workoutservice.addOrUpdateWorkout(this.workoutData);
    this.close();
  }



}   
