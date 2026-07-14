import { useEffect, useMemo, useState } from 'react';
import BookingForm from './components/BookingForm';
import AppointmentSummary from './components/AppointmentSummary';
import AdminDashboard from './components/AdminDashboard';
import { Appointment, Service } from './types';

const ADMIN_PASSWORD = 'salonsparkle';
const STORAGE_KEY = 'salon-appointments';

const services: Service[] = [
  {
    id: 'makeup-glam',
    title: 'Glam Makeup',
    description: 'Full event makeup with shading, contour, and long-wear finish.',
    price: '$95',
    duration: '70 min',
    category: 'Makeup',
  },
  {
    id: 'makeup-natural',
    title: 'Natural Glow',
    description: 'Soft and luminous makeup for daytime and photos.',
    price: '$75',
    duration: '55 min',
    category: 'Makeup',
  },
  {
    id: 'makeup-bride',
    title: 'Bridal Beauty',
    description: 'Personalized bridal look with trial and luxe finishing touches.',
    price: '$160',
    duration: '110 min',
    category: 'Makeup',
  },
  {
    id: 'waxing-brows',
    title: 'Brow Sculpt',
    description: 'Precision brow shaping for a clean, defined look.',
    price: '$28',
    duration: '25 min',
    category: 'Waxing',
  },
  {
    id: 'waxing-lips',
    title: 'Lip Wax',
    description: 'Quick, gentle lip waxing for smooth results.',
    price: '$18',
    duration: '15 min',
    category: 'Waxing',
  },
  {
    id: 'waxing-full-face',
    title: 'Full Face Wax',
    description: 'Complete facial waxing with soothing post-care treatment.',
    price: '$55',
    duration: '40 min',
    category: 'Waxing',
  },
];

function getStoredAppointments(): Appointment[] {
  if (typeof window === 'undefined') return [];
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as Appointment[];
  } catch {
    return [];
  }
}

export default function App() {
  const [appointments, setAppointments] = useState<Appointment[]>(() => getStoredAppointments());
  const [mode, setMode] = useState<'booking' | 'summary' | 'admin-login' | 'admin'>('booking');
  const [activeAppointment, setActiveAppointment] = useState<Appointment | null>(null);
  const [adminPassword, setAdminPassword] = useState('');
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
  }, [appointments]);

  const recentAppointment = useMemo(() => appointments[0] ?? null, [appointments]);

  const handleAppointmentSubmit = (appointment: Appointment) => {
    setAppointments(prev => [appointment, ...prev]);
    setActiveAppointment(appointment);
    setMode('summary');
  };

  const handleReset = () => {
    setActiveAppointment(null);
    setMode('booking');
  };

  const handleAdminLogin = () => {
    if (adminPassword.trim() === ADMIN_PASSWORD) {
      setMode('admin');
      setAuthError('');
      setAdminPassword('');
    } else {
      setAuthError('Incorrect password. Please try again.');
    }
  };

  const handleLogout = () => {
    setMode('booking');
    setAdminPassword('');
    setAuthError('');
  };

  const handleToggleStatus = (id: string) => {
    setAppointments(prev =>
      prev.map(appointment =>
        appointment.id === id
          ? {
              ...appointment,
              status: appointment.status === 'Confirmed' ? 'Completed' : 'Confirmed',
            }
          : appointment,
      ),
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blush via-cream to-white text-charcoal">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-8 flex flex-col gap-4 rounded-[2.5rem] border border-sand bg-white/90 p-6 shadow-soft sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-sage">Salon Appointment</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-charcoal sm:text-5xl">
              Radiant beauty starts with a calm booking experience.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
              Pick your favorite makeup or waxing service, share skin details, and choose a time that fits your schedule. Admin mode keeps every booking safe on your device.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:items-end">
            <button
              type="button"
              onClick={() => setMode('admin-login')}
              className="inline-flex items-center justify-center rounded-3xl bg-sage px-6 py-3 text-sm font-semibold text-white transition hover:bg-sage/90"
            >
              Admin dashboard
            </button>
            <div className="rounded-3xl border border-sand bg-blush/80 px-5 py-4 text-sm text-gray-700">
              <p className="font-semibold text-charcoal">Hosted locally</p>
              <p className="mt-1">Entries persist in your browser and appear instantly in admin view.</p>
            </div>
          </div>
        </header>

        {mode === 'admin-login' ? (
          <div className="mx-auto max-w-3xl rounded-[2rem] border border-sand bg-white/90 p-8 shadow-soft">
            <h2 className="text-2xl font-semibold text-charcoal">Admin access</h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter the admin passphrase to manage appointments and view consent details.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-[1fr,auto]">
              <input
                type="password"
                value={adminPassword}
                onChange={event => setAdminPassword(event.target.value)}
                placeholder="Enter password"
                className="w-full rounded-3xl border border-sand bg-blush/60 px-4 py-3 text-gray-800 outline-none focus:border-sage focus:ring-2 focus:ring-sage/20"
              />
              <button
                type="button"
                onClick={handleAdminLogin}
                className="rounded-3xl bg-sage px-6 py-3 text-sm font-semibold text-white transition hover:bg-sage/90"
              >
                Unlock
              </button>
            </div>
            {authError ? <p className="mt-4 text-sm text-red-600">{authError}</p> : null}
            <button
              type="button"
              onClick={() => {
                setMode('booking');
                setAuthError('');
              }}
              className="mt-6 text-sm font-semibold text-sage underline"
            >
              Return to booking
            </button>
          </div>
        ) : mode === 'admin' ? (
          <AdminDashboard
            appointments={appointments}
            onLogout={handleLogout}
            onToggleStatus={handleToggleStatus}
          />
        ) : (
          <main className="space-y-8">
            {mode === 'summary' && activeAppointment ? (
              <AppointmentSummary appointment={activeAppointment} onReset={handleReset} />
            ) : (
              <BookingForm services={services} onSubmit={handleAppointmentSubmit} />
            )}

            {recentAppointment ? (
              <div className="rounded-[2rem] border border-sand bg-white/90 p-6 shadow-soft">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-sage">Latest booking</p>
                    <h2 className="mt-2 text-xl font-semibold text-charcoal">Most recent reservation</h2>
                  </div>
                  <span className="rounded-full bg-sand px-4 py-2 text-sm font-semibold text-charcoal">
                    {recentAppointment.status}
                  </span>
                </div>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl bg-blush/70 p-4">
                    <p className="font-semibold text-charcoal">Guest</p>
                    <p>{recentAppointment.customerName}</p>
                    <p className="text-sm text-gray-600">{recentAppointment.email}</p>
                  </div>
                  <div className="rounded-3xl bg-blush/70 p-4">
                    <p className="font-semibold text-charcoal">Appointment</p>
                    <p>{recentAppointment.date} at {recentAppointment.time}</p>
                    <p className="mt-2 text-sm text-gray-600">Code: {recentAppointment.confirmationCode}</p>
                  </div>
                </div>
              </div>
            ) : null}
          </main>
        )}
      </div>
    </div>
  );
}
