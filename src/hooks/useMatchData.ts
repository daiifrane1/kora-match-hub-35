
import { useState, useEffect } from 'react';
import { MatchInfo } from '@/components/LiveScores/MatchCard';
import { fetchLiveMatches, fetchTodayMatches, fetchFinishedMatches } from '@/services/matchesApi';
import { liveMatches, upcomingMatches, finishedMatches } from '@/data/matchesData';
import { useToast } from "@/hooks/use-toast";

export const useMatchData = () => {
  const [apiLiveMatches, setApiLiveMatches] = useState<MatchInfo[]>([]);
  const [apiUpcomingMatches, setApiUpcomingMatches] = useState<MatchInfo[]>([]);
  const [apiFinishedMatches, setApiFinishedMatches] = useState<MatchInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const loadMatchData = async () => {
    setIsLoading(true);
    try {
      // Try to fetch data from API
      const [liveData, upcomingData, finishedData] = await Promise.all([
        fetchLiveMatches(),
        fetchTodayMatches(),
        fetchFinishedMatches()
      ]);
      
      // If we have API data, use it. Otherwise, fall back to static data
      setApiLiveMatches(liveData.length > 0 ? liveData : liveMatches);
      setApiUpcomingMatches(upcomingData.length > 0 ? upcomingData : upcomingMatches);
      setApiFinishedMatches(finishedData.length > 0 ? finishedData : finishedMatches);
      
      if (liveData.length === 0 && upcomingData.length === 0 && finishedData.length === 0) {
        // If all API calls returned empty, we're likely using mock data
        toast({
          title: "استخدام بيانات تجريبية",
          description: "يتم استخدام بيانات تجريبية حاليًا. أضف مفتاح API للحصول على بيانات حقيقية.",
          variant: "default",
        });
      }
    } catch (error) {
      console.error("Error loading match data:", error);
      // Fall back to static data
      setApiLiveMatches(liveMatches);
      setApiUpcomingMatches(upcomingMatches);
      setApiFinishedMatches(finishedMatches);
      
      toast({
        title: "خطأ في تحميل البيانات",
        description: "حدث خطأ أثناء تحميل بيانات المباريات. يتم استخدام بيانات تجريبية بدلاً من ذلك.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMatchData();
  }, []);

  return {
    liveMatches: apiLiveMatches,
    upcomingMatches: apiUpcomingMatches,
    finishedMatches: apiFinishedMatches,
    isLoading,
    loadMatchData
  };
};
