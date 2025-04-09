
import React, { useState } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { tournaments } from '@/data/tournamentsData';

// Placeholder team data
const teamsData = [
  { id: 'ahly', name: 'الأهلي', logo: '/placeholder.svg', league: 'egy-league' },
  { id: 'zamalek', name: 'الزمالك', logo: '/placeholder.svg', league: 'egy-league' },
  { id: 'barcelona', name: 'برشلونة', logo: '/placeholder.svg', league: 'laliga' },
  { id: 'real-madrid', name: 'ريال مدريد', logo: '/placeholder.svg', league: 'laliga' },
  { id: 'man-city', name: 'مانشستر سيتي', logo: '/placeholder.svg', league: 'premier-league' },
  { id: 'liverpool', name: 'ليفربول', logo: '/placeholder.svg', league: 'premier-league' },
  { id: 'psg', name: 'باريس سان جيرمان', logo: '/placeholder.svg', league: 'ligue1' },
  { id: 'juventus', name: 'يوفنتوس', logo: '/placeholder.svg', league: 'serie-a' },
  { id: 'bayern', name: 'بايرن ميونخ', logo: '/placeholder.svg', league: 'bundesliga' },
  { id: 'alhilal', name: 'الهلال', logo: '/placeholder.svg', league: 'saudi-league' },
  { id: 'alnassr', name: 'النصر', logo: '/placeholder.svg', league: 'saudi-league' },
];

const Teams = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLeague, setSelectedLeague] = useState('all');
  
  const filteredTeams = teamsData.filter(team => {
    if (selectedLeague !== 'all' && team.league !== selectedLeague) return false;
    if (searchQuery && !team.name.includes(searchQuery)) return false;
    return true;
  });

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-2xl font-bold mb-6 text-kooora-dark">الفرق</h1>
          
          <div className="mb-6">
            <div className="relative flex w-full max-w-sm mx-auto mb-4">
              <Search className="absolute right-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="ابحث عن فريق..."
                className="pr-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Tabs defaultValue="all" className="w-full" onValueChange={setSelectedLeague}>
              <TabsList className="w-full flex flex-wrap mb-6 bg-gray-100 p-1 rounded-md">
                <TabsTrigger 
                  value="all" 
                  className="data-[state=active]:bg-kooora-primary data-[state=active]:text-white"
                >
                  الكل
                </TabsTrigger>
                {tournaments.map((tournament) => (
                  <TabsTrigger 
                    key={tournament.id}
                    value={tournament.id} 
                    className="data-[state=active]:bg-kooora-primary data-[state=active]:text-white"
                  >
                    {tournament.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredTeams.length > 0 ? (
              filteredTeams.map(team => (
                <div key={team.id} className="bg-white border border-gray-100 rounded-lg p-4 text-center hover:shadow-md transition-shadow">
                  <img 
                    src={team.logo} 
                    alt={team.name} 
                    className="w-16 h-16 object-contain mx-auto mb-2"
                  />
                  <h3 className="font-semibold text-kooora-dark">{team.name}</h3>
                  <p className="text-xs text-kooora-gray mt-1">
                    {tournaments.find(t => t.id === team.league)?.name}
                  </p>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-10 text-kooora-gray">
                <p className="text-lg">لا توجد فرق متطابقة مع بحثك</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Teams;
