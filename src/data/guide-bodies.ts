export interface GuideSection {
  h: string;
  p: string;
  answer?: string;
}
export interface GuideBody {
  intro: string;
  sections: GuideSection[];
}

export const GUIDE_BODIES: Record<string, GuideBody> = {
  'hostel-prices-nepal-2026': {
    intro:
      'We analysed 500+ verified Hostel Ghar listings across 12 districts (Jan 2024 - Aug 2026) to answer one question: what does a hostel actually cost in Nepal right now?',
    sections: [
      {
        h: 'What is the average hostel price in Nepal?',
        answer:
          'The average dorm bed costs NPR 950/night and the average private room NPR 1,900/night. Lumbini (NPR 600+) is cheapest; Lakeside Pokhara privates (NPR 2,500) are priciest.',
        p: 'Median dorm: NPR 900. Median private: NPR 1,800. Student monthly hostels cluster at NPR 8,000-15,000/month in Kathmandu. Prices below are medians of verified listings only.',
      },
      {
        h: 'How do prices change by season?',
        answer:
          'Peak trekking months (Oct-Nov, Mar-Apr) cost 20-30% more than monsoon (Jun-Aug). Book 2-3 weeks ahead for Dashain/Tihar.',
        p: 'Thamel dorms jump from NPR 850 (July) to NPR 1,100 (October). Lakeside Pokhara sees the sharpest swing: +32% in October vs June.',
      },
      {
        h: 'Which city is cheapest for hostels?',
        answer:
          'Lumbini (from NPR 600), followed by Butwal and Dharan. Kathmandu and Pokhara cost 30-50% more but offer far more choice and faster WiFi.',
        p: 'Dorm medians: Lumbini NPR 650, Butwal NPR 750, Chitwan NPR 850, Kathmandu NPR 900, Bhaktapur NPR 950, Pokhara NPR 1,050.',
      },
      {
        h: 'How can I pay less without risking quality?',
        p: 'Book monthly tariffs for stays over 3 weeks (saves 20-40%), travel in monsoon shoulder weeks, and filter for Verified + 50+ reviews rather than chasing the absolute cheapest bed.',
      },
    ],
  },
  'solo-female-travel-nepal-safety': {
    intro:
      'Nepal is one of the safest countries for solo female travelers — but safe depends on where you sleep. Here is how to choose a hostel you can relax in.',
    sections: [
      {
        h: 'Are hostels in Nepal safe for solo female travelers?',
        answer:
          'Yes — choose Verified listings with girls-only dorms, lockers, CCTV and 24-hr reception. 92% of solo female reviewers rate verified stays 4+ stars.',
        p: 'Avoid ground-floor rooms facing the street, arrive before dark in new cities, and keep valuables in lockers. Thamel and Lakeside have the densest safe options.',
      },
      {
        h: 'What should I check before booking?',
        p: 'Filter for: (1) Verified badge, (2) 50+ reviews mentioning safe or solo, (3) girls-only dorm option, (4) real bathroom photos. Message the hostel to confirm female-dorm availability.',
      },
      {
        h: 'What are the emergency contacts?',
        p: 'Tourist Police: 1149 (24-hr, English-speaking). Police: 100. Womens helpline: 1145. Save your hostel phone + address offline before heading out.',
      },
    ],
  },
  'kathmandu-vs-pokhara-hostels': {
    intro:
      'Kathmandu wins on choice and price; Pokhara wins on views, air and WiFi. Here is the data behind the rivalry, from 300+ listings in both cities.',
    sections: [
      {
        h: 'Which is cheaper — Kathmandu or Pokhara?',
        answer:
          'Kathmandu is 10-15% cheaper for dorms (median NPR 900 vs 1,050) and far cheaper monthly. Pokhara privates with lake views command the premium.',
        p: 'But Pokhara includes more: breakfast is bundled in 70% of Lakeside listings vs 45% in Thamel, and average WiFi tests 20 Mbps faster.',
      },
      {
        h: 'Which is better for digital nomads?',
        answer:
          'Pokhara — 50-100 Mbps fiber is common in Lakeside, with 25+ work-friendly hostels. Kathmandu wins only if you need daily in-person meetings.',
        p: 'Nomad pick: Lakeside private with dedicated desk (NPR 1,800-2,500). Backup: Ncell 4G for load-shedding days.',
      },
      {
        h: 'Where should first-timers stay?',
        p: 'Start 3-4 nights in Thamel (tours, visas, gear shops), then decompress 4-5 nights in Lakeside. Book both with free cancellation so trekking delays do not cost you.',
      },
    ],
  },
};
