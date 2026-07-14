export type ServiceCategory = 'Makeup' | 'Waxing';

export interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  duration: string;
  category: ServiceCategory;
}

export interface ConsentDetails {
  allergies: string[];
  skinConditions: string[];
  signature: string;
  notes: string;
}

export interface Appointment {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  services: Service[];
  consent: ConsentDetails;
  status: 'Confirmed' | 'Completed';
  confirmationCode: string;
  createdAt: string;
}
