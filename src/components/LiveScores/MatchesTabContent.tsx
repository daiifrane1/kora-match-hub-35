
import React from 'react';
import { TabsContent } from "@/components/ui/tabs";
import MatchesByLeague from './MatchesByLeague';
import MatchesSkeletons from './MatchesSkeletons';
import { MatchInfo } from './MatchCard';

interface MatchesTabContentProps {
  tabId: string;
  matches: MatchInfo[];
  isLoading: boolean;
  selectedTournaments: string[];
}

const MatchesTabContent: React.FC<MatchesTabContentProps> = ({ 
  tabId, 
  matches, 
  isLoading, 
  selectedTournaments 
}) => {
  return (
    <TabsContent value={tabId} className="mt-2">
      {isLoading ? (
        <MatchesSkeletons />
      ) : (
        <MatchesByLeague 
          matches={matches} 
          selectedTournaments={selectedTournaments} 
        />
      )}
    </TabsContent>
  );
};

export default MatchesTabContent;
