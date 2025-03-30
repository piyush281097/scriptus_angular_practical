import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SchedulerComponent } from '../Component/Appointment/scheduler/scheduler.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SchedulerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'scriptus-practical';
}
