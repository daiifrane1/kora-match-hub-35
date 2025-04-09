
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface TeamStanding {
  position: number;
  team: {
    id: string;
    name: string;
    logo: string;
  };
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
  form?: string[];
}

interface LeagueTableProps {
  title: string;
  standings: TeamStanding[];
}

const LeagueTable: React.FC<LeagueTableProps> = ({ title, standings }) => {
  return (
    <div className="mb-8">
      <h2 className="section-title mb-4">{title}</h2>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">#</TableHead>
              <TableHead>الفريق</TableHead>
              <TableHead className="text-center">لعب</TableHead>
              <TableHead className="text-center">فوز</TableHead>
              <TableHead className="text-center">تعادل</TableHead>
              <TableHead className="text-center">خسارة</TableHead>
              <TableHead className="text-center">له</TableHead>
              <TableHead className="text-center">عليه</TableHead>
              <TableHead className="text-center">نقاط</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {standings.map((team) => (
              <TableRow key={team.team.id}>
                <TableCell className="font-medium">{team.position}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <img 
                      src={team.team.logo} 
                      alt={team.team.name} 
                      className="w-5 h-5 object-contain"
                    />
                    <span>{team.team.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-center">{team.played}</TableCell>
                <TableCell className="text-center">{team.won}</TableCell>
                <TableCell className="text-center">{team.drawn}</TableCell>
                <TableCell className="text-center">{team.lost}</TableCell>
                <TableCell className="text-center">{team.goalsFor}</TableCell>
                <TableCell className="text-center">{team.goalsAgainst}</TableCell>
                <TableCell className="text-center font-bold">{team.points}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default LeagueTable;
