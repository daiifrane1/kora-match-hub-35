
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Check } from 'lucide-react';
import MatchesSection from './MatchesSection';
import { MatchInfo } from './MatchCard';
import { Skeleton } from '@/components/ui/skeleton';

interface MatchTabsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  liveMatches: MatchInfo[];
  upcomingMatches: MatchInfo[];
  finishedMatches: MatchInfo[];
  isLoading: boolean;
  selectedTournaments: string[];
}

const MatchTabs: React.FC<MatchTabsProps> = ({
  activeTab,
  setActiveTab,
  liveMatches,
  upcomingMatches,
  finishedMatches,
  isLoading,
  selectedTournaments
}) => {
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
        ) : filterMatches(liveMatches).length > 0 ? (
          <div className="bg-white rounded-lg">
            <MatchesSection
              title=""
              matches={filterMatches(liveMatches)}
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
              matches={filterMatches(upcomingMatches)}
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
              matches={filterMatches(finishedMatches)}
              showMore={false}
              horizontal={true}
            />
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
};

export default MatchTabs;
