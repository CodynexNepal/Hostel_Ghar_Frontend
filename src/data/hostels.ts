/**
 * Shared hostel catalogue used by:
 * - /hostels listing page
 * - /hostel/[slug] detail pages (SSG)
 * - sitemap.xml + hostel JSON-LD + GEO product schema
 *
 * In production, replace the static array with a fetch() to your API
 * inside getStaticProps / getStaticPaths — the shape stays the same.
 */
export interface Hostel {
  slug: string;
  name: string;
  city: string;
  area: string;
  priceFrom: number;
  originalPrice?: number | null;
  rating: number;
  reviews: number;
  roomType: string;
  amenities: string[];
  image: string;
  description: string;
  latitude?: number;
  longitude?: number;
}

export const HOSTELS: Hostel[] = [
  {
    slug: 'himalayan-backpackers-thamel',
    name: 'Himalayan Backpackers',
    city: 'Kathmandu',
    area: 'Thamel, Kathmandu',
    priceFrom: 800,
    originalPrice: 1200,
    rating: 4.8,
    reviews: 256,
    roomType: 'Dormitory',
    amenities: ['Free WiFi', 'Breakfast', 'Kitchen', 'TV Room'],
    image: '/images/static/hostel.jpg',
    description:
      'Himalayan Backpackers is a verified dormitory hostel in Thamel, Kathmandu — 5 min walk from Garden of Dreams. Free WiFi, hot showers, shared kitchen and a rooftop with Himalayan views. Dorms from NPR 800/night.',
    latitude: 27.7172,
    longitude: 85.324,
  },
  {
    slug: 'pokhara-lake-view-hostel',
    name: 'Pokhara Lake View Hostel',
    city: 'Pokhara',
    area: 'Lakeside, Pokhara',
    priceFrom: 1500,
    rating: 4.9,
    reviews: 189,
    roomType: 'Private Room',
    amenities: ['Free WiFi', 'Breakfast', 'AC', 'Parking'],
    image: '/images/static/hostel.jpeg',
    description:
      'Pokhara Lake View Hostel sits 2 min from Phewa Lake with sunrise views of Annapurna. Private rooms from NPR 1,500/night with breakfast, AC and free parking. Rated 4.9/5 from 189 verified stays.',
    latitude: 28.2096,
    longitude: 83.9856,
  },
  {
    slug: 'chitwan-jungle-lodge',
    name: 'Chitwan Jungle Lodge',
    city: 'Chitwan',
    area: 'Sauraha, Chitwan',
    priceFrom: 2000,
    originalPrice: 2500,
    rating: 4.7,
    reviews: 142,
    roomType: 'Double Room',
    amenities: ['Free WiFi', 'Breakfast', 'Kitchen', 'Parking', 'Pet Friendly'],
    image: '/images/static/hostel.jpg',
    description:
      'Chitwan Jungle Lodge in Sauraha is 10 min from Chitwan National Park gate. Double rooms from NPR 2,000/night with jungle safari packages, Tharu cultural evenings and pet-friendly cottages.',
  },
  {
    slug: 'lumbini-peace-hostel',
    name: 'Lumbini Peace Hostel',
    city: 'Lumbini',
    area: 'Lumbini',
    priceFrom: 600,
    rating: 4.5,
    reviews: 98,
    roomType: 'Dormitory',
    amenities: ['Free WiFi', 'Breakfast', 'Kitchen'],
    image: '/images/static/hostel.jpeg',
    description:
      'Lumbini Peace Hostel is a quiet, meditation-friendly dorm 5 min from Maya Devi Temple. Beds from NPR 600/night — the lowest verified price near Lumbini. Free WiFi, vegetarian kitchen, bicycle rental.',
  },
  {
    slug: 'nagarkot-sunrise-inn',
    name: 'Nagarkot Sunrise Inn',
    city: 'Nagarkot',
    area: 'Nagarkot',
    priceFrom: 1800,
    originalPrice: 2200,
    rating: 4.6,
    reviews: 167,
    roomType: 'Twin Room',
    amenities: ['Free WiFi', 'Breakfast', 'Parking', 'TV Room'],
    image: '/images/static/hostel.jpg',
    description:
      'Nagarkot Sunrise Inn faces the Everest range — wake up to sunrise over 8 Himalayan peaks. Twin rooms from NPR 1,800/night with breakfast and bonfire evenings. 32 km from Kathmandu.',
  },
  {
    slug: 'bhaktapur-heritage-stay',
    name: 'Bhaktapur Heritage Stay',
    city: 'Bhaktapur',
    area: 'Bhaktapur Durbar Square',
    priceFrom: 1200,
    rating: 4.7,
    reviews: 134,
    roomType: 'Private Room',
    amenities: ['Free WiFi', 'Breakfast', 'Kitchen', 'AC'],
    image: '/images/static/hostel.jpeg',
    description:
      'Bhaktapur Heritage Stay is a restored Newari house 3 min from Durbar Square. Private rooms from NPR 1,200/night with wood-carved windows, pottery classes and traditional breakfast.',
  },
];

export function getHostelBySlug(slug: string): Hostel | undefined {
  return HOSTELS.find((h) => h.slug === slug);
}

export function hostelSlugs(): string[] {
  return HOSTELS.map((h) => h.slug);
}
