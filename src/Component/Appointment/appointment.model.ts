export interface ResourceAppointment {
    id: string;
    resource: string; // Staff name
    resourceStartTime: Date;
    resourceEndTime: Date;
    title: string;
    status: 'Created' | 'Pending' | 'NotAllocated';
  }