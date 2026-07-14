import { Appointment } from '../types';

interface AppointmentSummaryProps {
  appointment: Appointment;
  onReset: () => void;
}

export default function AppointmentSummary({ appointment, onReset }: AppointmentSummaryProps) {
  return (
    <div className="rounded-[2rem] border border-sand bg-white/90 p-6 shadow-soft">
      <div className="space-y-4 text-center">
        <p className="text-sm uppercase tracking-[0.25em] text-sage">Booking complete</p>
        <h1 className="text-3xl font-semibold text-charcoal">Your appointment is confirmed</h1>
        <p className="mx-auto max-w-xl text-sm text-gray-600">
          Thank you for selecting our salon. Your stylist will review your consent form and prepare your appointment.
        </p>
      </div>
      <div className="mt-8 grid gap-4 rounded-[1.5rem] bg-blush/60 p-6 text-sm text-gray-700 sm:grid-cols-2">
        <div>
          <p className="font-semibold text-charcoal">Confirmation code</p>
          <p className="mt-2 text-2xl font-semibold text-charcoal">{appointment.confirmationCode}</p>
        </div>
        <div>
          <p className="font-semibold text-charcoal">Appointment</p>
          <p className="mt-2">{appointment.date} at {appointment.time}</p>
        </div>
        <div>
          <p className="font-semibold text-charcoal">Guest</p>
          <p className="mt-2">{appointment.customerName}</p>
          <p>{appointment.email}</p>
        </div>
        <div>
          <p className="font-semibold text-charcoal">Services</p>
          <p className="mt-2">{appointment.services.map(service => service.title).join(', ')}</p>
        </div>
      </div>
      <button
        type="button"
        onClick={onReset}
        className="mt-8 w-full rounded-3xl bg-sage px-6 py-4 text-lg font-semibold text-white transition hover:bg-sage/90"
      >
        Book another appointment
      </button>
    </div>
  );
}
