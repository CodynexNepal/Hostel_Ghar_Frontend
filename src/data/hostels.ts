/**
 * Shared hostel catalogue used by:
 * - /hostels listing page
 * - /hostel/[slug] detail pages (SSG)
 * - sitemap.xml + hostel JSON-LD + GEO product schema
 *
 * Populated with actual production data from backend /api/v1/hostel-ghar/hostels.
 */

export interface HostelOwnerInfo {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  avatarUrl?: string;
}

export interface Hostel {
  id: string;
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
  phone?: string | null;
  email?: string | null;
  isActive?: boolean;
  createdAt?: string;
  owner?: HostelOwnerInfo | null;
  aliasSlugs?: string[];
}

export const HOSTELS: Hostel[] = [
  {
    id: 'bdde17d2-d56e-4f81-987c-d0132cf4409d',
    slug: 'bdde17d2-d56e-4f81-987c-d0132cf4409d',
    name: 'Bishan Hostel',
    city: 'Kathmandu',
    area: 'Banasthali-16, Kathmandu',
    priceFrom: 1200,
    originalPrice: 1500,
    rating: 4.9,
    reviews: 28,
    roomType: 'Boys Hostel',
    amenities: ['Free WiFi', 'Breakfast', 'Hot Water', 'Study Room', 'CCTV Security'],
    image:
      'https://res.cloudinary.com/dwltskle/image/upload/v1792164198/hostelghar/logos/hostel_bdde17d2-d56e-4f81-987c-d0132cf4409d_logo_1792164227086.webp',
    description:
      'Bishan Hostel is a premier verified boys hostel in Banasthali-16, Kathmandu. Managed by Bishan Pokhrel, offering comfortable furnished rooms, high-speed WiFi, hygienic food, 24/7 security, and a peaceful study environment for students and young professionals.',
    latitude: 27.7285,
    longitude: 85.2974,
    phone: '9749329806',
    email: 'mrjungler07@gmail.com',
    isActive: true,
    createdAt: '2026-10-16T15:23:08.188Z',
    owner: {
      id: '17c12dda-f24f-4f3a-b682-c551c6c8e122',
      firstName: 'Bishan',
      lastName: 'Pokhrel',
      email: 'mrjungler07@gmail.com',
      phone: '+9779749329806',
      avatarUrl:
        'https://res.cloudinary.com/dwltskle/image/upload/v1792164148/hostelghar/owners/avatars/owner_17c12dda-f24f-4f3a-b682-c551c6c8e122_avatar_1792164180932.webp',
    },
    aliasSlugs: ['bishan-hostel', 'himalayan-backpackers-thamel'],
  },
  {
    id: 'a38bf07a-b7b1-49dc-85c8-dd5542a8e90a',
    slug: 'a38bf07a-b7b1-49dc-85c8-dd5542a8e90a',
    name: 'Infinity Boys Hostel',
    city: 'Kathmandu',
    area: 'Banasthali-16, Kathmandu',
    priceFrom: 1400,
    originalPrice: 1800,
    rating: 4.9,
    reviews: 34,
    roomType: 'Boys Hostel',
    amenities: ['Free WiFi', 'Breakfast', 'AC', 'Study Room', 'Hot Water', 'Power Backup'],
    image:
      'https://res.cloudinary.com/dwltskle/image/upload/v1789385868/hostelghar/logos/hostel_a38bf07a-b7b1-49dc-85c8-dd5542a8e90a_logo_1789385888858.webp',
    description:
      'Infinity Boys Hostel is a modern verified boys accommodation in Banasthali-16, Kathmandu, managed by Dinesh Tamang. Features high-speed fiber internet, four daily nutritious meals, dedicated study desks, modern washrooms, and round-the-clock security.',
    latitude: 27.7288,
    longitude: 85.2982,
    phone: '9817161246',
    email: 'dinesh.tamang1519@gmail.com',
    isActive: true,
    createdAt: '2026-09-14T11:37:45.400Z',
    owner: {
      id: 'a19f8b9d-0792-438e-a044-6dbc26dcecaf',
      firstName: 'Dinesh',
      lastName: 'Tamang',
      email: 'dinesh.tamang1519@gmail.com',
      phone: '9876757875',
      avatarUrl:
        'https://res.cloudinary.com/dwltskle/image/upload/v1789385363/hostelghar/owners/avatars/owner_a19f8b9d-0792-438e-a044-6dbc26dcecaf_avatar_1789385383791.webp',
    },
    aliasSlugs: ['infinity-boys-hostel', 'pokhara-lake-view-hostel'],
  },
  {
    id: '1c6e51f7-d5f2-4fb4-b48b-528d8c8fb8d2',
    slug: '1c6e51f7-d5f2-4fb4-b48b-528d8c8fb8d2',
    name: 'Bishan Hostel (Block B)',
    city: 'Kathmandu',
    area: 'Banasthali-16, Kathmandu',
    priceFrom: 1100,
    originalPrice: 1400,
    rating: 4.7,
    reviews: 19,
    roomType: 'Boys Hostel',
    amenities: ['Free WiFi', 'Breakfast', 'Power Backup', 'Laundry', 'TV Room'],
    image:
      'https://res.cloudinary.com/dwltskle/image/upload/v1792161075/hostelghar/logos/hostel_1c6e51f7-d5f2-4fb4-b48b-528d8c8fb8d2_logo_1792161108999.webp',
    description:
      'Bishan Hostel (Block B) in Banasthali-16, Kathmandu provides clean and affordable boy accommodations with 24/7 water supply, high-speed WiFi, laundry facilities, and hygienic food options.',
    latitude: 27.7282,
    longitude: 85.297,
    phone: '9749329806',
    email: 'mrjungler07@gmail.com',
    isActive: true,
    createdAt: '2026-10-16T14:31:10.144Z',
    owner: null,
    aliasSlugs: ['bishan-hostel-b', 'chitwan-jungle-lodge'],
  },
  {
    id: '098247fc-8288-445f-aa43-1ea7e9084d32',
    slug: '098247fc-8288-445f-aa43-1ea7e9084d32',
    name: 'Bishan Hostel (Annex)',
    city: 'Kathmandu',
    area: 'Banasthali-16, Kathmandu',
    priceFrom: 1000,
    originalPrice: 1300,
    rating: 4.6,
    reviews: 15,
    roomType: 'Boys Hostel',
    amenities: ['Free WiFi', 'Breakfast', 'CCTV Security', 'Kitchen'],
    image:
      'https://res.cloudinary.com/dwltskle/image/upload/v1792160866/hostelghar/logos/hostel_098247fc-8288-445f-aa43-1ea7e9084d32_logo_1792160899678.webp',
    description:
      'Bishan Hostel Annex branch in Banasthali-16, Kathmandu offers spacious rooms and student-friendly facilities close to public transport, colleges, and medical institutes.',
    latitude: 27.728,
    longitude: 85.2965,
    phone: '9749329806',
    email: 'purplecap33@gmail.com',
    isActive: true,
    createdAt: '2026-10-16T14:27:40.947Z',
    owner: null,
    aliasSlugs: [
      'bishan-hostel-annex',
      'lumbini-peace-hostel',
      'nagarkot-sunrise-inn',
      'bhaktapur-heritage-stay',
    ],
  },
];

export function getHostelBySlug(slug: string): Hostel | undefined {
  if (!slug) return undefined;
  const normalized = slug.trim().toLowerCase();
  return HOSTELS.find(
    (h) =>
      h.slug.toLowerCase() === normalized ||
      h.id.toLowerCase() === normalized ||
      (h.aliasSlugs && h.aliasSlugs.some((alias) => alias.toLowerCase() === normalized))
  );
}

export function hostelSlugs(): string[] {
  return HOSTELS.map((h) => h.slug);
}
