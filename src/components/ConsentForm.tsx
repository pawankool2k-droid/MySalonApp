import { ConsentDetails } from '../types';

interface ConsentFormProps {
  consent: ConsentDetails;
  onChange: (field: keyof ConsentDetails, value: string | string[]) => void;
}

const allergyOptions = ['Nut allergy', 'Sensitive skin', 'Latex sensitivity', 'Fragrance sensitivity'];
const conditionOptions = ['Acne', 'Eczema', 'Psoriasis', 'Rosacea'];

export default function ConsentForm({ consent, onChange }: ConsentFormProps) {
  const toggleField = (field: 'allergies' | 'skinConditions', value: string) => {
    const list = consent[field];
    const next = list.includes(value) ? list.filter(item => item !== value) : [...list, value];
    onChange(field, next);
  };

  return (
    <div className="rounded-[2rem] border border-sand bg-white/90 p-6 shadow-soft">
      <h2 className="text-xl font-semibold text-charcoal">Consent & skin details</h2>
      <p className="mt-2 text-sm text-gray-600">
        Please share any known sensitivities and add your digital signature below.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-3xl border border-sand bg-blush/70 p-4">
          <p className="font-semibold text-charcoal">Allergies</p>
          <div className="mt-3 space-y-3">
            {allergyOptions.map(option => (
              <label key={option} className="flex items-center gap-3 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={consent.allergies.includes(option)}
                  onChange={() => toggleField('allergies', option)}
                  className="h-4 w-4 rounded border-gray-300 text-sage focus:ring-sage"
                />
                {option}
              </label>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-sand bg-blush/70 p-4">
          <p className="font-semibold text-charcoal">Skin conditions</p>
          <div className="mt-3 space-y-3">
            {conditionOptions.map(option => (
              <label key={option} className="flex items-center gap-3 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={consent.skinConditions.includes(option)}
                  onChange={() => toggleField('skinConditions', option)}
                  className="h-4 w-4 rounded border-gray-300 text-sage focus:ring-sage"
                />
                {option}
              </label>
            ))}
          </div>
        </div>
      </div>

      <label className="mt-6 block text-sm font-semibold text-charcoal">
        Digital signature
        <input
          type="text"
          value={consent.signature}
          onChange={event => onChange('signature', event.target.value)}
          placeholder="Type your full name"
          className="mt-3 w-full rounded-3xl border border-sand bg-blush/60 px-4 py-3 text-gray-800 outline-none focus:border-sage focus:ring-2 focus:ring-sage/20"
        />
      </label>

      <label className="mt-6 block text-sm font-semibold text-charcoal">
        Notes for your stylist
        <textarea
          value={consent.notes}
          onChange={event => onChange('notes', event.target.value)}
          placeholder="Tell us about your preferences or previous experiences"
          className="mt-3 min-h-[120px] w-full rounded-3xl border border-sand bg-blush/60 px-4 py-3 text-gray-800 outline-none focus:border-sage focus:ring-2 focus:ring-sage/20"
        />
      </label>
    </div>
  );
}
