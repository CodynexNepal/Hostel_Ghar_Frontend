import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import type { Faq } from '@/data/faqs';

interface FaqAccordionProps {
  faqs: Faq[];
  /** Show category pills above the list */
  showFilter?: boolean;
}

/**
 * Accessible FAQ accordion (AEO pattern).
 * - <h3> question headings crawled as Q&A
 * - First paragraph is the quotable direct answer (40-60 words)
 * - Links to related pages build topical authority
 */
export default function FaqAccordion({ faqs, showFilter = false }: FaqAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);
  const [filter, setFilter] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(faqs.map((f) => f.category)))];
  const visible = filter === 'All' ? faqs : faqs.filter((f) => f.category === filter);

  return (
    <div>
      {showFilter && (
        <div className="flex flex-wrap gap-2 mb-8" role="tablist" aria-label="Filter FAQs by topic">
          {categories.map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={filter === c}
              onClick={() => setFilter(c)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                filter === c
                  ? 'bg-brand-black text-white'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-brand-lime/30 hover:text-brand-black'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      )}
      <div className="space-y-4">
        {visible.map((faq) => {
          const open = openId === faq.id;
          return (
            <article
              key={faq.id}
              id={`faq-${faq.id}`}
              className={`bg-white rounded-2xl border overflow-hidden transition-all scroll-mt-28 ${
                open ? 'border-brand-lime shadow-soft' : 'border-neutral-100'
              }`}
            >
              <h3 className="m-0">
                <button
                  onClick={() => setOpenId(open ? null : faq.id)}
                  aria-expanded={open}
                  aria-controls={`faq-panel-${faq.id}`}
                  className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left"
                >
                  <span className="font-bold text-brand-black text-base sm:text-lg">
                    {faq.question}
                  </span>
                  <span
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                      open ? 'bg-brand-lime text-brand-black' : 'bg-neutral-100 text-neutral-500'
                    }`}
                  >
                    <ChevronDown
                      size={18}
                      strokeWidth={2.5}
                      className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
                    />
                  </span>
                </button>
              </h3>
              <div
                id={`faq-panel-${faq.id}`}
                className={`overflow-hidden transition-all duration-300 ${
                  open ? 'max-h-[500px]' : 'max-h-0'
                }`}
              >
                <div className="px-5 sm:px-6 pb-6">
                  <p className="text-neutral-700 leading-relaxed font-medium">{faq.answer}</p>
                  {faq.details && (
                    <p className="text-neutral-500 leading-relaxed mt-3 text-[15px]">
                      {faq.details}
                    </p>
                  )}
                  <p className="text-xs text-neutral-400 mt-4">
                    Last updated: {faq.lastUpdated} ·{' '}
                    <Link href={`/faq#faq-${faq.id}`} className="underline hover:text-brand-black">
                      Direct link
                    </Link>
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
