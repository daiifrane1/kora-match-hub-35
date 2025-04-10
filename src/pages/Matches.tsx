
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import MatchesSection from '@/components/LiveScores/MatchesSection';
import { liveMatches, upcomingMatches, finishedMatches } from '@/data/matchesData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Check } from 'lucide-react';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { fetchLiveMatches, fetchTodayMatches, fetchFinishedMatches } from '@/services/matchesApi';
import { MatchInfo } from '@/components/LiveScores/MatchCard';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from "@/components/ui/use-toast";
import ApiKeyModal from '@/components/Settings/ApiKeyModal';
import TournamentFilter from '@/components/LiveScores/TournamentFilter';
import { tournaments } from '@/data/tournamentsData';

const Matches = () => {
  const [activeTab, setActiveTab] = useState("live");
  const [apiLiveMatches, setApiLiveMatches] = useState<MatchInfo[]>([]);
  const [apiUpcomingMatches, setApiUpcomingMatches] = useState<MatchInfo[]>([]);
  const [apiFinishedMatches, setApiFinishedMatches] = useState<MatchInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTournaments, setSelectedTournaments] = useState<string[]>([]);
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

  // Handle API key change
  const handleApiKeyChange = () => {
    loadMatchData();
    toast({
      title: "تم تحديث مفتاح API",
      description: "جاري تحديث البيانات باستخدام المفتاح الجديد.",
    });
  };

  // Toggle tournament filter
  const handleToggleTournament = (id: string) => {
    setSelectedTournaments(prev => 
      prev.includes(id) 
        ? prev.filter(t => t !== id) 
        : [...prev, id]
    );
  };

  // Filter matches by selected tournaments
  const filterMatches = (matches: MatchInfo[]) => {
    if (selectedTournaments.length === 0) return matches;
    return matches.filter(match => 
      selectedTournaments.includes(match.league.id)
    );
  };

  // Render loading skeletons while data is being fetched
  const renderSkeletons = () => {
    return Array(6).fill(0).map((_, index) => (
      <div key={index} className="match-item flex-shrink-0 w-[300px]">
        <div className="bg-white rounded-lg shadow p-4">
          <Skeleton className="h-4 w-1/3 mb-3" />
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-4 w-12" />
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-1/4">
            <div className="sticky top-24">
              <TournamentFilter 
                tournaments={tournaments} 
                selectedTournaments={selectedTournaments}
                onToggleTournament={handleToggleTournament}
              />
            </div>
          </div>
          
          <div className="lg:w-3/4">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-kooora-dark">جدول المباريات</h1>
                <ApiKeyModal onApiKeyChange={handleApiKeyChange} />
              </div>
              
              <Tabs defaultValue="live" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="w-full flex mb-6 bg-gray-100 p-1 rounded-md">
                  <TabsTrigger 
                    value="live" 
                    className="flex-1 data-[state=active]:bg-kooora-primary data-[state=active]:text-white"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>مباريات مباشرة</span>
                    </div>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="upcoming" 
                    className="flex-1 data-[state=active]:bg-kooora-primary data-[state=active]:text-white"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>مباريات اليوم</span>
                    </div>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="finished" 
                    className="flex-1 data-[state=active]:bg-kooora-primary data-[state=active]:text-white"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Check className="w-4 h-4" />
                      <span>نتائج المباريات</span>
                    </div>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="live" className="mt-2">
                  {isLoading ? (
                    <div className="flex flex-nowrap overflow-x-auto pb-2 gap-4">
                      {renderSkeletons()}
                    </div>
                  ) : filterMatches(apiLiveMatches).length > 0 ? (
                    <div className="bg-white rounded-lg">
                      <MatchesSection
                        title=""
                        matches={filterMatches(apiLiveMatches)}
                        showMore={false}
                        horizontal={true}
                      />
                    </div>
                  ) : (
                    <div className="text-center py-10 text-kooora-gray">
                      <p className="text-lg">لا توجد مباريات مباشرة حالياً</p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="upcoming" className="mt-2">
                  {isLoading ? (
                    <div className="flex flex-nowrap overflow-x-auto pb-2 gap-4">
                      {renderSkeletons()}
                    </div>
                  ) : (
                    <div className="bg-white rounded-lg">
                      <MatchesSection
                        title=""
                        matches={filterMatches(apiUpcomingMatches)}
                        showMore={false}
                        horizontal={true}
                      />
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="finished" className="mt-2">
                  {isLoading ? (
                    <div className="flex flex-nowrap overflow-x-auto pb-2 gap-4">
                      {renderSkeletons()}
                    </div>
                  ) : (
                    <div className="bg-white rounded-lg">
                      <MatchesSection
                        title=""
                        matches={filterMatches(apiFinishedMatches)}
                        showMore={false}
                        horizontal={true}
                      />
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
            
            {activeTab !== "live" && !isLoading && (
              <div className="mt-6 flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" className="rtl:rotate-180" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive>1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" className="rtl:rotate-180" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Matches;
