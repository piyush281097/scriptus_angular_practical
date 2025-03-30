import { signalStore, withState, withProps, withComputed, patchState, withMethods } from '@ngrx/signals';
import { ResourceAppointment } from './appointment.model';

export const SchedulerStore = signalStore(
  { providedIn: 'root' }, // Provide store globally
  
  // Define initial state
  withState({
    appointments: [
      {
        id: '1',
        resource: 'JADES',
        resourceStartTime: new Date(2025, 1, 19, 11, 30),
        resourceEndTime: new Date(2025, 1, 19, 12, 0),
        title: '',
        status: 'NotAllocated',
      },
      {
        id: '2',
        resource: 'EMMA',
        resourceStartTime: new Date(2025, 1, 19, 15, 30),
        resourceEndTime: new Date(2025, 1, 19, 16, 15),
        title: 'BIAB - FRENCH/OMBRÉ',
        status: 'Pending',
      },
      {
        id: '1',
        resource: 'EMMA',
        resourceStartTime: new Date(2025, 1, 19, 11, 30),
        resourceEndTime: new Date(2025, 1, 19, 12, 0),
        title: '',
        status: 'NotAllocated',
      },
      {
        id: '3',
        resource: 'JADES',
        resourceStartTime: new Date(2025, 1, 19, 16, 30),
        resourceEndTime: new Date(2025, 1, 19, 17, 25),
        title: 'Gel Polish/Shellac Application Toes',
        status: 'Created',
      },
      {
        id: '1',
        resource: 'AINE',
        resourceStartTime: new Date(2025, 1, 19, 11, 30),
        resourceEndTime: new Date(2025, 1, 19, 12, 0),
        title: '',
        status: 'NotAllocated',
      },
      {
        id: '4',
        resource: 'AINE',
        resourceStartTime: new Date(2025, 1, 19, 16, 15),
        resourceEndTime: new Date(2025, 1, 19, 17, 15),
        title:
          'Eye Trio (Brow Shape + Tint + Lash Tint) & Gel Polish/Shellac Removal',
        status: 'Created',
      },
      {
        id: '1',
        resource: 'AONGHUS',
        resourceStartTime: new Date(2025, 1, 19, 11, 30),
        resourceEndTime: new Date(2025, 1, 19, 12, 0),
        title: '',
        status: 'NotAllocated',
      },
      {
        id: '5',
        resource: 'AONGHUS',
        resourceStartTime: new Date(2025, 1, 19, 9, 15),
        resourceEndTime: new Date(2025, 1, 19, 11, 15),
        title:
          'Eye Trio (Brow Shape + Tint + Lash Tint) & Gel Polish/Shellac Removal',
        status: 'Pending',
      },
      {
        id: '6',
        resource: 'AONGHUS',
        resourceStartTime: new Date(2025, 1, 19, 12, 15),
        resourceEndTime: new Date(2025, 1, 19, 14, 15),
        title:'',
        status: 'NotAllocated',
      },
      {
        id: '1',
        resource: 'JADES',
        resourceStartTime: new Date(2025, 1, 20, 10, 3), // Feb 19, 2025, 4:15 PM
        resourceEndTime: new Date(2025, 1, 20, 12, 13), // Feb 19, 2025, 5:15 PM
        title: 'BIAB - REFILL FULL COLOUR ONLY',
        status: 'Pending',
      },
      {
        id: '1',
        resource: 'EMMA',
        resourceStartTime: new Date(2025, 1, 20, 11, 30),
        resourceEndTime: new Date(2025, 1, 20, 12, 0),
        title: '',
        status: 'NotAllocated',
      },
      {
        id: '2',
        resource: 'EMMA',
        resourceStartTime: new Date(2025, 1, 20, 15, 30),
        resourceEndTime: new Date(2025, 1, 20, 16, 15),
        title: 'BIAB - FRENCH/OMBRÉ',
        status: 'Pending',
      },
    ] as ResourceAppointment[],
    resoruceMember: ['JADES', 'EMMA', 'AINE', 'AONGHUS'], // Resource members
    timeSlots: [
        "09:00",
        "09:30",
        "10:00",
        "10:30",
        "11:00",
        "11:30",
        "12:00",
        "12:30",
        "13:00",
        "13:30",
        "14:00",
        "14:30",
        "15:00",
        "15:30",
        "16:00",
        "16:30",
        "17:00"
    ],
    slotHeight: 60,
    startHour:9,
    endHour:17,
    selectedDate: new Date(2025, 1, 19), // Initial selected date
  }),

  // Define props (inject services or define reusable methods)
  withProps(() => ({
    currentDate: new Date(),
  })),

  // Computed properties for derived state
  withComputed((store) => ({
  })),

  // Methods for state updates
  withMethods((store) => ({
    setDate(date: Date) {
      patchState(store, { selectedDate: date });
    },
    getAppointments(resourceName: string, timeSlotIndex: number): ResourceAppointment[] {
        const timeSlot = store.timeSlots()[timeSlotIndex];
        const [hourStr, minuteStr] = timeSlot.split(':');
        const hour = parseInt(hourStr);
        const minute = parseInt(minuteStr);
    
        return store.appointments().filter((appt:ResourceAppointment) => {
            const appointmentStartTime = new Date(appt.resourceStartTime);
            const appointmentDate = new Date(appt.resourceStartTime.getFullYear(),appt.resourceStartTime.getMonth(),appt.resourceStartTime.getDate());
            const appointmentHour = appointmentStartTime.getHours();
            const appointmentMinute = appointmentStartTime.getMinutes();
    
        return (
            appt.resource === resourceName &&
            appointmentHour === hour &&
            appointmentMinute >= minute &&
            appointmentMinute < minute + 30 &&
            appointmentDate.getTime() == store.selectedDate().getTime()
        );
        });
    },

    getAppointmentTopOffset(appointment: ResourceAppointment, timeSlotIndex: number): number {
      const timeSlot = store.timeSlots()[timeSlotIndex];
      if (!timeSlot) return 0;

      const [hourStr, minuteStr] = timeSlot.split(':');
      const slotHour = parseInt(hourStr, 10);
      const slotMinute = parseInt(minuteStr, 10);

      const appointmentStartTime = new Date(appointment.resourceStartTime);
      const appointmentStartHour = appointmentStartTime.getHours();
      const appointmentStartMinute = appointmentStartTime.getMinutes();

      if (appointmentStartHour < slotHour || (appointmentStartHour === slotHour && appointmentStartMinute < slotMinute)) {
        return 0; // Appointment started before this slot
      } else {
        const slotStartMinutes = slotHour * 60 + slotMinute;
        const appointmentStartMinutes = appointmentStartHour * 60 + appointmentStartMinute;
        const minutesPastSlotStart = appointmentStartMinutes - slotStartMinutes;

        return (minutesPastSlotStart / 30) * store.slotHeight();
      }
    },

    getAppointmentHeight(appointment: ResourceAppointment, timeSlotIndex:number): number {
      
      const timeSlot = store.timeSlots()[timeSlotIndex];;
      const [hourStr, minuteStr] = timeSlot.split(':');
      const hour = parseInt(hourStr);
  
      const appointmentStartTime = new Date(appointment.resourceStartTime);
      const appointmentEndTime = new Date(appointment.resourceEndTime);
      const appointmentStartHour = appointmentStartTime.getHours();
      const appointmentEndHour = appointmentEndTime.getHours();
      const appointmentEndMinute = appointmentEndTime.getMinutes();
  
      if (appointmentStartHour < hour && appointmentEndHour > hour) {
          // Spanning multiple slots, calculate based on slot duration
          return store.slotHeight(); // Occupy full slot
      }
      else if (appointmentStartHour < hour && appointmentEndHour === hour) {
          //Spanning multiple slots end ends with this slot
          const endTotalMin = (hour*30) + appointmentEndMinute
          const startSlotMinutes = hour * 30;
  
          const durationMinutes = endTotalMin - startSlotMinutes
          return (durationMinutes/30) * store.slotHeight();
      }
       else {
            // Starts and ends within this slot. or starts within.
            const durationMinutes = (appointmentEndTime.getTime() - appointmentStartTime.getTime()) / (1000 * 60);
            return (durationMinutes / 30) * store.slotHeight();  // Height based on the time
          }
    }
  }))
);
