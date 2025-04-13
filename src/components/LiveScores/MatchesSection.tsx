
import React from 'react';
import MatchCard, { MatchInfo } from './MatchCard';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface MatchesSectionProps {
  title: string;
  matches: MatchInfo[];
  logo?: string;
  showMore?: boolean;
  link?: string;
  horizontal?: boolean;
}

const MatchesSection: React.FC<MatchesSectionProps> = ({ 
  title, 
  matches,
  logo,
  showMore = false,
  link = "/matches",
  horizontal = false
}) => {
  return (
    <div className="mb-8">
      {title && (
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            {logo && (
              <img src={logo} alt={title} className="w-6 h-6 mr-2 rtl:ml-2 rtl:mr-0 object-contain" />
            )}
            <h2 className="section-title">{title}</h2>
          </div>
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
      
      {horizontal ? (
        <ScrollArea className="w-full pb-2">
          <div className="flex space-x-4 rtl:space-x-reverse pb-1 pr-1">
            {matches.map((match) => (
              <div key={match.id} className="flex-shrink-0 w-full min-w-[300px] max-w-[400px]">
                <MatchCard match={match} />
              </div>
            ))}
          </div>
        </ScrollArea>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {matches.map((match) => (
            <div key={match.id} className="w-full">
              <MatchCard match={match} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MatchesSection;
