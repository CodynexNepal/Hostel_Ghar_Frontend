'use client';

import { useEffect, useState, useMemo } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/navigation/Header';
import Footer from '@/components/navigation/Footer';
import BookingModal from '@/components/booking/BookingModal';
import StarRating from '@/components/hostel/StarRating';
import { Hostel } from '@/lib/api/hostels';
import { useHostels } from '@/hooks/useHostels';
import { HOSTELS } from '@/data/hostels';
import {
  Search,
  MapPin,
  Star,
  Wifi,
  Coffee,
  Tv,
  Wind,
  Dumbbell,
  Utensils,
  Car,
  PawPrint,
  SlidersHorizontal,
  ChevronDown,
  Heart,
  Grid3X3,
  List,
  BedDouble,
  Users,
} from 'lucide-react';

const locations = [
  'All Locations',
  'Kathmandu',
  'Pokhara',
  'Chitwan',
  'Lumbini',
  'Bhaktapur',
  'Patan',
  'Nagarkot',
  'Dhulikhel',
];

const amenities = [
  { id: 'wifi', label: 'Free WiFi', icon: <Wifi size={16} /> },
  { id: 'breakfast', label: 'Breakfast', icon: <Coffee size={16} /> },
  { id: 'tv', label: 'TV Room', icon: <Tv size={16} /> },
  { id: 'ac', label: 'AC', icon: <Wind size={16} /> },
  { id: 'gym', label: 'Gym', icon: <Dumbbell size={16} /> },
  { id: 'kitchen', label: 'Kitchen', icon: <Utensils size={16} /> },
  { id: 'parking', label: 'Parking', icon: <Car size={16} /> },
  { id: 'pet', label: 'Pet Friendly', icon: <PawPrint size={16} /> },
];

const roomTypes = [
  'All Types',
  'Boys Hostel',
  'Girls Hostel',
  'Co-ed Hostel',
  'Dormitory',
  'Private Room',
];

const sortOptions = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'reviews', label: 'Most Reviewed' },
];

// Default placeholder image when the API does not return a logoUrl
const DEFAULT_HOSTEL_IMAGE = '/images/static/hostel.jpg';

// UI card shape derived from the API Hostel response
interface HostelCardData {
  id: string;
  name: string;
  location: string;
  price: number;
  monthlyPrice: number;
  originalPrice: number | null;
  originalMonthlyPrice: number | null;
  totalBeds: number;
  availableBeds: number;
  totalStudents: number;
  rating: number;
  reviews: number;
  amenities: string[];
  roomType: string;
  discount: number | null;
  featured: boolean;
  image: string;
  phone?: string | null;
  email?: string | null;
}

// Map the API Hostel shape to the UI card fields, directly using endpoint response
const mapHostelToCard = (hostel: Hostel): HostelCardData => {
  const typeFormatted = hostel.category
    ? hostel.category
    : hostel.type
      ? `${hostel.type.charAt(0).toUpperCase() + hostel.type.slice(1).toLowerCase()} Hostel`
      : 'Boys Hostel';

  const known = HOSTELS.find((h) => h.id === hostel.id || h.slug === hostel.id);
  const loc =
    hostel.address ||
    known?.area ||
    [hostel.address, hostel.city].filter(Boolean).join(', ') ||
    'Banasthali-16, Kathmandu';
  const name = hostel.name || known?.name || 'Hostel';
  const rating = hostel.rating ?? known?.rating ?? 4.8;
  const reviews = hostel.reviewCount ?? known?.reviews ?? 0;
  const monthlyPrice = hostel.monthlyRent ?? hostel.monthlyPrice ?? known?.monthlyPrice ?? 12000;
  const originalMonthlyPrice =
    known?.originalMonthlyPrice ?? (monthlyPrice ? Math.round(monthlyPrice * 1.18) : 14000);
  const isFeatured =
    hostel.isFeatured ??
    (hostel.id === 'bdde17d2-d56e-4f81-987c-d0132cf4409d' ||
      hostel.id === 'a38bf07a-b7b1-49dc-85c8-dd5542a8e90a');
  const discount =
    hostel.discountPercent ??
    (originalMonthlyPrice
      ? Math.round(((originalMonthlyPrice - monthlyPrice) / originalMonthlyPrice) * 100)
      : null);

  const amenities =
    hostel.facilities && hostel.facilities.length > 0
      ? hostel.facilities.map((f) => (typeof f === 'string' ? f : f.title))
      : known?.amenities ?? ['wifi', 'breakfast', 'cctv'];

  return {
    id: hostel.id,
    name,
    location: loc,
    price: hostel.priceFrom ?? known?.priceFrom ?? 1200,
    monthlyPrice,
    originalPrice: known?.originalPrice ?? 1500,
    originalMonthlyPrice,
    totalBeds: hostel.totalBeds ?? known?.totalBeds ?? 48,
    availableBeds: hostel.availableBeds ?? known?.availableBeds ?? 8,
    totalStudents: hostel.totalStudents ?? known?.totalStudents ?? 40,
    rating,
    reviews,
    amenities,
    roomType: typeFormatted,
    discount,
    featured: isFeatured,
    image: hostel.logoUrl || known?.image || DEFAULT_HOSTEL_IMAGE,
    phone: hostel.phone ?? known?.phone ?? null,
    email: hostel.email ?? known?.email ?? null,
  };
};

// Initial state mapped from verified backend data
const INITIAL_HOSTELS: HostelCardData[] = HOSTELS.map((h) => ({
  id: h.id,
  name: h.name,
  location: h.area,
  price: h.priceFrom,
  monthlyPrice: h.monthlyPrice,
  originalPrice: h.originalPrice || null,
  originalMonthlyPrice: h.originalMonthlyPrice || null,
  totalBeds: h.totalBeds,
  availableBeds: h.availableBeds,
  totalStudents: h.totalStudents,
  rating: h.rating,
  reviews: h.reviews,
  amenities: h.amenities,
  roomType: h.roomType,
  discount: h.originalMonthlyPrice
    ? Math.round(((h.originalMonthlyPrice - h.monthlyPrice) / h.originalMonthlyPrice) * 100)
    : null,
  featured:
    h.id === 'bdde17d2-d56e-4f81-987c-d0132cf4409d' ||
    h.id === 'a38bf07a-b7b1-49dc-85c8-dd5542a8e90a',
  image: h.image,
  phone: h.phone || null,
  email: h.email || null,
}));

const HostelCard = ({
  hostel,
  onBook,
}: {
  hostel: HostelCardData;
  onBook: (hostel: HostelCardData) => void;
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [imgSrc, setImgSrc] = useState(hostel.image);
  const isExternal = imgSrc.startsWith('http://') || imgSrc.startsWith('https://');

  return (
    <div className="group bg-white rounded-2xl border border-neutral-100 overflow-hidden hover:border-brand-lime/50 hover:shadow-medium transition-all duration-300 flex flex-col justify-between">
      <div>
        <div className="relative h-48 overflow-hidden bg-neutral-100">
          <Link href={`/hostel/${hostel.id}`} className="block w-full h-full">
            <Image
              src={imgSrc}
              alt={hostel.name}
              fill
              unoptimized={isExternal}
              onError={() => setImgSrc(DEFAULT_HOSTEL_IMAGE)}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </Link>
          <div className="absolute top-3 left-3 flex gap-2 pointer-events-none">
            {hostel.discount && (
              <span className="px-2.5 py-1 bg-red-500 text-white text-xs font-bold rounded-lg shadow-sm">
                -{hostel.discount}%
              </span>
            )}
            {hostel.featured && (
              <span className="px-2.5 py-1 bg-brand-lime text-brand-black text-xs font-bold rounded-lg shadow-sm">
                Featured
              </span>
            )}
          </div>
          <button
            onClick={() => setIsLiked(!isLiked)}
            className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors z-10"
            aria-label="Save hostel"
          >
            <Heart
              size={18}
              strokeWidth={2}
              className={isLiked ? 'fill-red-500 text-red-500' : 'text-neutral-600'}
            />
          </button>
          <div className="absolute bottom-3 left-3 pointer-events-none">
            <span className="px-2.5 py-1 bg-brand-black/80 text-white text-xs font-medium rounded-lg backdrop-blur-sm">
              {hostel.roomType}
            </span>
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-center gap-1.5 text-neutral-500 text-sm mb-1.5">
            <MapPin size={14} strokeWidth={2} />
            <span className="truncate">{hostel.location}</span>
          </div>

          <Link href={`/hostel/${hostel.id}`}>
            <h3 className="text-lg font-bold text-brand-black mb-2 group-hover:text-brand-lime transition-colors">
              {hostel.name}
            </h3>
          </Link>

          {/* Interactive Star Rating with Add a Star feature */}
          <div className="mb-3">
            <StarRating
              hostelId={hostel.id}
              initialRating={hostel.rating}
              initialReviews={hostel.reviews}
              size={15}
              showDetails={true}
            />
          </div>

          {/* Key Occupancy & Capacity Stats: Beds Available & Total Students */}
          <div className="grid grid-cols-2 gap-2 p-2.5 mb-3 rounded-xl bg-neutral-50 border border-neutral-100 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span className="font-bold text-emerald-800">{hostel.availableBeds} beds free</span>
            </div>
            <div className="flex items-center gap-1.5 text-neutral-600 justify-end">
              <Users size={13} className="text-purple-600 shrink-0" />
              <span className="font-medium">{hostel.totalStudents} students</span>
            </div>
          </div>

          {/* Facilities preview chips */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            <span className="px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-600 text-[11px] font-medium flex items-center gap-1">
              <Wifi size={12} className="text-blue-500" /> Free WiFi
            </span>
            <span className="px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-600 text-[11px] font-medium flex items-center gap-1">
              <Coffee size={12} className="text-amber-500" /> Meals
            </span>
            <span className="px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-600 text-[11px] font-medium flex items-center gap-1">
              <Wind size={12} className="text-emerald-500" /> Hot Water
            </span>
          </div>
        </div>
      </div>

      <div className="p-5 pt-0">
        <div className="flex items-end justify-between pt-3 border-t border-neutral-100">
          <div>
            <p className="text-[11px] text-neutral-400 font-medium">Monthly Rent</p>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-extrabold text-brand-black">
                NPR {hostel.monthlyPrice.toLocaleString()}
              </span>
              <span className="text-xs text-neutral-500">/mo</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onBook(hostel)}
            className="px-4 py-2 bg-brand-lime text-brand-black text-sm font-bold rounded-xl hover:bg-brand-lime/85 transition-colors shadow-sm cursor-pointer"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

const HostelsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedRoomType, setSelectedRoomType] = useState('All Types');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('recommended');
  const [showFilters, setShowFilters] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [bookingHostel, setBookingHostel] = useState<HostelCardData | null>(null);

  // Pagination + API state using custom Axios hook
  const [page, setPage] = useState(1);
  const {
    hostels: apiHostels,
    pagination: apiPagination,
    loading,
    error,
  } = useHostels({
    page,
    limit: 20,
  });

  const hostels: HostelCardData[] = useMemo(() => {
    if (apiHostels && apiHostels.length > 0) {
      return apiHostels.map(mapHostelToCard);
    }
    return INITIAL_HOSTELS;
  }, [apiHostels]);

  const pagination = apiPagination || {
    totalItems: hostels.length,
    currentPage: page,
    totalPages: Math.max(1, Math.ceil(hostels.length / 20)),
    itemsPerPage: 20,
    hasNextPage: false,
    hasPrevPage: false,
  };

  const toggleAmenity = (amenityId: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenityId) ? prev.filter((id) => id !== amenityId) : [...prev, amenityId]
    );
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedLocation('All Locations');
    setSelectedRoomType('All Types');
    setSelectedAmenities([]);
    setPriceRange([0, 5000]);
    setMinRating(0);
    setPage(1);
  };

  const activeFiltersCount = [
    selectedLocation !== 'All Locations',
    selectedRoomType !== 'All Types',
    selectedAmenities.length > 0,
    priceRange[0] > 0 || priceRange[1] < 5000,
    minRating > 0,
  ].filter(Boolean).length;

  // Client-side filtering over loaded page results
  const filteredHostels = hostels.filter((h) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const match = h.name.toLowerCase().includes(q) || h.location.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (selectedLocation !== 'All Locations') {
      if (!h.location.toLowerCase().includes(selectedLocation.toLowerCase())) {
        return false;
      }
    }
    if (selectedRoomType !== 'All Types') {
      if (!h.roomType.toLowerCase().includes(selectedRoomType.toLowerCase())) {
        return false;
      }
    }
    return true;
  });

  const totalItems = pagination?.totalItems ?? filteredHostels.length;
  const totalPages = pagination?.totalPages ?? 1;
  const currentPage = pagination?.currentPage ?? page;

  return (
    <>
      <Head>
        <title>Find Hostels - Hostel Ghar</title>
        <meta name="description" content="Find and book the best hostels across Nepal" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen bg-[#f8f8f8]">
        <Header />
        <section className="bg-gradient-to-br from-brand-white via-[#f8ffed] to-[#e8ffcc] pt-8 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl md:text-4xl font-extrabold text-brand-black tracking-tight mb-2">
              Find Your Perfect Hostel
            </h1>
            <p className="text-neutral-600 mb-6">
              Discover verified hostels across Nepal at the best prices
            </p>
            <div className="bg-white rounded-2xl shadow-medium p-4 border border-neutral-100">
              <div className="grid md:grid-cols-4 gap-4">
                <div className="md:col-span-2 relative">
                  <Search
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                  />
                  <input
                    type="text"
                    placeholder="Search by hostel name, city or address..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-neutral-200 focus:border-brand-lime focus:ring-2 focus:ring-brand-lime/20 outline-none text-brand-black placeholder:text-neutral-400 text-sm"
                  />
                </div>
                <div>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full py-3 px-4 rounded-xl border border-neutral-200 focus:border-brand-lime focus:ring-2 focus:ring-brand-lime/20 outline-none text-brand-black text-sm bg-white"
                  >
                    {locations.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <select
                    value={selectedRoomType}
                    onChange={(e) => setSelectedRoomType(e.target.value)}
                    className="w-full py-3 px-4 rounded-xl border border-neutral-200 focus:border-brand-lime focus:ring-2 focus:ring-brand-lime/20 outline-none text-brand-black text-sm bg-white"
                  >
                    {roomTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-colors ${
                    showFilters
                      ? 'bg-brand-lime text-brand-black border-brand-lime'
                      : 'bg-white text-neutral-600 border-neutral-200 hover:border-brand-lime'
                  }`}
                >
                  <SlidersHorizontal size={16} />
                  <span>Filters</span>
                  {activeFiltersCount > 0 && (
                    <span className="w-5 h-5 bg-brand-black text-white text-xs rounded-full flex items-center justify-center">
                      {activeFiltersCount}
                    </span>
                  )}
                </button>
                <span className="text-sm text-neutral-500">
                  Showing <span className="font-bold text-brand-black">{totalItems}</span> hostels
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center bg-white rounded-xl border border-neutral-200 p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-lg transition-colors ${
                      viewMode === 'grid'
                        ? 'bg-brand-lime text-brand-black'
                        : 'text-neutral-400 hover:text-brand-black'
                    }`}
                    aria-label="Grid view"
                  >
                    <Grid3X3 size={18} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-lg transition-colors ${
                      viewMode === 'list'
                        ? 'bg-brand-lime text-brand-black'
                        : 'text-neutral-400 hover:text-brand-black'
                    }`}
                    aria-label="List view"
                  >
                    <List size={18} />
                  </button>
                </div>
                <div className="relative">
                  <button
                    onClick={() => setShowSortDropdown(!showSortDropdown)}
                    className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-neutral-200 text-sm font-medium text-neutral-600 hover:border-brand-lime transition-colors"
                  >
                    <span>Sort: {sortOptions.find((o) => o.value === sortBy)?.label}</span>
                    <ChevronDown size={16} />
                  </button>
                  {showSortDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-large border border-neutral-100 py-1 z-20">
                      {sortOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => {
                            setSortBy(option.value);
                            setShowSortDropdown(false);
                          }}
                          className={`w-full px-4 py-2 text-left text-sm hover:bg-brand-lime/10 transition-colors ${
                            sortBy === option.value
                              ? 'text-brand-black font-bold'
                              : 'text-neutral-600'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-6">
              {showFilters && (
                <div className="w-72 flex-shrink-0">
                  <div className="bg-white rounded-2xl border border-neutral-100 p-6 sticky top-24">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-bold text-brand-black">Filters</h3>
                      {activeFiltersCount > 0 && (
                        <button
                          onClick={clearAllFilters}
                          className="text-sm text-red-500 hover:text-red-600 font-medium"
                        >
                          Clear All
                        </button>
                      )}
                    </div>
                    <div className="mb-6">
                      <h4 className="text-sm font-bold text-brand-black mb-3">Price Range</h4>
                      <div className="flex items-center gap-3">
                        <div className="flex-1">
                          <label className="text-xs text-neutral-500 mb-1 block">Min</label>
                          <input
                            type="number"
                            value={priceRange[0]}
                            onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                            className="w-full px-3 py-2 rounded-lg border border-neutral-200 text-sm focus:border-brand-lime outline-none"
                          />
                        </div>
                        <span className="text-neutral-400 mt-5">-</span>
                        <div className="flex-1">
                          <label className="text-xs text-neutral-500 mb-1 block">Max</label>
                          <input
                            type="number"
                            value={priceRange[1]}
                            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                            className="w-full px-3 py-2 rounded-lg border border-neutral-200 text-sm focus:border-brand-lime outline-none"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mb-6">
                      <h4 className="text-sm font-bold text-brand-black mb-3">Room Type</h4>
                      <div className="space-y-2">
                        {roomTypes.map((type) => (
                          <label
                            key={type}
                            className="flex items-center gap-3 cursor-pointer group"
                            onClick={() => setSelectedRoomType(type)}
                          >
                            <div
                              className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                                selectedRoomType === type
                                  ? 'bg-brand-lime border-brand-lime'
                                  : 'border-neutral-300'
                              }`}
                            >
                              {selectedRoomType === type && (
                                <div className="w-2 h-2 bg-brand-black rounded-full" />
                              )}
                            </div>
                            <span className="text-sm text-neutral-600">{type}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="mb-6">
                      <h4 className="text-sm font-bold text-brand-black mb-3">Min Rating</h4>
                      <div className="flex gap-2">
                        {[0, 3, 4, 4.5].map((rating) => (
                          <button
                            key={rating}
                            onClick={() => setMinRating(rating)}
                            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                              minRating === rating
                                ? 'bg-brand-lime text-brand-black'
                                : 'bg-neutral-100 text-neutral-600'
                            }`}
                          >
                            {rating === 0 ? 'All' : `${rating}+`}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-brand-black mb-3">Amenities</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {amenities.map((amenity) => (
                          <button
                            key={amenity.id}
                            onClick={() => toggleAmenity(amenity.id)}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                              selectedAmenities.includes(amenity.id)
                                ? 'bg-brand-lime text-brand-black'
                                : 'bg-neutral-100 text-neutral-600'
                            }`}
                          >
                            {amenity.icon}
                            <span className="truncate">{amenity.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="flex-1">
                {loading && hostels.length === 0 ? (
                  <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <div
                        key={n}
                        className="bg-white rounded-2xl border border-neutral-100 overflow-hidden animate-pulse"
                      >
                        <div className="h-48 bg-neutral-200" />
                        <div className="p-5 space-y-3">
                          <div className="h-4 bg-neutral-200 rounded w-1/3" />
                          <div className="h-6 bg-neutral-200 rounded w-3/4" />
                          <div className="h-4 bg-neutral-200 rounded w-1/2" />
                          <div className="h-10 bg-neutral-200 rounded mt-4" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : error && hostels.length === 0 ? (
                  <div className="bg-white rounded-2xl border border-neutral-200 p-8 text-center max-w-md mx-auto my-12">
                    <p className="text-red-500 font-semibold mb-2">Unable to load hostels</p>
                    <p className="text-neutral-500 text-sm mb-4">{error}</p>
                    <button
                      onClick={() => setPage(1)}
                      className="px-5 py-2.5 bg-brand-lime text-brand-black text-sm font-bold rounded-xl hover:bg-brand-lime/80 transition-colors"
                    >
                      Try Again
                    </button>
                  </div>
                ) : filteredHostels.length === 0 ? (
                  <div className="bg-white rounded-2xl border border-neutral-200 p-12 text-center my-8">
                    <h3 className="text-lg font-bold text-brand-black mb-1">No hostels found</h3>
                    <p className="text-neutral-500 text-sm mb-4">
                      Try adjusting your search criteria or clearing active filters.
                    </p>
                    <button
                      onClick={clearAllFilters}
                      className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-brand-black text-sm font-semibold rounded-xl transition-colors"
                    >
                      Reset Filters
                    </button>
                  </div>
                ) : (
                  <div
                    className={
                      viewMode === 'grid'
                        ? 'grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                        : 'flex flex-col gap-4'
                    }
                  >
                    {filteredHostels.map((hostel) => (
                      <HostelCard key={hostel.id} hostel={hostel} onBook={setBookingHostel} />
                    ))}
                  </div>
                )}

                <div className="flex justify-center mt-10">
                  {totalPages > 1 && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setPage((p) => Math.max(p - 1, 1))}
                        disabled={currentPage <= 1}
                        className={`w-10 h-10 rounded-xl border flex items-center justify-center text-sm font-medium transition-colors ${
                          currentPage <= 1
                            ? 'border-neutral-200 text-neutral-400'
                            : 'border-brand-lime text-brand-black hover:bg-brand-lime/10'
                        }`}
                        aria-label="Previous page"
                      >
                        <ChevronDown size={18} className="rotate-90" strokeWidth={2} />
                      </button>
                      {[...Array(totalPages)].map((_, i) => {
                        const p = i + 1;
                        return (
                          <button
                            key={p}
                            onClick={() => setPage(p)}
                            className={`w-10 h-10 rounded-xl font-semibold text-sm transition-colors ${
                              p === currentPage
                                ? 'bg-brand-lime text-brand-black'
                                : 'border border-neutral-200 text-neutral-600 hover:border-brand-lime hover:text-brand-black'
                            }`}
                          >
                            {p}
                          </button>
                        );
                      })}
                      <button
                        onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                        disabled={currentPage >= totalPages}
                        className={`w-10 h-10 rounded-xl border flex items-center justify-center text-sm font-medium transition-colors ${
                          currentPage >= totalPages
                            ? 'border-neutral-200 text-neutral-400'
                            : 'border-brand-lime text-brand-black hover:bg-brand-lime/10'
                        }`}
                        aria-label="Next page"
                      >
                        <ChevronDown size={18} className="-rotate-90" strokeWidth={2} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
        {bookingHostel && (
          <BookingModal
            isOpen={Boolean(bookingHostel)}
            onClose={() => setBookingHostel(null)}
            hostelId={bookingHostel.id}
            hostelName={bookingHostel.name}
            monthlyPrice={bookingHostel.monthlyPrice}
            priceFrom={bookingHostel.price}
            availableBeds={bookingHostel.availableBeds}
            totalBeds={bookingHostel.totalBeds}
            location={bookingHostel.location}
          />
        )}
        <Footer />
      </main>
    </>
  );
};

export default HostelsPage;
