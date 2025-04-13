
import React, { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import { fetchLeagues, placeholderTournaments } from '@/data/tournamentsData';
import { Skeleton } from '@/components/ui/skeleton';

export interface Tournament {
  id: string;
  name: string;
  logo: string;
}

interface TournamentFilterProps {
  tournaments: Tournament[];
  selectedTournaments: string[];
  onToggleTournament: (id: string) => void;
}

const TournamentFilter: React.FC<TournamentFilterProps> = ({
  tournaments: propTournaments,
  selectedTournaments,
  onToggleTournament
}) => {
  const [apiTournaments, setApiTournaments] = useState<Tournament[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadTournaments = async () => {
      setIsLoading(true);
      try {
        const data = await fetchLeagues();
        setApiTournaments(data);
      } catch (error) {
        console.error("Error loading tournaments:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadTournaments();
  }, []);
  
  // Use API tournaments if available, otherwise use tournaments passed from props
  const displayTournaments = apiTournaments.length > 0 ? apiTournaments : propTournaments;

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="font-bold text-lg mb-4 border-b pb-2">تصفية حسب البطولة</h3>
      <div className="space-y-2">
        {isLoading ? (
          // Show skeletons while loading
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
