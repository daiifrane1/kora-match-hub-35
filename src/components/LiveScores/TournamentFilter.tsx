
import React, { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import { fetchLeagues, placeholderTournaments } from '@/data/tournamentsData';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MatchInfo } from './MatchCard';

export interface Tournament {
  id: string;
  name: string;
  logo: string;
}

interface TournamentFilterProps {
  tournaments: Tournament[];
  selectedTournaments: string[];
  onToggleTournament: (id: string) => void;
  matches: MatchInfo[]; // Add matches prop
}

const TournamentFilter: React.FC<TournamentFilterProps> = ({
  tournaments: propTournaments,
  selectedTournaments,
  onToggleTournament,
  matches
}) => {
  const [apiTournaments, setApiTournaments] = useState<Tournament[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const loadTournaments = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchLeagues();
        setApiTournaments(data);
      } catch (error) {
        console.error("Error loading tournaments:", error);
        setError("فشل تحميل البطولات. يرجى التحقق من مفتاح API الخاص بك.");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadTournaments();
  }, []);
  
  // Filter tournaments to only show those that have matches today
  const todaysTournaments = (displayTournaments: Tournament[]) => {
    const todayLeagueIds = new Set(matches.map(match => match.league.id));
    return displayTournaments.filter(tournament => todayLeagueIds.has(tournament.id));
  };

  // Use API tournaments if available, otherwise use tournaments passed from props
  const availableTournaments = apiTournaments.length > 0 ? apiTournaments : propTournaments;
  const displayTournaments = todaysTournaments(availableTournaments);

  if (displayTournaments.length === 0 && !isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="font-bold text-lg mb-4 border-b pb-2">تصفية حسب البطولة</h3>
        <p className="text-center text-kooora-gray">لا توجد بطولات اليوم</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="font-bold text-lg mb-4 border-b pb-2">تصفية حسب البطولة</h3>
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="space-y-2">
        {isLoading ? (
          Array(8).fill(0).map((_, index) => (
            <div key={index} className="flex items-center justify-between p-2">
              <div className="flex items-center">
                <Skeleton className="w-6 h-6 rounded-full mr-3 rtl:ml-3 rtl:mr-0" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          ))
        ) : (
          displayTournaments.map((tournament) => (
            <div 
              key={tournament.id}
              className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer"
              onClick={() => onToggleTournament(tournament.id)}
            >
              <div className="flex items-center">
                <img 
                  src={tournament.logo} 
                  alt={tournament.name} 
                  className="w-6 h-6 object-contain mr-3 rtl:ml-3 rtl:mr-0" 
                />
                <span>{tournament.name}</span>
              </div>
              {selectedTournaments.includes(tournament.id) && (
                <Check className="w-4 h-4 text-kooora-primary" />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TournamentFilter;
