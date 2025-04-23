
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import LeagueTable from '@/components/Standings/LeagueTable';
import { fetchLeagues, placeholderTournaments } from '@/data/tournamentsData';
import { egyptianLeagueStandings, laLigaStandings, premierLeagueStandings, ligue1Standings, serieAStandings, bundesligaStandings, saudiLeagueStandings } from '@/data/standingsData';
import { Tournament } from '@/components/LiveScores/TournamentFilter';
import { Skeleton } from '@/components/ui/skeleton';

const leagueStandings: { [key: string]: any } = {
  '233': { data: egyptianLeagueStandings, title: 'الدوري المصري' },
  '140': { data: laLigaStandings, title: 'الدوري الإسباني' },
  '39': { data: premierLeagueStandings, title: 'الدوري الإنجليزي' },
  '61': { data: ligue1Standings, title: 'الدوري الفرنسي' },
  '135': { data: serieAStandings, title: 'الدوري الإيطالي' },
  '78': { data: bundesligaStandings, title: 'الدوري الألماني' },
  '203': { data: saudiLeagueStandings, title: 'الدوري السعودي' },
};

const Leagues = () => {
  const [selectedLeague, setSelectedLeague] = useState('233');
  const [tournaments, setTournaments] = useState<Tournament[]>(placeholderTournaments);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTournaments = async () => {
      setIsLoading(true);
      try {
        const data = await fetchLeagues();
        setTournaments(data);
        // Set the first tournament as selected if available
        if (data.length > 0 && !selectedLeague) {
          setSelectedLeague(data[0].id);
        }
      } catch (error) {
        console.error("Error loading tournaments:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadTournaments();
  }, []);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-2xl font-bold mb-6 text-kooora-dark">الدوريات والبطولات</h1>
          
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {isLoading ? (
                // Show skeletons while loading
                Array(8).fill(0).map((_, index) => (
                  <Skeleton key={index} className="h-10 w-32" />
                ))
              ) : (
                tournaments.map((tournament) => (
                  <Button
                    key={tournament.id}
                    variant={selectedLeague === tournament.id ? "default" : "outline"}
                    className={selectedLeague === tournament.id ? "bg-kooora-primary text-white" : "text-kooora-dark"}
                    onClick={() => setSelectedLeague(tournament.id)}
                  >
                    <div className="flex items-center gap-2">
                      <img 
                        src={tournament.logo} 
                        alt={tournament.name} 
                        className="h-5 w-5 object-contain"
                      />
                      <span>{tournament.name}</span>
                    </div>
                  </Button>
                ))
              )}
            </div>
          </div>
          
          <Tabs defaultValue="standings" className="w-full">
            <TabsList className="w-full max-w-md mx-auto flex mb-6 bg-gray-100 p-1 rounded-md">
              <TabsTrigger 
                value="standings" 
                className="flex-1 data-[state=active]:bg-kooora-primary data-[state=active]:text-white"
              >
                الترتيب
              </TabsTrigger>
              <TabsTrigger 
                value="results" 
                className="flex-1 data-[state=active]:bg-kooora-primary data-[state=active]:text-white"
              >
                النتائج
              </TabsTrigger>
              <TabsTrigger 
                value="schedule" 
                className="flex-1 data-[state=active]:bg-kooora-primary data-[state=active]:text-white"
              >
                الجدول
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="standings" className="mt-2">
              {isLoading ? (
                <div className="space-y-2">
                  {Array(12).fill(0).map((_, index) => (
                    <Skeleton key={index} className="h-10 w-full" />
                  ))}
                </div>
              ) : selectedLeague in leagueStandings ? (
                <LeagueTable 
                  title={leagueStandings[selectedLeague].title}
                  standings={leagueStandings[selectedLeague].data}
                />
              ) : (
                <div className="text-center py-10 text-kooora-gray">
                  <p className="text-lg">لا توجد بيانات متاحة للدوري المحدد</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="results" className="mt-2">
              <div className="text-center py-10 text-kooora-gray">
                <p className="text-lg">سيتم إضافة نتائج المباريات قريباً</p>
              </div>
            </TabsContent>
            
            <TabsContent value="schedule" className="mt-2">
              <div className="text-center py-10 text-kooora-gray">
                <p className="text-lg">سيتم إضافة جدول المباريات قريباً</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

export default Leagues;
