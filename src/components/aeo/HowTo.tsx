import JsonLd from '@/components/seo/JsonLd';
import { howToJsonLd } from '@/lib/seo/jsonLd';
import { CheckCircle } from 'lucide-react';

export interface Step {
  title: string;
  text: string;
}

interface HowToProps {
  path: string;
  name: string;
  description: string;
  steps: Step[];
  totalTime?: string;
}

/** AEO How-To block: numbered <ol> + HowTo JSON-LD (eligible for rich results). */
export default function HowTo({ path, name, description, steps, totalTime }: HowToProps) {
  return (
    <>
      <JsonLd
        data={howToJsonLd({
          path,
          name,
          description,
          steps: steps.map((s) => ({ name: s.title, text: s.text })),
          totalTime,
        })}
        id="ld-howto"
      />
      <ol className="space-y-5 list-none p-0 m-0">
        {steps.map((s, i) => (
          <li
            key={i}
            className="flex gap-4 bg-white border border-neutral-100 rounded-2xl p-5 hover:border-brand-lime/50 transition-colors"
          >
            <span
              className="flex-shrink-0 w-10 h-10 rounded-xl bg-brand-black text-brand-lime font-extrabold flex items-center justify-center"
              aria-hidden
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <div>
              <h3 className="font-bold text-brand-black text-lg mb-1 mt-0">{s.title}</h3>
              <p className="text-neutral-600 leading-relaxed m-0">{s.text}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="flex items-center gap-2 text-sm text-neutral-500 mt-4">
        <CheckCircle size={16} className="text-green-600" /> Estimated time:{' '}
        {totalTime || 'under 10 minutes'}
      </p>
    </>
  );
}
