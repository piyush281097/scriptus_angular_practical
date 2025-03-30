import { Component, Input } from '@angular/core';
import { ResourceAppointment } from '../appointment.model';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-resource-appointment-card',
  imports: [DatePipe, CommonModule],
  templateUrl: './resource-appointment-card.component.html',
  styleUrl: './resource-appointment-card.component.scss'
})
export class ResourceAppointmentCardComponent {
  @Input() appointment!: ResourceAppointment;
  @Input() topOffset!: number;
  @Input() height!: number;
}
