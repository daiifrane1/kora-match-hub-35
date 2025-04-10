
import React, { useRef } from 'react';
import MatchCard, { MatchInfo } from './MatchCard';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MatchesSectionProps {
  title: string;
  matches: MatchInfo[];
  showMore?: boolean;
  link?: string;
  horizontal?: boolean;
}

const MatchesSection: React.FC<MatchesSectionProps> = ({ 
  title, 
  matches, 
  showMore = false,
  link = "/matches",
  horizontal = false
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = 300; // Adjust as needed
      
      if (direction === 'left') {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

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
      
      {horizontal ? (
        <div className="relative">
          <div 
            className="flex flex-nowrap overflow-x-auto pb-2 gap-4 scrollbar-hide" 
            ref={scrollContainerRef}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {matches.length > 0 ? (
              matches.map((match) => (
                <div key={match.id} className="flex-shrink-0 w-[300px]">
                  <MatchCard match={match} />
                </div>
              ))
            ) : (
              <div className="flex-shrink-0 w-full text-center py-8 text-kooora-gray">
                <p>لا توجد مباريات متاحة</p>
              </div>
            )}
          </div>
          
          {matches.length > 3 && (
            <>
              <button 
                className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md z-10"
                onClick={() => handleScroll('right')}
                aria-label="التالي"
              >
                <ChevronRight className="h-5 w-5 text-kooora-primary" />
              </button>
              <button 
                className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md z-10"
                onClick={() => handleScroll('left')}
                aria-label="السابق"
              >
                <ChevronLeft className="h-5 w-5 text-kooora-primary" />
              </button>
            </>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {matches.length > 0 ? (
            matches.map((match) => (
              <div key={match.id}>
                <MatchCard match={match} />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-kooora-gray">
              <p>لا توجد مباريات متاحة</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MatchesSection;
