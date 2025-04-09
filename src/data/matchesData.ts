
import { MatchInfo } from '@/components/LiveScores/MatchCard';

// Placeholder team logos
const teamLogos = {
  alAhly: "/placeholder.svg",
  zamalek: "/placeholder.svg",
  pyramids: "/placeholder.svg",
  alMasry: "/placeholder.svg",
  smouha: "/placeholder.svg",
  enppi: "/placeholder.svg",
  realMadrid: "/placeholder.svg",
  barcelona: "/placeholder.svg",
  atleticoMadrid: "/placeholder.svg",
  sevilla: "/placeholder.svg",
  manchesterCity: "/placeholder.svg",
  liverpool: "/placeholder.svg",
  manchesterUnited: "/placeholder.svg",
  chelsea: "/placeholder.svg",
  psg: "/placeholder.svg",
  marseille: "/placeholder.svg",
  lyon: "/placeholder.svg",
  monaco: "/placeholder.svg",
};

// Placeholder league logos
const leagueLogos = {
  egyptian: "/placeholder.svg",
  laLiga: "/placeholder.svg",
  premierLeague: "/placeholder.svg",
  ligue1: "/placeholder.svg",
  championsLeague: "/placeholder.svg",
};

export const liveMatches: MatchInfo[] = [
  {
    id: 'live1',
    homeTeam: {
      id: 'team1',
      name: 'الأهلي',
      logo: teamLogos.alAhly,
      score: 2,
    },
    awayTeam: {
      id: 'team2',
      name: 'الزمالك',
      logo: teamLogos.zamalek,
      score: 1,
    },
    time: '75\'',
    status: 'live',
    league: {
      id: 'league1',
      name: 'الدوري المصري',
      logo: leagueLogos.egyptian,
    },
  },
  {
    id: 'live2',
    homeTeam: {
      id: 'team3',
      name: 'ريال مدريد',
      logo: teamLogos.realMadrid,
      score: 3,
    },
    awayTeam: {
      id: 'team4',
      name: 'برشلونة',
      logo: teamLogos.barcelona,
      score: 3,
    },
    time: '60\'',
    status: 'live',
    league: {
      id: 'league2',
      name: 'الدوري الإسباني',
      logo: leagueLogos.laLiga,
    },
  },
  {
    id: 'live3',
    homeTeam: {
      id: 'team5',
      name: 'مانشستر سيتي',
      logo: teamLogos.manchesterCity,
      score: 1,
    },
    awayTeam: {
      id: 'team6',
      name: 'ليفربول',
      logo: teamLogos.liverpool,
      score: 0,
    },
    time: '30\'',
    status: 'live',
    league: {
      id: 'league3',
      name: 'الدوري الإنجليزي',
      logo: leagueLogos.premierLeague,
    },
  },
];

export const upcomingMatches: MatchInfo[] = [
  {
    id: 'upcoming1',
    homeTeam: {
      id: 'team7',
      name: 'تشيلسي',
      logo: teamLogos.chelsea,
    },
    awayTeam: {
      id: 'team8',
      name: 'مانشستر يونايتد',
      logo: teamLogos.manchesterUnited,
    },
    time: '21:00',
    status: 'upcoming',
    league: {
      id: 'league3',
      name: 'الدوري الإنجليزي',
      logo: leagueLogos.premierLeague,
    },
    matchDay: 'اليوم',
  },
  {
    id: 'upcoming2',
    homeTeam: {
      id: 'team9',
      name: 'باريس سان جيرمان',
      logo: teamLogos.psg,
    },
    awayTeam: {
      id: 'team10',
      name: 'مارسيليا',
      logo: teamLogos.marseille,
    },
    time: '22:00',
    status: 'upcoming',
    league: {
      id: 'league4',
      name: 'الدوري الفرنسي',
      logo: leagueLogos.ligue1,
    },
    matchDay: 'اليوم',
  },
  {
    id: 'upcoming3',
    homeTeam: {
      id: 'team11',
      name: 'أتلتيكو مدريد',
      logo: teamLogos.atleticoMadrid,
    },
    awayTeam: {
      id: 'team12',
      name: 'إشبيلية',
      logo: teamLogos.sevilla,
    },
    time: '19:30',
    status: 'upcoming',
    league: {
      id: 'league2',
      name: 'الدوري الإسباني',
      logo: leagueLogos.laLiga,
    },
    matchDay: 'غداً',
  },
  {
    id: 'upcoming4',
    homeTeam: {
      id: 'team13',
      name: 'الإسماعيلي',
      logo: teamLogos.enppi,
    },
    awayTeam: {
      id: 'team14',
      name: 'بيراميدز',
      logo: teamLogos.pyramids,
    },
    time: '17:00',
    status: 'upcoming',
    league: {
      id: 'league1',
      name: 'الدوري المصري',
      logo: leagueLogos.egyptian,
    },
    matchDay: 'غداً',
  },
];

export const finishedMatches: MatchInfo[] = [
  {
    id: 'finished1',
    homeTeam: {
      id: 'team15',
      name: 'المصري',
      logo: teamLogos.alMasry,
      score: 0,
    },
    awayTeam: {
      id: 'team16',
      name: 'سموحة',
      logo: teamLogos.smouha,
      score: 0,
    },
    time: 'انتهت',
    status: 'finished',
    league: {
      id: 'league1',
      name: 'الدوري المصري',
      logo: leagueLogos.egyptian,
    },
  },
  {
    id: 'finished2',
    homeTeam: {
      id: 'team17',
      name: 'ليون',
      logo: teamLogos.lyon,
      score: 2,
    },
    awayTeam: {
      id: 'team18',
      name: 'موناكو',
      logo: teamLogos.monaco,
      score: 1,
    },
    time: 'انتهت',
    status: 'finished',
    league: {
      id: 'league4',
      name: 'الدوري الفرنسي',
      logo: leagueLogos.ligue1,
    },
  },
];
