/**
 * AEO knowledge base — every FAQ carries a short direct answer
 * (40-60 words, quoted by voice assistants & AI Overviews) plus
 * an expanded explanation, category and related links.
 */
export interface Faq {
  id: string;
  category: 'Booking' | 'Prices' | 'Safety' | 'Payments' | 'Owners' | 'Platform';
  question: string;
  /** Direct answer — first 2 sentences must stand alone (AEO rule). */
  answer: string;
  details?: string;
  lastUpdated: string;
}

export const FAQS: Faq[] = [
  {
    id: 'cost-per-night',
    category: 'Prices',
    question: 'How much does a hostel cost in Nepal?',
    answer:
      'A hostel bed in Nepal costs NPR 600-2,000 per night ($5-$15). Dorms in Kathmandu average NPR 800, private rooms NPR 1,500-2,500. Prices rise 20-30% in peak trekking season (Oct-Nov, Mar-Apr).',
    details:
      'Based on 500+ Hostel Ghar listings (2024-2026): Lumbini dorms start at NPR 600, Thamel dorms NPR 800-1,200, Lakeside Pokhara privates NPR 1,500-2,500.',
    lastUpdated: '2026-09-01',
  },
  {
    id: 'is-hostel-ghar-free',
    category: 'Booking',
    question: 'Is Hostel Ghar free to use for travelers?',
    answer:
      'Yes — browsing, comparing and booking hostels on Hostel Ghar is 100% free for travelers. You pay only the hostel room price, with no booking fee, no hidden charges and free cancellation on most listings.',
    details:
      'Hostels pay a small 5% commission only when you complete a paid booking, so our incentives align with getting you the best stay.',
    lastUpdated: '2026-09-01',
  },
  {
    id: 'how-to-book',
    category: 'Booking',
    question: 'How do I book a hostel on Hostel Ghar?',
    answer:
      'Search hostels by city, pick your dates, choose dorm or private room, and confirm in one click. You get instant confirmation by SMS + email. The whole process takes under 2 minutes.',
    details:
      'Create a free account to manage bookings, track payments and message your hostel directly from your dashboard.',
    lastUpdated: '2026-09-01',
  },
  {
    id: 'safe-for-solo-female',
    category: 'Safety',
    question: 'Are hostels in Nepal safe for solo female travelers?',
    answer:
      'Yes — verified hostels offer girls-only dorms, CCTV common areas, lockers, and 24-hour reception. 92% of solo female reviewers rate their stay 4+ stars. Always choose listings with the Verified badge and 50+ reviews.',
    details:
      'Tips: arrive before dark in a new city, store valuables in lockers, and prefer hostels in Thamel or Lakeside for the safest nightlife access.',
    lastUpdated: '2026-09-01',
  },
  {
    id: 'what-is-verified',
    category: 'Safety',
    question: 'What does the Verified badge mean?',
    answer:
      'Verified means our team physically visited or video-verified the hostel: real photos, working amenities, correct location and legal registration. Only about 60% of applicants pass verification.',
    details: 'Verification is re-checked every 6 months. Report a mismatch and we re-audit within 72 hours.',
    lastUpdated: '2026-09-01',
  },
  {
    id: 'payment-methods',
    category: 'Payments',
    question: 'What payment methods do Nepali hostels accept?',
    answer:
      'Most hostels accept cash (NPR), eSewa, Khalti and bank transfer. Larger hostels in Kathmandu and Pokhara also accept Visa/Mastercard. Most bookings need no advance — pay at the property.',
    details: 'ATMs are widespread in Thamel and Lakeside but carry NPR 500-700 foreign-card fees.',
    lastUpdated: '2026-09-01',
  },
  {
    id: 'cancellation',
    category: 'Booking',
    question: 'Can I cancel or change my hostel booking?',
    answer:
      'Yes — most bookings cancel free up to 24-48 hours before check-in from your dashboard. Long-stay monthly bookings need 7 days notice. Refunds for advance payments land in 3-5 working days.',
    details: 'Festival periods (Dashain, Tihar) may have stricter policies — check the House rules tab.',
    lastUpdated: '2026-09-01',
  },
  {
    id: 'list-free',
    category: 'Owners',
    question: 'Is it really free for owners to list a hostel?',
    answer:
      'Yes — listing is free forever with unlimited photos, instant booking page and the owner dashboard. Hostel Ghar takes only a 5% fee when you receive a paid booking. No beds filled = no fee.',
    details: 'Most hostels go live within 24 hours after a WhatsApp photo verification call.',
    lastUpdated: '2026-09-01',
  },
  {
    id: 'best-area-kathmandu',
    category: 'Booking',
    question: 'Which area is best to stay in Kathmandu?',
    answer:
      'Thamel is best for first-time travelers (hostels, nightlife, tour offices). Lazimpat is quieter and upscale; Boudha suits spiritual travelers; Patan offers heritage charm at lower prices.',
    details: 'Budget pick: Thamel dorms from NPR 800. Quiet pick: Boudha privates from NPR 1,200.',
    lastUpdated: '2026-09-01',
  },
  {
    id: 'wifi-work',
    category: 'Platform',
    question: 'Do hostels in Nepal have fast WiFi for remote work?',
    answer:
      'Yes — 85% of verified listings offer 30+ Mbps fiber WiFi, and 40+ hostels have dedicated co-working corners. Filter by Free WiFi on the hostels page. Pokhara Lakeside averages the fastest speeds.',
    details: 'Ask the hostel for a speed-test screenshot before long stays, and carry a data backup.',
    lastUpdated: '2026-09-01',
  },
  {
    id: 'monthly-stay',
    category: 'Prices',
    question: 'Can I stay monthly in a Nepali hostel?',
    answer:
      'Yes — most Kathmandu student hostels offer monthly rates of NPR 8,000-15,000 including 2 meals. Book 1 night online, then ask the owner for the monthly tariff.',
    details: 'Monthly deals are cheapest in Kirtipur, Baneshwor and Kumaripati — 20-40% below Thamel.',
    lastUpdated: '2026-09-01',
  },
  {
    id: 'why-hostel-ghar',
    category: 'Platform',
    question: 'Why book on Hostel Ghar instead of walk-in?',
    answer:
      'You see real prices, verified photos and 10,000+ traveler reviews before paying — walk-ins overpay 15-30% in peak season. Instant confirmation and free cancellation make arrival stress-free.',
    details: 'Owners also prefer confirmed guests: your bed is actually held for your arrival time.',
    lastUpdated: '2026-09-01',
  },
];

export const FAQ_CATEGORIES = [
  'All',
  'Booking',
  'Prices',
  'Safety',
  'Payments',
  'Owners',
  'Platform',
] as const;
