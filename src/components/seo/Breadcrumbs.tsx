import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import JsonLd from '@/components/seo/JsonLd';
import { breadcrumbJsonLd } from '@/lib/seo/jsonLd';

export interface Crumb {
  label: string;
  path: string;
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(items.map(({ label, path }) => ({ name: label, path })))}
        id="ld-breadcrumb"
      />
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm">
          {items.map((item, i) => {
            const last = i === items.length - 1;
            return (
              <li key={item.path} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight size={14} className="text-neutral-300" aria-hidden />}
                {last ? (
                  <span aria-current="page" className="font-semibold text-brand-black">
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.path}
                    className="text-neutral-500 hover:text-brand-black transition-colors inline-flex items-center gap-1"
                  >
                    {i === 0 && <Home size={14} aria-hidden />}
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
