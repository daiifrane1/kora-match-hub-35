
import React from 'react';
import { Check } from 'lucide-react';

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
  tournaments,
  selectedTournaments,
  onToggleTournament
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="font-bold text-lg mb-4 border-b pb-2">تصفية حسب البطولة</h3>
      <div className="space-y-2">
        {tournaments.map((tournament) => (
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
        ))}
      </div>
    </div>
  );
};

export default TournamentFilter;
