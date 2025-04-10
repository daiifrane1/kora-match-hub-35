
import React, { useState } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import { useMatchData } from '@/hooks/useMatchData';
import { tournaments } from '@/data/tournamentsData';
import TournamentFilter from '@/components/LiveScores/TournamentFilter';
import MatchTabs from '@/components/LiveScores/MatchTabs';
import MatchPagination from '@/components/LiveScores/MatchPagination';
import MatchesHeader from '@/components/LiveScores/MatchesHeader';

const Matches = () => {
  const [activeTab, setActiveTab] = useState("live");
  const [selectedTournaments, setSelectedTournaments] = useState<string[]>([]);
  const { liveMatches, upcomingMatches, finishedMatches, isLoading, loadMatchData } = useMatchData();

  // Toggle tournament filter
  const handleToggleTournament = (id: string) => {
    setSelectedTournaments(prev => 
      prev.includes(id) 
        ? prev.filter(t => t !== id) 
        : [...prev, id]
    );
  };

  // Handle API key change
  const handleApiKeyChange = () => {
    loadMatchData();
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
              <MatchesHeader onApiKeyChange={handleApiKeyChange} />
              
              <MatchTabs 
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                liveMatches={liveMatches}
                upcomingMatches={upcomingMatches}
                finishedMatches={finishedMatches}
                isLoading={isLoading}
                selectedTournaments={selectedTournaments}
              />
            </div>
            
            <MatchPagination 
              activeTab={activeTab}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Matches;
