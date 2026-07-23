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
    <div className="min-h-screen bg-gradient-to-br from-cream via-blush to-accent-light text-charcoal">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <header className="mb-12 animate-fade-in">
          <div className="card p-8 sm:p-12 mb-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex-1">
                <p className="text-xs uppercase tracking-[0.35em] text-sage font-semibold">Premium Salon Services</p>
                <h1 className="mt-4 text-4xl sm:text-5xl font-bold text-charcoal leading-tight">
                  Radiant Beauty Starts Here
                </h1>
                <p className="mt-5 max-w-2xl text-base text-text-secondary leading-relaxed">
                  Experience luxury salon services with expert makeup artistry and precision waxing. Book your appointment, share your skin details, and enjoy a personalized beauty experience.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:items-end flex-shrink-0">
                <button
                  type="button"
                  onClick={() => setMode('admin-login')}
                  className="btn-primary btn-lg"
                >
                  Admin Access
                </button>
                <div className="card p-4 bg-gradient-warm text-sm max-w-xs">
                  <p className="font-semibold text-charcoal">✨ Local Storage</p>
                  <p className="mt-2 text-text-secondary text-xs">Your bookings are saved securely in your browser and appear instantly in admin view.</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Admin Login */}
        {mode === 'admin-login' ? (
          <div className="mx-auto max-w-2xl animate-slide-up">
            <div className="card p-8 sm:p-12">
              <h2 className="text-3xl font-bold text-charcoal">Admin Access</h2>
              <p className="mt-3 text-text-secondary">
                Enter the admin passphrase to manage appointments and view consent details.
              </p>
              <div className="mt-8 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-2">Passphrase</label>
                  <input
                    type="password"
                    value={adminPassword}
                    onChange={event => setAdminPassword(event.target.value)}
                    placeholder="Enter admin passphrase"
                    className="input"
                    onKeyPress={e => e.key === 'Enter' && handleAdminLogin()}
                  />
                </div>
                <button
                  type="button"
                  onClick={handleAdminLogin}
                  className="btn-primary w-full btn-lg"
                >
                  Unlock Dashboard
                </button>
              </div>
              {authError && (
                <div className="mt-4 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                  {authError}
                </div>
              )}
              <button
                type="button"
                onClick={() => {
                  setMode('booking');
                  setAuthError('');
                }}
                className="btn-tertiary mt-6"
              >
                ← Back to Booking
              </button>
            </div>
          </div>
        ) : mode === 'admin' ? (
          <AdminDashboard
            appointments={appointments}
            onLogout={handleLogout}
            onToggleStatus={handleToggleStatus}
          />
        ) : (
          <main className="space-y-10">
            {mode === 'summary' && activeAppointment ? (
              <AppointmentSummary appointment={activeAppointment} onReset={handleReset} />
            ) : (
              <BookingForm services={services} onSubmit={handleAppointmentSubmit} />
            )}

            {recentAppointment && mode !== 'summary' ? (
              <div className="card p-6 sm:p-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-sage font-semibold">Latest Booking</p>
                    <h2 className="mt-2 text-2xl font-bold text-charcoal">Most Recent Reservation</h2>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    recentAppointment.status === 'Confirmed'
                      ? 'bg-sage/20 text-sage'
                      : 'bg-accent/20 text-accent'
                  }`}>
                    {recentAppointment.status}
                  </span>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="rounded-xl bg-gradient-warm p-4">
                    <p className="font-semibold text-charcoal text-sm">Guest</p>
                    <p className="mt-1 text-charcoal font-medium">{recentAppointment.customerName}</p>
                    <p className="text-xs text-text-tertiary mt-1">{recentAppointment.email}</p>
                  </div>
                  <div className="rounded-xl bg-gradient-warm p-4">
                    <p className="font-semibold text-charcoal text-sm">Date & Time</p>
                    <p className="mt-1 text-charcoal font-medium">{recentAppointment.date}</p>
                    <p className="text-xs text-text-tertiary mt-1">{recentAppointment.time}</p>
                  </div>
                  <div className="rounded-xl bg-gradient-warm p-4">
                    <p className="font-semibold text-charcoal text-sm">Services</p>
                    <p className="mt-1 text-charcoal font-medium text-sm">{recentAppointment.services.length} selected</p>
                    <p className="text-xs text-text-tertiary mt-1">Total: ${recentAppointment.services.reduce((sum, s) => sum + Number(s.price.replace('$', '')), 0)}</p>
                  </div>
                  <div className="rounded-xl bg-gradient-warm p-4">
                    <p className="font-semibold text-charcoal text-sm">Confirmation</p>
                    <p className="mt-1 text-charcoal font-mono text-xs font-semibold">{recentAppointment.confirmationCode}</p>
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