import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErcaspayAngularComponent } from './ercaspay-angular.component';

describe('ErcaspayAngularComponent', () => {
  let component: ErcaspayAngularComponent;
  let fixture: ComponentFixture<ErcaspayAngularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErcaspayAngularComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ErcaspayAngularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
