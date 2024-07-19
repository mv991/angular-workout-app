import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AddWorkoutModalComponent } from './add-workout-modal.component';
import { DebugElement } from '@angular/core';
import { AppComponent } from '../app.component';


describe('AddWorkoutModalComponent', () => {
  let component: AddWorkoutModalComponent;
  let fixture: ComponentFixture<AddWorkoutModalComponent>;
  let fixture1: ComponentFixture<AppComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AddWorkoutModalComponent,
        BrowserAnimationsModule // Import BrowserAnimationsModule
      ],
      // Add any other modules or providers the component might need here
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddWorkoutModalComponent);
    fixture1 = TestBed.createComponent(AppComponent)
    component = fixture.componentInstance;
    fixture.detectChanges();
    fixture1.detectChanges()
  })

  it('should open modal on button click', () => {
    // Arrange: Find the button and the modal in the component
     const button = fixture1.nativeElement.querySelector('button');// Adjust selector based on your button's class or id
  
console.log("button",fixture1.nativeElement.querySelector('#open-modal-button'))

    button.click()
    fixture.detectChanges(); // Trigger change detection to update the DOM

    // Assert: Check if the modal is visible
    const updatedModal: DebugElement = fixture.debugElement.query(By.css('.modal')); // Adjust selector based on your modal's class or id
    expect(updatedModal).toBeTruthy(); // Modal should now be in the DOM
; // Or another class indicating visibility if your modal uses it
  });
});
