import type { GetStaticProps } from 'next';
import Link from 'next/link';
import Header from '@/components/navigation/Header';
import Footer from '@/components/navigation/Footer';
import Seo from '@/components/seo/Seo';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import { GUIDES } from '@/data/guides';
import { getPageMeta } from '@/lib/seo/metadata';
import { ArrowRight, BookOpen, Clock3 } from 'lucide-react';

export default function GuidesPage() {
  const meta = getPageMeta('/guides');
  return (
    <>
      <Seo title={meta.title} description={meta.description} path="/guides" keywords={meta.keywords} />
      <main className="min-h-screen bg-white">
        <Header />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20">
          <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Guides', path: '/guides' }]} />
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-lime/20 text-brand-black text-sm font-semibold">
              <BookOpen size={16} aria-hidden /> Original research + field guides
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-brand-black tracking-tight mt-4 mb-4">
              Nepal Hostel Guides, Backed by Real Data
            </h1>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Not rewritten listicles — every guide cites our dataset of 500+ verified listings,
              named authors, and field visits across 12 districts.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {GUIDES.map((g) => (
              <Link key={g.slug} href={`/guides/${g.slug}`} className="group bg-white border border-neutral-100 rounded-2xl p-6 hover:border-brand-lime hover:shadow-soft transition-all">
                <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2">{g.category}</p>
                <h2 className="text-xl font-extrabold text-brand-black leading-snug mb-2 group-hover:underline underline-offset-4 decoration-brand-lime decoration-2">{g.title}</h2>
                <p className="text-[15px] text-neutral-600 leading-relaxed mb-4">{g.description}</p>
                <p className="text-sm text-neutral-400 flex items-center gap-3 mb-4">
                  <span>By {g.author.name}</span>
                  <span className="inline-flex items-center gap-1"><Clock3 size={14} aria-hidden /> {g.readMinutes} min</span>
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-bold text-brand-black">Read guide <ArrowRight size={15} aria-hidden className="group-hover:translate-x-0.5 transition-transform" /></span>
              </Link>
            ))}
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => ({ props: {} });
