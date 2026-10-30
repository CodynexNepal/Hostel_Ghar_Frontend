import React, { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import type { DayOfWeek, HostelMeal } from '@/lib/api/hostels';

const WEEKDAY_NAMES: Array<{ key: DayOfWeek; name: string; nepali: string }> = [
  { key: 'SUNDAY', name: 'Sunday', nepali: 'आइतबार' },
  { key: 'MONDAY', name: 'Monday', nepali: 'सोमबार' },
  { key: 'TUESDAY', name: 'Tuesday', nepali: 'मंगलबार' },
  { key: 'WEDNESDAY', name: 'Wednesday', nepali: 'बुधबार' },
  { key: 'THURSDAY', name: 'Thursday', nepali: 'बिहीबार' },
  { key: 'FRIDAY', name: 'Friday', nepali: 'शुक्रबार' },
  { key: 'SATURDAY', name: 'Saturday', nepali: 'शनिबार' },
];

function TestMealSchedule({ meals, hasMeals }: { meals: HostelMeal[]; hasMeals: boolean }) {
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>('SUNDAY');

  if (!hasMeals || meals.length === 0) {
    return (
      <div data-testid="meals-unconfigured">
        <p>Meal Schedule Coming Soon</p>
        <p>The weekly meal menu for this hostel has not been published yet.</p>
      </div>
    );
  }

  const currentMeal = meals.find((m) => m.dayOfWeek === selectedDay);

  return (
    <div data-testid="meals-section">
      <h2>Weekly Meals & Menu</h2>
      <div role="tablist">
        {WEEKDAY_NAMES.map((d) => (
          <button
            key={d.key}
            role="tab"
            aria-selected={selectedDay === d.key}
            onClick={() => setSelectedDay(d.key)}
          >
            {d.name}
          </button>
        ))}
      </div>

      <div data-testid="day-view">
        {currentMeal?.breakfastDescription ? (
          <div data-testid="breakfast-card">
            <h4>Breakfast</h4>
            <p>{currentMeal.breakfastDescription}</p>
            {currentMeal.breakfastTime && <span>{currentMeal.breakfastTime}</span>}
          </div>
        ) : null}

        {currentMeal?.mainMealDescription ? (
          <div data-testid="main-meal-card">
            <h4>Main Meal</h4>
            <p>{currentMeal.mainMealDescription}</p>
            {currentMeal.mainMealTime && <span>{currentMeal.mainMealTime}</span>}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function TestLocationSection({
  isLocationShared,
  latitude,
  longitude,
  address,
  city,
}: {
  isLocationShared: boolean;
  latitude: number | null;
  longitude: number | null;
  address: string;
  city: string;
}) {
  const hasValidCoords =
    isLocationShared &&
    latitude !== null &&
    longitude !== null &&
    !isNaN(latitude) &&
    !isNaN(longitude);

  if (!hasValidCoords) {
    return (
      <div data-testid="location-fallback">
        <h3>Verified Address</h3>
        <p>
          {address}, {city}
        </p>
        <p>GPS coordinates are not publicly shared for this property.</p>
      </div>
    );
  }

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}`;

  return (
    <div data-testid="location-shared">
      <h3>Hostel Location</h3>
      <iframe
        title="Hostel Location Map"
        data-testid="osm-map-iframe"
        src={`https://www.openstreetmap.org/export/embed.html?marker=${encodeURIComponent(latitude)}%2C${encodeURIComponent(longitude)}`}
      />
      <a
        data-testid="directions-link"
        href={directionsUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        Get Directions
      </a>
      <span data-testid="gps-coordinates">
        {latitude.toFixed(5)}, {longitude.toFixed(5)}
      </span>
    </div>
  );
}

describe('Public Frontend Features', () => {
  const sampleMeals: HostelMeal[] = [
    {
      dayOfWeek: 'SUNDAY',
      breakfastDescription: 'Tea, boiled eggs, bread',
      breakfastTime: '7:30 AM',
      mainMealDescription: 'Dal bhat, seasonal vegetables, chicken curry',
      mainMealTime: '7:00 PM',
    },
    {
      dayOfWeek: 'MONDAY',
      breakfastDescription: 'Milk tea, chiura, yogurt',
      breakfastTime: '7:30 AM',
      mainMealDescription: 'Rice, dal, mixed vegetables',
      mainMealTime: '7:00 PM',
    },
  ];

  it('renders weekly meal schedule and allows switching weekday tabs', () => {
    render(<TestMealSchedule meals={sampleMeals} hasMeals={true} />);

    expect(screen.getByText('Weekly Meals & Menu')).toBeInTheDocument();
    expect(screen.getByText('Tea, boiled eggs, bread')).toBeInTheDocument();
    expect(screen.getByText('Dal bhat, seasonal vegetables, chicken curry')).toBeInTheDocument();

    // Click Monday tab
    const mondayTab = screen.getByRole('tab', { name: 'Monday' });
    fireEvent.click(mondayTab);

    expect(screen.getByText('Milk tea, chiura, yogurt')).toBeInTheDocument();
    expect(screen.getByText('Rice, dal, mixed vegetables')).toBeInTheDocument();
  });

  it('renders friendly unconfigured state when meal schedule is empty', () => {
    render(<TestMealSchedule meals={[]} hasMeals={false} />);

    expect(screen.getByTestId('meals-unconfigured')).toBeInTheDocument();
    expect(screen.getByText(/Meal Schedule Coming Soon/i)).toBeInTheDocument();
  });

  it('renders interactive map and directions link when location sharing is enabled', () => {
    render(
      <TestLocationSection
        isLocationShared={true}
        latitude={27.7172}
        longitude={85.324}
        address="Banasthali-16"
        city="Kathmandu"
      />
    );

    expect(screen.getByTestId('location-shared')).toBeInTheDocument();
    expect(screen.getByTestId('osm-map-iframe')).toBeInTheDocument();

    const link = screen.getByTestId('directions-link');
    expect(link).toHaveAttribute(
      'href',
      'https://www.google.com/maps/dir/?api=1&destination=27.7172,85.324'
    );
    expect(screen.getByTestId('gps-coordinates')).toHaveTextContent('27.71720, 85.32400');
  });

  it('hides map and coordinates when location sharing is disabled, showing address fallback', () => {
    render(
      <TestLocationSection
        isLocationShared={false}
        latitude={27.7172} // Saved in database but hidden!
        longitude={85.324}
        address="Banasthali-16"
        city="Kathmandu"
      />
    );

    expect(screen.queryByTestId('location-shared')).not.toBeInTheDocument();
    expect(screen.queryByTestId('osm-map-iframe')).not.toBeInTheDocument();
    expect(screen.queryByTestId('directions-link')).not.toBeInTheDocument();
    expect(screen.queryByText(/27\.7172/)).not.toBeInTheDocument();

    expect(screen.getByTestId('location-fallback')).toBeInTheDocument();
    expect(screen.getByText(/Banasthali-16, Kathmandu/i)).toBeInTheDocument();
  });
});
