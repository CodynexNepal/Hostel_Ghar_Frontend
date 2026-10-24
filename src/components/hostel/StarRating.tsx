'use client';

import React, { useState, useEffect } from 'react';
import { Star, CheckCircle, Loader2 } from 'lucide-react';
import { submitHostelRating, getHostelRatings } from '@/lib/api/hostels';

interface StarRatingProps {
  hostelId: string;
  initialRating?: number;
  initialReviews?: number;
  size?: number;
  showDetails?: boolean;
  onRatingSubmitted?: (rating: number) => void;
  className?: string;
}

export default function StarRating({
  hostelId,
  initialRating = 4.8,
  initialReviews = 12,
  size = 18,
  showDetails = true,
  onRatingSubmitted,
  className = '',
}: StarRatingProps) {
  const [rating, setRating] = useState<number>(initialRating);
  const [reviews, setReviews] = useState<number>(initialReviews);
  const [userRating, setUserRating] = useState<number | null>(null);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [isInteractiveOpen, setIsInteractiveOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Load user's previous rating and sync from backend
  useEffect(() => {
    if (typeof window !== 'undefined' && hostelId) {
      try {
        const saved = localStorage.getItem(`hostel_star_${hostelId}`);
        if (saved) {
          const parsed = Number(saved);
          if (parsed >= 1 && parsed <= 5) {
            setUserRating(parsed);
          }
        }
      } catch {
        // Ignore localStorage error
      }

      // Sync actual backend rating & review count
      getHostelRatings(hostelId)
        .then((res) => {
          if (res?.data?.averageRating) {
            setRating(res.data.averageRating);
          }
          if (res?.data?.totalReviews !== undefined) {
            setReviews(res.data.totalReviews);
          }
        })
        .catch(() => {
          // Graceful fallback to initial values
        });
    }
  }, [hostelId]);

  const handleRate = async (starCount: number) => {
    setUserRating(starCount);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3500);

    // Optimistically update review count and recalculated average
    if (!userRating) {
      const newReviews = reviews + 1;
      const newRating = Number(((rating * reviews + starCount) / newReviews).toFixed(1));
      setReviews(newReviews);
      setRating(newRating);
    }

    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(`hostel_star_${hostelId}`, String(starCount));
      }
    } catch {
      // Ignore localStorage error
    }

    if (onRatingSubmitted) {
      onRatingSubmitted(starCount);
    }

    // Send actual rating to backend
    if (hostelId) {
      setIsSubmitting(true);
      try {
        const res = await submitHostelRating(hostelId, starCount);
        if (res?.data?.averageRating) {
          setRating(res.data.averageRating);
        }
        if (res?.data?.totalReviews !== undefined) {
          setReviews(res.data.totalReviews);
        }
      } catch (err) {
        console.warn('Failed to send rating to backend:', err);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const starDescriptions = [
    '1 - Needs improvement',
    '2 - Fair',
    '3 - Good',
    '4 - Very good',
    '5 - Excellent & recommended',
  ];

  return (
    <div className={`relative flex flex-col gap-1.5 ${className}`}>
      {/* Current Rating & Star Display */}
      <div className="flex items-center gap-2 flex-wrap">
        <div className="flex items-center gap-0.5" role="group" aria-label="Rating stars">
          {[1, 2, 3, 4, 5].map((star) => {
            const isFilled = (hoverRating !== null ? hoverRating : rating) >= star;
            const isUserRated = userRating !== null && userRating >= star;

            return (
              <button
                key={star}
                type="button"
                onClick={() => handleRate(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(null)}
                title={starDescriptions[star - 1]}
                aria-label={`Rate ${star} star`}
                className="p-0.5 focus:outline-none transition-transform hover:scale-125 focus:scale-125 cursor-pointer rounded"
              >
                <Star
                  size={size}
                  className={`transition-colors ${
                    hoverRating !== null
                      ? hoverRating >= star
                        ? 'fill-amber-400 text-amber-400 drop-shadow-[0_0_4px_rgba(251,191,36,0.5)]'
                        : 'text-neutral-300'
                      : isFilled || isUserRated
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-neutral-300'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {showDetails && (
          <div className="flex items-center gap-1.5 text-sm">
            <span className="font-extrabold text-neutral-900">{rating.toFixed(1)}</span>
            <span className="text-neutral-500 font-medium">({reviews} reviews)</span>
          </div>
        )}

        {/* Quick Add Star Button if not already rated */}
        <button
          type="button"
          onClick={() => setIsInteractiveOpen(!isInteractiveOpen)}
          className="text-xs font-semibold px-2 py-0.5 rounded-md border border-neutral-200 text-neutral-600 hover:text-neutral-900 hover:border-neutral-300 transition-colors ml-1"
          title="Click to add or change your star rating"
        >
          {userRating ? `Your star: ${userRating}★` : '+ Add Star'}
        </button>
      </div>

      {/* Expanded Rating Drawer / Helper */}
      {isInteractiveOpen && (
        <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-xs text-neutral-700 animate-in fade-in duration-150">
          <p className="font-semibold text-neutral-900 mb-2">
            {userRating ? 'Update your star rating:' : 'Add your star rating for this hostel:'}
          </p>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => {
                  handleRate(s);
                  setIsInteractiveOpen(false);
                }}
                className={`flex-1 py-1 px-2 rounded-lg font-bold border transition-all text-center ${
                  userRating === s
                    ? 'bg-amber-400 border-amber-500 text-neutral-900 shadow-sm'
                    : 'bg-white border-neutral-200 hover:border-amber-400 text-neutral-800'
                }`}
              >
                {s} ★
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Instant Feedback Toast */}
      {showToast && (
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg animate-in fade-in slide-in-from-top-1 duration-200">
          {isSubmitting ? (
            <Loader2 size={14} className="text-emerald-600 animate-spin" />
          ) : (
            <CheckCircle size={14} className="text-emerald-600" />
          )}
          <span>
            {isSubmitting
              ? `Submitting your ${userRating}★ rating to server...`
              : `You added ${userRating} stars! Rating saved.`}
          </span>
        </div>
      )}
    </div>
  );
}

