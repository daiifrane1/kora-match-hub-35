
import React, { useState } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import LeagueTable from '@/components/Standings/LeagueTable';
import { tournaments } from '@/data/tournamentsData';
import { egyptianLeagueStandings, laLigaStandings, premierLeagueStandings, ligue1Standings, serieAStandings, bundesligaStandings, saudiLeagueStandings } from '@/data/standingsData';

const leagueStandings: { [key: string]: any } = {
  'egy-league': { data: egyptianLeagueStandings, title: 'الدوري المصري' },
  'laliga': { data: laLigaStandings, title: 'الدوري الإسباني' },
  'premier-league': { data: premierLeagueStandings, title: 'الدوري الإنجليزي' },
  'ligue1': { data: ligue1Standings, title: 'الدوري الفرنسي' },
  'serie-a': { data: serieAStandings, title: 'الدوري الإيطالي' },
  'bundesliga': { data: bundesligaStandings, title: 'الدوري الألماني' },
  'saudi-league': { data: saudiLeagueStandings, title: 'الدوري السعودي' },
};

const Leagues = () => {
  const [selectedLeague, setSelectedLeague] = useState('egy-league');

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-2xl font-bold mb-6 text-kooora-dark">الدوريات والبطولات</h1>
          
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {tournaments.map((tournament) => (
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
              ))}
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
              {selectedLeague in leagueStandings ? (
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
