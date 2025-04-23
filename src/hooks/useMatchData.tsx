
import { useState, useEffect } from 'react';
import { MatchInfo } from '@/components/LiveScores/MatchCard';
import { 
  fetchLiveMatches, 
  fetchTodayMatches, 
  fetchFinishedMatches 
} from '@/services/matchesApi';
import { liveMatches, upcomingMatches, finishedMatches } from '@/data/matchesData';
import { useToast } from "@/hooks/use-toast";

export function useMatchData() {
  const [apiLiveMatches, setApiLiveMatches] = useState<MatchInfo[]>([]);
  const [apiUpcomingMatches, setApiUpcomingMatches] = useState<MatchInfo[]>([]);
  const [apiFinishedMatches, setApiFinishedMatches] = useState<MatchInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const loadMatchData = async () => {
    setIsLoading(true);
    try {
      const [liveData, upcomingData, finishedData] = await Promise.all([
        fetchLiveMatches(),
        fetchTodayMatches(),
        fetchFinishedMatches()
      ]);
      
      setApiLiveMatches(liveData.length > 0 ? liveData : liveMatches);
      setApiUpcomingMatches(upcomingData.length > 0 ? upcomingData : upcomingMatches);
      setApiFinishedMatches(finishedData.length > 0 ? finishedData : finishedMatches);
      
      if (liveData.length === 0 && upcomingData.length === 0 && finishedData.length === 0) {
        toast({
          title: "استخدام بيانات تجريبية",
          description: "يتم استخدام بيانات تجريبية حاليًا. تحقق من مفتاح API للحصول على بيانات حقيقية.",
          variant: "default",
        });
      }
    } catch (error) {
      console.error("Error loading match data:", error);
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

  const handleApiKeyChange = () => {
    loadMatchData();
    toast({
      title: "تم تحديث مفتاح API",
      description: "جاري تحديث البيانات باستخدام المفتاح الجديد.",
    });
  };

  return {
    apiLiveMatches,
    apiUpcomingMatches,
    apiFinishedMatches,
    isLoading,
    handleApiKeyChange
  };
}
