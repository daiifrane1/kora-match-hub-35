
import React from 'react';
import { Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';

export interface TeamInfo {
  id: string;
  name: string;
  logo: string;
  score?: number;
}

export interface MatchInfo {
  id: string;
  homeTeam: TeamInfo;
  awayTeam: TeamInfo;
  time: string;
  status: 'upcoming' | 'live' | 'finished';
  league: {
    id: string;
    name: string;
    logo: string;
  };
  matchDay?: string;
}

const MatchCard: React.FC<{ match: MatchInfo }> = ({ match }) => {
  const { homeTeam, awayTeam, time, status, league } = match;

  return (
    <Card className="match-card w-full">
      {/* League Header */}
      <div className="bg-gray-100 p-2 flex items-center justify-between">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <img 
            src={league.logo} 
            alt={league.name} 
            className="w-5 h-5 object-contain" 
          />
          <span className="text-xs font-medium">{league.name}</span>
        </div>
        {match.matchDay && (
          <span className="text-xs text-kooora-gray">{match.matchDay}</span>
        )}
      </div>

      {/* Match Content */}
      <div className="p-3">
        <div className="flex items-center justify-between">
          {/* Home Team */}
          <div className="flex items-center space-x-2 rtl:space-x-reverse flex-1">
            <img 
              src={homeTeam.logo} 
              alt={homeTeam.name} 
              className="team-logo" 
            />
            <span className="font-medium">{homeTeam.name}</span>
          </div>

          {/* Score/Time */}
          <div className="flex flex-col items-center mx-2 min-w-16">
            {status === 'live' ? (
              <>
                <div className="flex space-x-1 rtl:space-x-reverse text-lg font-bold">
                  <span>{homeTeam.score}</span>
                  <span>-</span>
                  <span>{awayTeam.score}</span>
                </div>
                <span className="live-indicator">مباشر</span>
              </>
            ) : status === 'finished' ? (
              <div className="flex space-x-1 rtl:space-x-reverse text-lg font-bold">
                <span>{homeTeam.score}</span>
                <span>-</span>
                <span>{awayTeam.score}</span>
              </div>
            ) : (
              <div className="flex items-center text-kooora-gray text-sm">
                <Clock className="h-3 w-3 mr-1 rtl:ml-1 rtl:mr-0" />
                <span>{time}</span>
              </div>
            )}
          </div>

          {/* Away Team */}
          <div className="flex items-center space-x-2 rtl:space-x-reverse flex-1 flex-row-reverse">
            <img 
              src={awayTeam.logo} 
              alt={awayTeam.name} 
              className="team-logo" 
            />
            <span className="font-medium">{awayTeam.name}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MatchCard;
