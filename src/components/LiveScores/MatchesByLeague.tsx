
import React from 'react';
import { MatchInfo } from './MatchCard';
import MatchesSection from './MatchesSection';
import { groupMatchesByLeague } from '@/services/matchesApi';

interface MatchesByLeagueProps {
  matches: MatchInfo[];
  selectedTournaments: string[];
}

const MatchesByLeague: React.FC<MatchesByLeagueProps> = ({ matches, selectedTournaments }) => {
  const filterMatches = (matches: MatchInfo[]) => {
    if (selectedTournaments.length === 0) return matches;
    return matches.filter(match => 
      selectedTournaments.includes(match.league.id)
    );
  };

  const filteredMatches = filterMatches(matches);
  
  if (filteredMatches.length === 0) {
    return (
      <div className="text-center py-10 text-kooora-gray">
        <p className="text-lg">لا توجد مباريات متاحة</p>
      </div>
    );
  }

  const matchesByLeague = groupMatchesByLeague(filteredMatches);
  
  return (
    <>
      {Object.entries(matchesByLeague).map(([leagueId, leagueMatches]) => {
        const { name, logo } = leagueMatches[0].league;
        
        return (
          <div key={leagueId} className="mb-8">
            <MatchesSection
              title={name}
              logo={logo}
              matches={leagueMatches}
              showMore={false}
              horizontal={true}
            />
          </div>
        );
      })}
    </>
  );
};

export default MatchesByLeague;
