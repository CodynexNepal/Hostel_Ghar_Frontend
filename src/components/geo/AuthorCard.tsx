import Image from 'next/image';
import { BadgeCheck, MapPin } from 'lucide-react';

/**
 * GEO Author card — E-E-A-T signal. Every guide/research page must
 * show a named author with role, location + review credit.
 */
export interface Author {
  name: string;
  role: string;
  bio: string;
  location?: string;
  avatar?: string;
  reviewer?: string;
}

export default function AuthorCard({ author }: { author: Author }) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 bg-white border border-neutral-100 rounded-2xl p-5 sm:p-6 my-8">
      <div className="flex-shrink-0">
        <div className="w-16 h-16 rounded-full bg-brand-lime/30 flex items-center justify-center text-2xl font-extrabold text-brand-black" aria-hidden>
          {author.avatar ? (
            <Image src={author.avatar} alt={`${author.name}, ${author.role}`} width={64} height={64} className="rounded-full object-cover" />
          ) : (
            author.name.charAt(0)
          )}
        </div>
      </div>
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1">Written by</p>
        <p className="font-bold text-brand-black text-lg flex items-center gap-1.5 m-0">
          {author.name} <BadgeCheck size={18} className="text-green-600" aria-label="Verified author" />
        </p>
        <p className="text-sm font-semibold text-neutral-500 m-0">{author.role}</p>
        {author.location && (
          <p className="text-sm text-neutral-400 flex items-center gap-1 mt-1 m-0"><MapPin size={14} aria-hidden /> {author.location}</p>
        )}
        <p className="text-[15px] text-neutral-600 leading-relaxed mt-2 mb-0">{author.bio}</p>
        {author.reviewer && <p className="text-xs text-neutral-400 mt-2 mb-0">Fact-checked by {author.reviewer} · Updated Sept 2026</p>}
      </div>
    </div>
  );
}
