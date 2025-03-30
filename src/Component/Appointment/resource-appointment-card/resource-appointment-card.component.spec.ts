import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceAppointmentCardComponent } from './resource-appointment-card.component';

describe('ResourceAppointmentCardComponent', () => {
  let component: ResourceAppointmentCardComponent;
  let fixture: ComponentFixture<ResourceAppointmentCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourceAppointmentCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResourceAppointmentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
