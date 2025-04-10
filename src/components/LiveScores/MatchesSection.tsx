
import React from 'react';
import MatchCard, { MatchInfo } from './MatchCard';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface MatchesSectionProps {
  title: string;
  matches: MatchInfo[];
  showMore?: boolean;
  link?: string;
  horizontal?: boolean;
  byLeague?: boolean;
}

// Group matches by league
const groupMatchesByLeague = (matches: MatchInfo[]) => {
  const grouped: Record<string, { league: { id: string; name: string; logo: string }, matches: MatchInfo[] }> = {};
  
  matches.forEach(match => {
    const leagueId = match.league.id;
    if (!grouped[leagueId]) {
      grouped[leagueId] = {
        league: match.league,
        matches: []
      };
    }
    grouped[leagueId].matches.push(match);
  });
  
  return Object.values(grouped);
};

const MatchesSection: React.FC<MatchesSectionProps> = ({ 
  title, 
  matches, 
  showMore = false,
  link = "/matches",
  horizontal = false,
  byLeague = false
}) => {
  const groupedMatches = byLeague ? groupMatchesByLeague(matches) : null;
  
  return (
    <div className="mb-8">
      {title && (
        <div className="flex justify-between items-center mb-4">
          <h2 className="section-title">{title}</h2>
          {showMore && (
            <Button variant="link" className="text-kooora-primary" asChild>
              <a href={link} className="flex items-center">
                المزيد
                <ChevronLeft className="h-4 w-4 mr-1 rtl:rotate-180" />
              </a>
            </Button>
          )}
        </div>
      )}
      
      {byLeague && groupedMatches ? (
        <div className="space-y-6">
          {groupedMatches.map((group) => (
            <div key={group.league.id} className="space-y-2">
              <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
                <img 
                  src={group.league.logo} 
                  alt={group.league.name} 
                  className="w-6 h-6 object-contain" 
                />
                <h3 className="font-medium text-base">{group.league.name}</h3>
              </div>
              
              <ScrollArea className="w-full">
                <div className="flex flex-nowrap overflow-x-auto pb-2 gap-4 w-max min-w-full">
                  {group.matches.map((match) => (
                    <div key={match.id} className="flex-shrink-0 w-[300px]">
                      <MatchCard match={match} />
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          ))}
        </div>
      ) : (
        <div className={`${horizontal ? "flex flex-nowrap overflow-x-auto pb-2 gap-4" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"}`}>
          {matches.map((match) => (
            <div key={match.id} className={horizontal ? "flex-shrink-0 w-[300px]" : ""}>
              <MatchCard match={match} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MatchesSection;
