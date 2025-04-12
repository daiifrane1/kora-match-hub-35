
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const MatchesSkeletons: React.FC = () => {
  return (
    <>
      {Array(2).fill(0).map((_, leagueIndex) => (
        <div key={leagueIndex} className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <Skeleton className="h-6 w-40" />
          </div>
          <div className="flex flex-nowrap overflow-x-auto pb-2 gap-4">
            {Array(4).fill(0).map((_, matchIndex) => (
              <div key={matchIndex} className="match-item flex-shrink-0 w-[300px]">
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
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default MatchesSkeletons;
