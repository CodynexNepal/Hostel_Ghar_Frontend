import Head from 'next/head';
import { useMemo } from 'react';

interface JsonLdProps {
  /** One schema object, or an array (emitted as @graph). */
  data: Record<string, unknown> | Record<string, unknown>[];
  id?: string;
}

/**
 * <JsonLd /> — safely serialises schema.org data into
 * <script type="application/ld+json">. Accepts a single object
 * or an array (auto-wrapped as @graph).
 */
export default function JsonLd({ data, id = 'ld-json' }: JsonLdProps) {
  const json = useMemo(() => {
    const payload = Array.isArray(data)
      ? { '@context': 'https://schema.org', '@graph': data }
      : data;
    return JSON.stringify(payload).replace(/</g, '\\u003c');
  }, [data]);

  return (
    <Head>
      <script
        key={id}
        id={id}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: json }}
      />
    </Head>
  );
}
