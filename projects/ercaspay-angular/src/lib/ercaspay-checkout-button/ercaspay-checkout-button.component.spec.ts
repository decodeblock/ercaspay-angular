import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErcaspayCheckoutButtonComponent } from './ercaspay-checkout-button.component';

describe('ErcaspayCheckoutButtonComponent', () => {
  let component: ErcaspayCheckoutButtonComponent;
  let fixture: ComponentFixture<ErcaspayCheckoutButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErcaspayCheckoutButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ErcaspayCheckoutButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
