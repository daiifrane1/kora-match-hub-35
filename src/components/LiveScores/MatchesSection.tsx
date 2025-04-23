
import React from 'react';
import MatchCard, { MatchInfo } from './MatchCard';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

interface MatchesSectionProps {
  title: string;
  matches: MatchInfo[];
  showMore?: boolean;
  link?: string;
}

const MatchesSection: React.FC<MatchesSectionProps> = ({ 
  title, 
  matches, 
  showMore = false,
  link = "/matches" 
}) => {
  return (
    <div className="mb-8">
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {matches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </div>
  );
};

export default MatchesSection;
