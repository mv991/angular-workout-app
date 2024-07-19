import { TestBed } from '@angular/core/testing';
import { WorkoutService } from './workout.service';

interface WorkoutType {
id:string,
userName:string,
workouts:[{
  type:string,
  minutes:number
}]
}
describe('WorkoutService', () => {
  let service: WorkoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkoutService);
    // Clear local storage before each test
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a new workout for a new user', () => {
    const newWorkout = {
      userName: 'John',
      workouts: [{ type: 'Running', minutes: 30 }]
    };

    service.addOrUpdateWorkout(newWorkout);

    const storedWorkouts:WorkoutType[] = service.getAllItems('workouts');
    expect(storedWorkouts.length).toBe(1);
    expect(storedWorkouts[0].userName).toBe('John');
    expect(storedWorkouts[0].workouts.length).toBe(1);
    expect(storedWorkouts[0].workouts[0].type).toBe('Running');
    expect(storedWorkouts[0].workouts[0].minutes).toBe(30);
  });

  it('should update an existing workout for an existing user', () => {
    const initialWorkout = {
      userName: 'John',
      workouts: [{ type: 'Running', minutes: 30 }]
    };

    service.addOrUpdateWorkout(initialWorkout);

    const updatedWorkout = {
      userName: 'John',
      workouts: [{ type: 'Running', minutes: 20 }]
    };

    service.addOrUpdateWorkout(updatedWorkout);

    const storedWorkouts = service.getAllItems('workouts');
    
   
    expect(storedWorkouts[0].workouts.length).toBe(1);
    expect(storedWorkouts[0].workouts[0].type).toBe('Running');
    expect(storedWorkouts[0].workouts[0].minutes).toBe(50);
  });

  it('should add a new workout type for an existing user', () => {
    const initialWorkout = {
      userName: 'John',
      workouts: [{ type: 'Running', minutes: 30 }]
    };

    service.addOrUpdateWorkout(initialWorkout);

    const newWorkoutType = {
      userName: 'John',
      workouts: [{ type: 'Swimming', minutes: 45 }]
    };

    service.addOrUpdateWorkout(newWorkoutType);

    const storedWorkouts = service.getAllItems('workouts');
    console.log('Stored Workouts After Adding New Workout Type:', storedWorkouts);
    expect(storedWorkouts.length).toBe(1);
    expect(storedWorkouts[0].workouts.length).toBe(2);
    expect(storedWorkouts[0].workouts.find((w:{type:string,minutes:number}) => w.type === 'Running')?.minutes).toBe(30);
    expect(storedWorkouts[0].workouts.find((w:{type:string,minutes:number}) => w.type === 'Swimming')?.minutes).toBe(45);

   
  });

  it('should remove an item from local storage', () => {
    const key = 'testKey';
    const data = { userName: 'Test' };
    service.setItem(key, data);
    expect(service.getAllItems(key)).toEqual(data);

    service.removeItem(key);
    expect(service.getAllItems(key)).toBeNull();
  });
});
