import { useMemo, useState } from 'react';
import { Appointment, ConsentDetails, Service } from '../types';
import ServiceCard from './ServiceCard';
import ConsentForm from './ConsentForm';

interface BookingFormProps {
  services: Service[];
  onSubmit: (appointment: Appointment) => void;
}

const defaultConsent: ConsentDetails = {
  allergies: [],
  skinConditions: [],
  signature: '',
  notes: '',
};

function formatDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

function readableDate(date: Date) {
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

export default function BookingForm({ services, onSubmit }: BookingFormProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));
  const [selectedTime, setSelectedTime] = useState('10:00');
  const [consent, setConsent] = useState<ConsentDetails>(defaultConsent);
  const [error, setError] = useState('');

  const selectedServices = services.filter(service => selectedIds.includes(service.id));
  const totalPrice = selectedServices.reduce((sum, service) => sum + Number(service.price.replace('$', '')), 0);
  const totalDuration = selectedServices.length
    ? selectedServices.map(service => Number(service.duration.replace(' min', ''))).reduce((sum, duration) => sum + duration, 0)
    : 0;

  const availableDates = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() + i);
      return {
        value: formatDate(date),
        label: readableDate(date),
      };
    });
  }, []);

  const timeSlots = ['09:00', '10:00', '11:30', '13:00', '14:30', '16:00', '17:30'];

  const handleToggleService = (serviceId: string) => {
    setSelectedIds(prev =>
      prev.includes(serviceId) ? prev.filter(id => id !== serviceId) : [...prev, serviceId],
    );
  };

  const handleConsentChange = (field: keyof ConsentDetails, value: string | string[]) => {
    setConsent(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!customerName.trim() || !email.trim() || !phone.trim()) {
      setError('Please enter your name, email, and phone number.');
      return;
    }
    if (!selectedServices.length) {
      setError('Please choose at least one service.');
      return;
    }
    if (!consent.signature.trim()) {
      setError('Please sign the consent form to continue.');
      return;
    }

    setError('');
    const confirmationCode = `SALON-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

    onSubmit({
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      customerName: customerName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      date: selectedDate,
      time: selectedTime,
      services: selectedServices,
      consent,
      status: 'Confirmed',
      confirmationCode,
      createdAt: new Date().toISOString(),
    });
  };

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-sand bg-white/90 p-6 shadow-soft">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-sage">Book your service</p>
            <h2 className="mt-2 text-3xl font-semibold text-charcoal">Choose the perfect treatment</h2>
            <p className="mt-3 max-w-xl text-sm text-gray-600">
              Select one or more services, fill the consent details, then pick a convenient appointment time.
            </p>
          </div>
        </div>

        <div className="mt-8 space-y-6">
          {(['Makeup', 'Waxing'] as const).map(category => (
            <div key={category} className="space-y-4">
              <h3 className="text-xl font-semibold text-charcoal">{category}</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {services
                  .filter(service => service.category === category)
                  .map(service => (
                    <ServiceCard
                      key={service.id}
                      service={service}
                      selected={selectedIds.includes(service.id)}
                      onToggle={() => handleToggleService(service.id)}
                    />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
        <div className="space-y-6 rounded-[2rem] border border-sand bg-white/90 p-6 shadow-soft">
          <h2 className="text-xl font-semibold text-charcoal">Your details</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-medium text-gray-700">
              Full name
              <input
                type="text"
                value={customerName}
                onChange={event => setCustomerName(event.target.value)}
                placeholder="Jordan Lee"
                className="mt-2 w-full rounded-3xl border border-sand bg-blush/60 px-4 py-3 text-gray-800 outline-none focus:border-sage focus:ring-2 focus:ring-sage/20"
              />
            </label>
            <label className="block text-sm font-medium text-gray-700">
              Email address
              <input
                type="email"
                value={email}
                onChange={event => setEmail(event.target.value)}
                placeholder="jordan@example.com"
                className="mt-2 w-full rounded-3xl border border-sand bg-blush/60 px-4 py-3 text-gray-800 outline-none focus:border-sage focus:ring-2 focus:ring-sage/20"
              />
            </label>
            <label className="block text-sm font-medium text-gray-700">
              Phone number
              <input
                type="tel"
                value={phone}
                onChange={event => setPhone(event.target.value)}
                placeholder="(555) 123-4567"
                className="mt-2 w-full rounded-3xl border border-sand bg-blush/60 px-4 py-3 text-gray-800 outline-none focus:border-sage focus:ring-2 focus:ring-sage/20"
              />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-medium text-gray-700">
                Date
                <select
                  value={selectedDate}
                  onChange={event => setSelectedDate(event.target.value)}
                  className="mt-2 w-full rounded-3xl border border-sand bg-blush/60 px-4 py-3 text-gray-800 outline-none focus:border-sage focus:ring-2 focus:ring-sage/20"
                >
                  {availableDates.map(date => (
                    <option key={date.value} value={date.value}>
                      {date.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block text-sm font-medium text-gray-700">
                Time slot
                <select
                  value={selectedTime}
                  onChange={event => setSelectedTime(event.target.value)}
                  className="mt-2 w-full rounded-3xl border border-sand bg-blush/60 px-4 py-3 text-gray-800 outline-none focus:border-sage focus:ring-2 focus:ring-sage/20"
                >
                  {timeSlots.map(slot => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          <div className="rounded-[1.5rem] bg-blush/40 p-4 text-sm text-gray-700">
            <p className="font-semibold text-charcoal">Quick summary</p>
            <p className="mt-2">Selected services: {selectedServices.length || 0}</p>
            <p>Estimated duration: {totalDuration} min</p>
            <p>Total investment: ${totalPrice}</p>
          </div>
        </div>

        <ConsentForm consent={consent} onChange={handleConsentChange} />
      </section>

      {error ? (
        <div className="rounded-3xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>
      ) : null}

      <button
        type="button"
        onClick={handleSubmit}
        className="w-full rounded-3xl bg-sage px-6 py-4 text-lg font-semibold text-white shadow-soft transition hover:bg-sage/90 sm:max-w-sm"
      >
        Confirm appointment
      </button>
    </div>
  );
}
