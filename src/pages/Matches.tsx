
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Check } from 'lucide-react';
import ApiKeyModal from '@/components/Settings/ApiKeyModal';
import TournamentFilter from '@/components/LiveScores/TournamentFilter';
import { placeholderTournaments, fetchLeagues } from '@/data/tournamentsData';
import { useMatchData } from '@/hooks/useMatchData';
import MatchesTabContent from '@/components/LiveScores/MatchesTabContent';
import MatchesPagination from '@/components/LiveScores/MatchesPagination';
import { Tournament } from '@/components/LiveScores/TournamentFilter';

const Matches = () => {
  const [activeTab, setActiveTab] = useState("live");
  const [selectedTournaments, setSelectedTournaments] = useState<string[]>([]);
  const [tournaments, setTournaments] = useState<Tournament[]>(placeholderTournaments);
  const { 
    apiLiveMatches, 
    apiUpcomingMatches, 
    apiFinishedMatches, 
    isLoading, 
    handleApiKeyChange 
  } = useMatchData();

  useEffect(() => {
    const loadTournaments = async () => {
      try {
        const data = await fetchLeagues();
        setTournaments(data);
      } catch (error) {
        console.error("Error loading tournaments:", error);
      }
    };
    
    loadTournaments();
  }, []);

  const handleToggleTournament = (id: string) => {
    setSelectedTournaments(prev => 
      prev.includes(id) 
        ? prev.filter(t => t !== id) 
        : [...prev, id]
    );
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
                
                <MatchesTabContent 
                  tabId="live"
                  matches={apiLiveMatches}
                  isLoading={isLoading}
                  selectedTournaments={selectedTournaments}
                />
                
                <MatchesTabContent 
                  tabId="upcoming"
                  matches={apiUpcomingMatches}
                  isLoading={isLoading}
                  selectedTournaments={selectedTournaments}
                />
                
                <MatchesTabContent 
                  tabId="finished"
                  matches={apiFinishedMatches}
                  isLoading={isLoading}
                  selectedTournaments={selectedTournaments}
                />
              </Tabs>
            </div>
            
            {activeTab !== "live" && !isLoading && (
              <MatchesPagination />
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Matches;
