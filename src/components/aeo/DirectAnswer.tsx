import Link from 'next/link';
import { Sparkles } from 'lucide-react';

interface DirectAnswerProps {
  question: string;
  answer: string;
  ctaHref?: string;
  ctaLabel?: string;
}

/**
 * AEO "Direct Answer" callout — the 40-60 word quotable summary
 * AI Overviews / voice assistants lift. Place directly under each H2.
 */
export default function DirectAnswer({ question, answer, ctaHref, ctaLabel }: DirectAnswerProps) {
  return (
    <aside aria-label={`Quick answer: ${question}`} className="bg-brand-lime/10 border-l-4 border-brand-lime rounded-r-2xl p-5 sm:p-6 my-6">
      <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-black/60 mb-2">
        <Sparkles size={14} aria-hidden /> Quick answer
      </p>
      <p className="text-brand-black font-medium leading-relaxed text-[17px] m-0">{answer}</p>
      {ctaHref && (
        <Link href={ctaHref} className="inline-flex items-center gap-1 text-sm font-bold text-brand-black underline underline-offset-4 decoration-brand-lime decoration-2 hover:gap-2 transition-all mt-3">
          {ctaLabel || 'Learn more'} →
        </Link>
      )}
    </aside>
  );
}
