'use client';

import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Header from '@/components/navigation/Header';
import Footer from '@/components/navigation/Footer';
import { listHostels, Hostel, ListHostelsResponse } from '@/lib/api/hostels';
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

const roomTypes = ['All Types', 'Dormitory', 'Private Room', 'Twin Room', 'Double Room', 'Suite'];

const sortOptions = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'reviews', label: 'Most Reviewed' },
];

// Default placeholder image when the API does not return a logoUrl
const DEFAULT_HOSTEL_IMAGE = '/images/static/hostel.jpeg';

// UI card shape derived from the API Hostel response
interface HostelCardData {
  id: string;
  name: string;
  location: string;
  price: number;
  originalPrice: number | null;
  rating: number;
  reviews: number;
  amenities: string[];
  roomType: string;
  discount: number | null;
  featured: boolean;
  image: string;
}

// Map the API Hostel shape to the UI card fields
const mapHostelToCard = (hostel: Hostel): HostelCardData => ({
  id: hostel.id,
  name: hostel.name,
  location: hostel.city || hostel.address || 'Nepal',
  price: 1200,
  originalPrice: null,
  rating: 4.5,
  reviews: 0,
  amenities: ['wifi'],
  roomType: hostel.type || 'Private Room',
  discount: null,
  featured: false,
  image: hostel.logoUrl || DEFAULT_HOSTEL_IMAGE,
});

const HostelCard = ({ hostel }: { hostel: HostelCardData }) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="group bg-white rounded-2xl border border-neutral-100 overflow-hidden hover:border-brand-lime/50 hover:shadow-medium transition-all duration-300">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={hostel.image}
          alt={hostel.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        <div className="absolute top-3 left-3 flex gap-2">
          {hostel.discount && (
            <span className="px-2.5 py-1 bg-red-500 text-white text-xs font-bold rounded-lg">
              -{hostel.discount}%
            </span>
          )}
          {hostel.featured && (
            <span className="px-2.5 py-1 bg-brand-lime text-brand-black text-xs font-bold rounded-lg">
              Featured
            </span>
          )}
        </div>
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
        >
          <Heart
            size={18}
            strokeWidth={2}
            className={isLiked ? 'fill-red-500 text-red-500' : 'text-neutral-600'}
          />
        </button>
        <div className="absolute bottom-3 left-3">
          <span className="px-2.5 py-1 bg-brand-black/80 text-white text-xs font-medium rounded-lg backdrop-blur-sm">
            {hostel.roomType}
          </span>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-1.5 text-neutral-500 text-sm mb-2">
          <MapPin size={14} strokeWidth={2} />
          <span>{hostel.location}</span>
        </div>
        <h3 className="text-lg font-bold text-brand-black mb-2 group-hover:text-brand-lime transition-colors">
          {hostel.name}
        </h3>
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            <Star size={16} fill="#B9FF66" stroke="#B9FF66" />
            <span className="text-sm font-bold text-brand-black">{hostel.rating}</span>
          </div>
          <span className="text-sm text-neutral-500">({hostel.reviews} reviews)</span>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {hostel.amenities.slice(0, 4).map((amenity) => {
            const amenityData = amenities.find((a) => a.id === amenity);
            return (
              <div
                key={amenity}
                className="w-8 h-8 bg-neutral-100 rounded-lg flex items-center justify-center text-neutral-600"
                title={amenityData?.label}
              >
                {amenityData?.icon}
              </div>
            );
          })}
          {hostel.amenities.length > 4 && (
            <div className="w-8 h-8 bg-neutral-100 rounded-lg flex items-center justify-center text-xs font-bold text-neutral-600">
              +{hostel.amenities.length - 4}
            </div>
          )}
        </div>
        <div className="flex items-end justify-between pt-3 border-t border-neutral-100">
          <div>
            {hostel.originalPrice && (
              <span className="text-sm text-neutral-400 line-through">
                NPR {hostel.originalPrice.toLocaleString()}
              </span>
            )}
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-extrabold text-brand-black">
                NPR {hostel.price.toLocaleString()}
              </span>
              <span className="text-sm text-neutral-500">/night</span>
            </div>
          </div>
          <button className="px-4 py-2 bg-brand-lime text-brand-black text-sm font-bold rounded-xl hover:bg-brand-lime/85 transition-colors">
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

  // Pagination + API state
  const [page, setPage] = useState(1);
  const [hostels, setHostels] = useState<HostelCardData[]>([]);
  const [pagination, setPagination] = useState<ListHostelsResponse['pagination'] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  // Fetch hostels from the production API whenever filters or page change
  useEffect(() => {
    let cancelled = false;
    const fetchHostels = async () => {
      setLoading(true);
      setError(null);
      try {
        const response: ListHostelsResponse = await listHostels({
          page,
          limit: 12,
        });
        if (!cancelled) {
          setHostels(response.data.map(mapHostelToCard));
          setPagination(response.pagination);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load hostels');
          setHostels([]);
          setPagination(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };
    fetchHostels();
    return () => {
      cancelled = true;
    };
  }, [page, searchQuery, selectedLocation, selectedRoomType, selectedAmenities, priceRange, minRating, sortBy]);

  const totalItems = pagination?.totalItems ?? 0;
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
              Discover {totalItems}+ hostels across Nepal at the best prices
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
                    placeholder="Search hostels, locations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-neutral-200 focus:border-brand-lime focus:ring-2 focus:ring-brand-lime/20 outline-none transition-all"
                  />
                </div>
                <div className="relative">
                  <MapPin
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                  />
                  <select
                    value={selectedLocation}
                    onChange={(e) => {
                      setSelectedLocation(e.target.value);
                      setPage(1);
                    }}
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-neutral-200 focus:border-brand-lime outline-none appearance-none bg-white"
                  >
                    {locations.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={18}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
                  />
                </div>
                <button className="flex items-center justify-center gap-2 px-6 py-3.5 bg-brand-lime text-brand-black font-bold rounded-xl hover:bg-brand-lime/85 shadow-lime transition-all">
                  <Search size={18} strokeWidth={2.2} />
                  Search
                </button>
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
                  className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl border border-neutral-200 hover:border-brand-lime transition-colors"
                >
                  <SlidersHorizontal size={18} strokeWidth={2} />
                  <span className="font-semibold text-sm">Filters</span>
                  {activeFiltersCount > 0 && (
                    <span className="w-5 h-5 bg-brand-lime text-brand-black text-xs font-bold rounded-full flex items-center justify-center">
                      {activeFiltersCount}
                    </span>
                  )}
                </button>
                  <span className="text-neutral-600 text-sm">
                    <span className="font-bold text-brand-black">{totalItems}</span> hostels found
                  </span>
              </div>
              <div className="relative">
                <button
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl border border-neutral-200 hover:border-brand-lime transition-colors"
                >
                  <span className="font-semibold text-sm">
                    {sortOptions.find((o) => o.value === sortBy)?.label}
                  </span>
                  <ChevronDown size={16} strokeWidth={2} />
                </button>
                {showSortDropdown && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-medium border border-neutral-100 py-2 z-20">
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSortBy(option.value);
                          setShowSortDropdown(false);
                          setPage(1);
                        }}
                        className={`w-full px-4 py-2 text-left text-sm hover:bg-brand-lime/10 transition-colors ${sortBy === option.value ? 'text-brand-black font-bold' : 'text-neutral-600'}`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
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
                              className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${selectedRoomType === type ? 'bg-brand-lime border-brand-lime' : 'border-neutral-300'}`}
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
                            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${minRating === rating ? 'bg-brand-lime text-brand-black' : 'bg-neutral-100 text-neutral-600'}`}
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
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${selectedAmenities.includes(amenity.id) ? 'bg-brand-lime text-brand-black' : 'bg-neutral-100 text-neutral-600'}`}
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
                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {hostels.map((hostel) => (
                    <HostelCard key={hostel.id} hostel={hostel} />
                  ))}
                </div>
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
        <Footer />
      </main>
    </>
  );
};

export default HostelsPage;
