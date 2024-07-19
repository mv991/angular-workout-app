import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  constructor() { }

    setItem(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  getAllItems(key:string) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }
addOrUpdateWorkout(workout: any) {
    const workouts:any  = this.getAllItems('workouts') || [];
    // @ts-ignore
    const existingPerson = workouts.find(w => w.userName === workout.userName);
    if (existingPerson) {
      // @ts-ignore
       const existingWorkoutType = existingPerson.workouts.find(w => w.type === workout.workouts[0].type);
       if (existingWorkoutType) {
            existingWorkoutType.minutes += workout.workouts[0].minutes;
        } else {
            existingPerson.workouts.push({
                type: workout.workouts[0].type,
                minutes: workout.workouts[0].minutes
            });
        }
    } else {
      
      workouts.push(workout);
    }

    this.setItem('workouts', workouts);
}
  removeItem(key: string) {
    localStorage.removeItem(key);
  }
}
