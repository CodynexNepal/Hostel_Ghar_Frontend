import { useState, useEffect, useCallback } from 'react';
import { toggleHostelLike, getUserLikedHostels } from '@/lib/api/interactions';

const STORAGE_KEY = 'hg_liked_hostels';

export function useHostelLikes() {
  const [likedIds, setLikedIds] = useState<Set<string>>(() => {
    if (typeof window === 'undefined') return new Set();
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const arr = JSON.parse(stored);
        return new Set(Array.isArray(arr) ? arr : []);
      }
    } catch {
      // ignore JSON errors
    }
    return new Set();
  });

  const [likedHostels, setLikedHostels] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Sync likes from backend on mount
  const refreshLikes = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getUserLikedHostels();
      if (res && res.success && res.data) {
        const ids = new Set(res.data.likedHostelIds || []);
        setLikedIds(ids);
        setLikedHostels(res.data.hostels || []);
        if (typeof window !== 'undefined') {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(ids)));
        }
      }
    } catch (err) {
      // Backend may be offline or rate-limited; fallback to localStorage
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshLikes();

    const handleSync = (e: Event) => {
      const customEvent = e as CustomEvent<{ hostelId: string; liked: boolean }>;
      if (customEvent.detail) {
        const { hostelId, liked } = customEvent.detail;
        setLikedIds((prev) => {
          const next = new Set(prev);
          if (liked) next.add(hostelId);
          else next.delete(hostelId);
          return next;
        });
      }
    };

    window.addEventListener('hg-hostel-like-changed', handleSync);
    return () => {
      window.removeEventListener('hg-hostel-like-changed', handleSync);
    };
  }, [refreshLikes]);

  const isLiked = useCallback(
    (hostelId: string | number) => {
      return likedIds.has(String(hostelId));
    },
    [likedIds]
  );

  const toggleLike = useCallback(
    async (hostelId: string | number): Promise<boolean> => {
      const idStr = String(hostelId);
      const currentlyLiked = likedIds.has(idStr);
      const nextLiked = !currentlyLiked;

      // Optimistic state update
      setLikedIds((prev) => {
        const updated = new Set(prev);
        if (nextLiked) updated.add(idStr);
        else updated.delete(idStr);

        if (typeof window !== 'undefined') {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(updated)));
          window.dispatchEvent(
            new CustomEvent('hg-hostel-like-changed', {
              detail: { hostelId: idStr, liked: nextLiked },
            })
          );
        }
        return updated;
      });

      try {
        const res = await toggleHostelLike(idStr);
        if (res && res.success) {
          return res.data.liked;
        }
        return nextLiked;
      } catch (err) {
        // Rollback on actual network/API error
        setLikedIds((prev) => {
          const rollback = new Set(prev);
          if (currentlyLiked) rollback.add(idStr);
          else rollback.delete(idStr);
          if (typeof window !== 'undefined') {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(rollback)));
          }
          return rollback;
        });
        return currentlyLiked;
      }
    },
    [likedIds]
  );

  return {
    likedIds,
    likedCount: likedIds.size,
    likedHostels,
    isLiked,
    toggleLike,
    refreshLikes,
    loading,
  };
}
