
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
      
    } catch (error) {
      console.error("Error loading match data:", error);
      
      // Set fallback data
      setApiLiveMatches(liveMatches);
      setApiUpcomingMatches(upcomingMatches);
      setApiFinishedMatches(finishedMatches);
      
      // Show appropriate error message
      if (error instanceof Error) {
        if (error.message.includes('No API key provided')) {
          toast({
            title: "مفتاح API مطلوب",
            description: "الرجاء إضافة مفتاح API في الإعدادات للحصول على البيانات المباشرة.",
            variant: "default",
          });
        } else {
          toast({
            title: "خطأ في تحميل البيانات",
            description: error.message,
            variant: "destructive",
          });
        }
      }
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
      title: "جاري التحديث",
      description: "يتم تحديث البيانات باستخدام المفتاح الجديد.",
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
