import { Service } from '../types';

interface ServiceCardProps {
  service: Service;
  selected: boolean;
  onToggle: () => void;
}

export default function ServiceCard({ service, selected, onToggle }: ServiceCardProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`w-full rounded-3xl border p-4 text-left transition duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-sage ${
        selected
          ? 'border-sage bg-white shadow-soft'
          : 'border-sand bg-blush/70'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-charcoal">{service.title}</h3>
          <p className="mt-2 text-sm text-gray-600">{service.description}</p>
        </div>
        <div className="text-right">
          <p className="text-base font-semibold text-charcoal">{service.price}</p>
          <p className="text-sm text-gray-500">{service.duration}</p>
        </div>
      </div>
      <div className="mt-4 text-sm text-gray-700">{selected ? 'Selected' : 'Tap to select'}</div>
    </button>
  );
}
