
import { Tournament } from '@/components/LiveScores/TournamentFilter';

// Placeholder league logos
const leagueLogos = {
  egyptian: "/placeholder.svg",
  laLiga: "/placeholder.svg",
  premierLeague: "/placeholder.svg",
  ligue1: "/placeholder.svg",
  championsLeague: "/placeholder.svg",
  italianLeague: "/placeholder.svg",
  germanLeague: "/placeholder.svg",
  saudiLeague: "/placeholder.svg",
};

export const tournaments: Tournament[] = [
  {
    id: 'egy-league',
    name: 'الدوري المصري',
    logo: leagueLogos.egyptian,
  },
  {
    id: 'laliga',
    name: 'الدوري الإسباني',
    logo: leagueLogos.laLiga,
  },
  {
    id: 'premier-league',
    name: 'الدوري الإنجليزي',
    logo: leagueLogos.premierLeague,
  },
  {
    id: 'ligue1',
    name: 'الدوري الفرنسي',
    logo: leagueLogos.ligue1,
  },
  {
    id: 'serie-a',
    name: 'الدوري الإيطالي',
    logo: leagueLogos.italianLeague,
  },
  {
    id: 'bundesliga',
    name: 'الدوري الألماني',
    logo: leagueLogos.germanLeague,
  },
  {
    id: 'saudi-league',
    name: 'الدوري السعودي',
    logo: leagueLogos.saudiLeague,
  },
  {
    id: 'champions-league',
    name: 'دوري أبطال أوروبا',
    logo: leagueLogos.championsLeague,
  },
];
