import { CommonModule, DatePipe } from '@angular/common';
import { Component, effect, ElementRef, inject, Renderer2 } from '@angular/core';
import { ResourceAppointmentCardComponent } from "../resource-appointment-card/resource-appointment-card.component";
import { ResourceAppointment } from '../appointment.model';
import { SchedulerStore } from '../scheduler.store';
import { getState } from '@ngrx/signals';

@Component({
  selector: 'app-scheduler',
  imports: [CommonModule, ResourceAppointmentCardComponent],
  templateUrl: './scheduler.component.html',
  styleUrl: './scheduler.component.scss'
})
export class SchedulerComponent {
[x: string]: any;
  readonly store = inject(SchedulerStore);
  state: any;
  currentDate = new Date();

  constructor(private renderer: Renderer2, private el: ElementRef) {
    effect(() => {
      // 👇 The effect will be re-executed whenever the state changes.
      this.state = getState(this.store);
    });
  }

  ngAfterViewInit(): void {
    this.updateCurrentTimeIndicator();
    setInterval(() => this.updateCurrentTimeIndicator(), 60000); // Update every minute
  }

  updateCurrentTimeIndicator() {
    const now = new Date();
    const currentHour = now.getHours() + 1;
    const currentMinute = now.getMinutes();

    const timeSlots = this.store.timeSlots();
    const slotHeight = this.store.slotHeight(); 

    let topOffset = 0;

    const [firstHour, firstSlotMinute] = timeSlots[0].split(':').map(Number);
    const [lastSlotHour, lastSlotMinute] = timeSlots[timeSlots.length - 1].split(':').map(Number);
    for (let i = 0; i < timeSlots.length - 1; i++) {
      const [slotHour, slotMinute] = timeSlots[i].split(':').map(Number);
      const [nextSlotHour, nextSlotMinute] = timeSlots[i + 1].split(':').map(Number);

      const slotStartTime = slotHour * 60 + slotMinute;
      const slotEndTime = nextSlotHour * 60 + nextSlotMinute;
      const currentTimeInMinutes = currentHour * 60 + currentMinute;

      if (currentTimeInMinutes >= slotStartTime && currentTimeInMinutes < slotEndTime) {
        const minutesPastSlotStart = currentTimeInMinutes - slotStartTime;
        const slotDuration = slotEndTime - slotStartTime; // Always 30 minutes
        topOffset = i * slotHeight + (minutesPastSlotStart / slotDuration) * slotHeight;
      }
    }

    const indicator = this.el.nativeElement.querySelector('#current-time-indicator');
    if (indicator && firstHour < currentHour && lastSlotHour > currentHour  ) {
      indicator.style.top = `${topOffset}px`;
      indicator.style.display = 'block'; // Ensure it's visible
    }
  }

  onDateSelect(newDate: Date) {
    this.store.setDate(newDate);
  }

  goToPreviousDay() {
    const currentDate = new Date(this.store.selectedDate());
    const previousDay = new Date(currentDate.setDate(currentDate.getDate() - 1));
    this.store.setDate(previousDay);
  }

  goToNextDay() {
    const currentDate = new Date(this.store.selectedDate());
    const nextDay = new Date(currentDate.setDate(currentDate.getDate() + 1));
    this.store.setDate(nextDay);
  }

  getStatus(time:string):string {
    let hour = parseInt(time, 10);
    if (hour > 12) {
      return 'PM'
    }else {
      return 'AM'
    }
  }
}
