import { useState, useEffect, useCallback } from 'react';
import { getHostelResidents, HostelResident } from '@/lib/api/hostels';

export function useHostelResidents(hostelId?: string) {
  const [residents, setResidents] = useState<HostelResident[]>([]);
  const [loading, setLoading] = useState<boolean>(Boolean(hostelId));
  const [error, setError] = useState<string | null>(null);

  const fetchResidents = useCallback(async () => {
    if (!hostelId) return;
    try {
      setLoading(true);
      setError(null);
      const res = await getHostelResidents(hostelId);
      setResidents(res.data || []);
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Failed to fetch residents';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [hostelId]);

  useEffect(() => {
    if (hostelId) {
      fetchResidents();
    }
  }, [hostelId, fetchResidents]);

  return { residents, loading, error, refetch: fetchResidents };
}
