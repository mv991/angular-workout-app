import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AddWorkoutModalComponent } from './add-workout-modal/add-workout-modal.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, AppComponent, AddWorkoutModalComponent],
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
    expect(compiled.querySelector('p')?.textContent).toContain(
      'Welcome to FitTrack'
    );
  });
  it('should show the modal when the "Add Workout" button is clicked', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('app-add-workout-modal')).toBeFalsy();

    await fixture.whenStable();

    const button = compiled.querySelector(
      '#open-modal-button'
    ) as HTMLButtonElement;
    expect(button).toBeTruthy();
    button.click();
    fixture.detectChanges();

    expect(compiled.querySelector('app-add-workout-modal')).toBeTruthy();
  });
  it('should hide the modal when the closeModal event is emitted', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const compiled = fixture.nativeElement as HTMLElement;

    app.showModal = true;
    fixture.detectChanges();
    expect(compiled.querySelector('app-add-workout-modal')).toBeTruthy();

    app.toggleModal();
    fixture.detectChanges();

    expect(compiled.querySelector('app-add-workout-modal')).toBeFalsy();
  });
});
