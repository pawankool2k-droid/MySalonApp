import { useMemo, useState } from 'react';
import { Appointment } from '../types';

interface AdminDashboardProps {
  appointments: Appointment[];
  onLogout: () => void;
  onToggleStatus: (id: string) => void;
}

export default function AdminDashboard({ appointments, onLogout, onToggleStatus }: AdminDashboardProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedAppointment = useMemo(
    () => appointments.find(appointment => appointment.id === selectedId) ?? appointments[0] ?? null,
    [appointments, selectedId],
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-[2rem] border border-sand bg-white/90 p-6 shadow-soft sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-sage">Admin dashboard</p>
          <h1 className="mt-2 text-3xl font-semibold text-charcoal">Appointment manager</h1>
          <p className="mt-2 text-sm text-gray-600">
            Review bookings, update statuses, and view completed consent details.
          </p>
        </div>
        <button
          type="button"
          onClick={onLogout}
          className="rounded-3xl border border-sand bg-blush/70 px-5 py-3 text-sm font-semibold text-charcoal transition hover:bg-blush"
        >
          Exit dashboard
        </button>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr,0.8fr]">
        <section className="rounded-[2rem] border border-sand bg-white/90 p-6 shadow-soft">
          <div className="flex items-center justify-between gap-4 pb-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm text-gray-600">Total appointments</p>
              <p className="mt-1 text-3xl font-semibold text-charcoal">{appointments.length}</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-sand text-left text-sm text-gray-700">
              <thead>
                <tr>
                  <th className="px-4 py-3 font-medium text-charcoal">Client</th>
                  <th className="px-4 py-3 font-medium text-charcoal">Service</th>
                  <th className="px-4 py-3 font-medium text-charcoal">When</th>
                  <th className="px-4 py-3 font-medium text-charcoal">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand">
                {appointments.map(appointment => (
                  <tr
                    key={appointment.id}
                    className="cursor-pointer transition hover:bg-blush/50"
                    onClick={() => setSelectedId(appointment.id)}
                  >
                    <td className="px-4 py-4">
                      <div className="font-semibold text-charcoal">{appointment.customerName}</div>
                      <div className="text-xs text-gray-500">{appointment.email}</div>
                    </td>
                    <td className="px-4 py-4">{appointment.services.map(service => service.title).join(', ')}</td>
                    <td className="px-4 py-4">
                      <div>{appointment.date}</div>
                      <div className="text-xs text-gray-500">{appointment.time}</div>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          appointment.status === 'Confirmed'
                            ? 'bg-sage/20 text-sage'
                            : 'bg-sand text-charcoal'
                        }`}
                      >
                        {appointment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-[2rem] border border-sand bg-white/90 p-6 shadow-soft">
          {selectedAppointment ? (
            <>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-sage">Appointment details</p>
                  <h2 className="mt-2 text-2xl font-semibold text-charcoal">{selectedAppointment.customerName}</h2>
                </div>
                <button
                  type="button"
                  onClick={() => onToggleStatus(selectedAppointment.id)}
                  className="rounded-3xl bg-sage px-4 py-2 text-sm font-semibold text-white transition hover:bg-sage/90"
                >
                  Mark {selectedAppointment.status === 'Confirmed' ? 'Completed' : 'Confirmed'}
                </button>
              </div>

              <div className="mt-5 space-y-4 text-sm text-gray-700">
                <div>
                  <p className="font-semibold text-charcoal">Contact</p>
                  <p>{selectedAppointment.email}</p>
                  <p>{selectedAppointment.phone}</p>
                </div>
                <div>
                  <p className="font-semibold text-charcoal">Schedule</p>
                  <p>{selectedAppointment.date} at {selectedAppointment.time}</p>
                </div>
                <div>
                  <p className="font-semibold text-charcoal">Services</p>
                  <p>{selectedAppointment.services.map(service => service.title).join(', ')}</p>
                </div>
                <div>
                  <p className="font-semibold text-charcoal">Consent summary</p>
                  <p>Signature: {selectedAppointment.consent.signature}</p>
                  <p>Allergies: {selectedAppointment.consent.allergies.length ? selectedAppointment.consent.allergies.join(', ') : 'None'}</p>
                  <p>Skin conditions: {selectedAppointment.consent.skinConditions.length ? selectedAppointment.consent.skinConditions.join(', ') : 'None'}</p>
                  <p>Notes: {selectedAppointment.consent.notes || 'No additional notes'}</p>
                </div>
              </div>
              <div className="mt-6 rounded-3xl bg-blush/70 p-4 text-sm text-gray-700">
                <p className="font-semibold text-charcoal">Confirmation</p>
                <p className="mt-2">{selectedAppointment.confirmationCode}</p>
              </div>
            </>
          ) : (
            <p className="text-sm text-gray-700">Select an appointment to view the consent form details.</p>
          )}
        </section>
      </div>
    </div>
  );
}
