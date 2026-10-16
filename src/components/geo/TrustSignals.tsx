import { ShieldCheck, Star, Users, Building2 } from 'lucide-react';

/** GEO Trust-signals strip: verification, volume, rating, support. */
export default function TrustSignals() {
  const signals = [
    { icon: <ShieldCheck size={22} strokeWidth={2} />, stat: '500+', label: 'Physically verified hostels' },
    { icon: <Users size={22} strokeWidth={2} />, stat: '10K+', label: 'Verified traveler reviews' },
    { icon: <Star size={22} strokeWidth={2} />, stat: '4.8/5', label: 'Average platform rating' },
    { icon: <Building2 size={22} strokeWidth={2} />, stat: '50+', label: 'Cities across Nepal' },
  ];
  return (
    <section aria-label="Why trust Hostel Ghar" className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-8">
      {signals.map((s) => (
        <div key={s.label} className="bg-white border border-neutral-100 rounded-2xl p-5 text-center hover:border-brand-lime/60 transition-colors">
          <div className="w-11 h-11 mx-auto rounded-xl bg-brand-lime/20 flex items-center justify-center text-brand-black mb-3" aria-hidden>{s.icon}</div>
          <p className="text-2xl font-extrabold text-brand-black m-0">{s.stat}</p>
          <p className="text-sm text-neutral-500 font-medium m-0">{s.label}</p>
        </div>
      ))}
    </section>
  );
}
