import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { By } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, MatCardModule, MatButtonModule, HomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Basic test to check if the component is created
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test to check the existence of the cards array
  it('should have a cards array with initial data', () => {
    expect(component.cards).toBeDefined();
    expect(component.cards.length).toBe(3);
    expect(component.cards[0].title).toBe('Welcome to the App');
  });

  // Test to check if the correct number of cards are rendered
  it('should render the correct number of cards', () => {
    const cardElements = fixture.debugElement.queryAll(By.css('mat-card'));
    expect(cardElements.length).toBe(3); // Adjust if you change the number of cards in the component
  });

  // Test to check if onActionClick is called when action button is clicked
  it('should call onActionClick when action button is clicked', () => {
    spyOn(component, 'onActionClick');
    const actionButton = fixture.debugElement.query(By.css('button[color="primary"]')).nativeElement;
    actionButton.click();
    expect(component.onActionClick).toHaveBeenCalledWith('Explore'); // Adjust based on the first card's action
  });

  // Test to check if onCancelClick is called when cancel button is clicked
  it('should call onCancelClick when cancel button is clicked', () => {
    spyOn(component, 'onCancelClick');
    const cancelButton = fixture.debugElement.query(By.css('button[color="warn"]')).nativeElement;
    cancelButton.click();
    expect(component.onCancelClick).toHaveBeenCalled();
  });
});
