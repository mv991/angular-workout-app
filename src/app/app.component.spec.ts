import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations'; // Import NoopAnimationsModule
import { AppComponent } from './app.component';
import { AddWorkoutModalComponent } from './add-workout-modal/add-workout-modal.component';

describe('AppComponent', () => {
    let fixture: ComponentFixture<AppComponent>
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule, // Include NoopAnimationsModule to disable animations
        AppComponent, // Import the standalone component
        AddWorkoutModalComponent // Include the modal component
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'workout-app' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('workout-app');
  });

  it('should render title', () => {

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('p')?.textContent).toContain('Welcome to FitTrack');
  });
it('should show the modal when the "Add Workout" button is clicked', async () => {
  const fixture = TestBed.createComponent(AppComponent);
  const app = fixture.componentInstance;
  fixture.detectChanges(); // Initial change detection
  const compiled = fixture.nativeElement as HTMLElement;

  // Initial state should have the modal hidden
  expect(compiled.querySelector('app-add-workout-modal')).toBeFalsy();

  // Wait for fixture to stabilize before querying the DOM
  await fixture.whenStable();

  // Simulate button click to show modal
  const button = compiled.querySelector('#open-modal-button') as HTMLButtonElement;
  expect(button).toBeTruthy(); // Ensure button is found
  button.click();
  fixture.detectChanges(); // Run change detection again

  // Modal should be visible now
  expect(compiled.querySelector('app-add-workout-modal')).toBeTruthy();
});
it('should hide the modal when the closeModal event is emitted', () => {
  const fixture = TestBed.createComponent(AppComponent);
  const app = fixture.componentInstance;
  const compiled = fixture.nativeElement as HTMLElement;

  // Show the modal first
  app.showModal = true;
  fixture.detectChanges();
  expect(compiled.querySelector('app-add-workout-modal')).toBeTruthy();

  // Simulate closeModal event
  app.toggleModal();
  fixture.detectChanges();

  // Modal should be hidden now
  expect(compiled.querySelector('app-add-workout-modal')).toBeFalsy();
});
});
