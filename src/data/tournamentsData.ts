import { Tournament } from '@/components/LiveScores/TournamentFilter';

// API configuration
const API_URL = "https://v3.football.api-sports.io";
const API_KEY_STORAGE_KEY = "football_api_key";

// Get API key from localStorage or use default
const getApiKey = (): string => {
  const storedKey = localStorage.getItem(API_KEY_STORAGE_KEY);
  return storedKey || ""; // Don't use default key
};

// Featured leagues to show by default (commonly followed leagues)
const featuredLeagueIds = [
  39,  // Premier League (England)
  140, // La Liga (Spain)
  61,  // Ligue 1 (France)
  78,  // Bundesliga (Germany)
  135, // Serie A (Italy)
  203, // Saudi Pro League
  233, // Egyptian Premier League
  2,   // UEFA Champions League
];

// Placeholder tournaments data (used while API data is loading)
export const placeholderTournaments: Tournament[] = [
  {
    id: '233',
    name: 'الدوري المصري',
    logo: '/placeholder.svg',
  },
  {
    id: '140',
    name: 'الدوري الإسباني',
    logo: '/placeholder.svg',
  },
  {
    id: '39',
    name: 'الدوري الإنجليزي',
    logo: '/placeholder.svg',
  },
  {
    id: '61',
    name: 'الدوري الفرنسي',
    logo: '/placeholder.svg',
  },
  {
    id: '135',
    name: 'الدوري الإيطالي',
    logo: '/placeholder.svg',
  },
  {
    id: '78',
    name: 'الدوري الألماني',
    logo: '/placeholder.svg',
  },
  {
    id: '203',
    name: 'الدوري السعودي',
    logo: '/placeholder.svg',
  },
  {
    id: '2',
    name: 'دوري أبطال أوروبا',
    logo: '/placeholder.svg',
  },
];

// Fetch leagues from the API
export const fetchLeagues = async (): Promise<Tournament[]> => {
  try {
    const apiKey = getApiKey();
    
    if (!apiKey) {
      console.log("No API key found, using placeholder data");
      return placeholderTournaments;
    }

    // Fetch current season information for each league
    const currentYear = new Date().getFullYear();
    const response = await fetch(`${API_URL}/leagues?current=true&season=${currentYear}`, {
      headers: {
        "x-rapidapi-key": apiKey,
        "x-rapidapi-host": "v3.football.api-sports.io"
      }
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.response || !Array.isArray(data.response)) {
      throw new Error("Invalid API response format");
    }
    
    // Filter leagues to only include featured ones and ensure they have current season
    const featuredLeagues = data.response
      .filter((league: any) => 
        featuredLeagueIds.includes(league.league?.id) &&
        league.seasons?.some((season: any) => season.current === true)
      )
      .map((league: any) => ({
        id: league.league?.id?.toString() || "unknown",
        name: getArabicLeagueName(league.league?.id, league.league?.name) || league.league?.name || "Unknown League",
        logo: league.league?.logo || "/placeholder.svg",
      }));
    
    // Return featured leagues if found, otherwise fallback to placeholder data
    return featuredLeagues.length > 0 ? featuredLeagues : placeholderTournaments;
  } catch (error) {
    console.error("Error fetching leagues:", error);
    return placeholderTournaments;
  }
};

// Helper function to get Arabic league names
const getArabicLeagueName = (id: number, fallbackName: string): string => {
  const arabicNames: Record<number, string> = {
    39: 'الدوري الإنجليزي',
    140: 'الدوري الإسباني',
    61: 'الدوري الفرنسي',
    78: 'الدوري الألماني',
    135: 'الدوري الإيطالي',
    183: 'الدوري البرتغالي',
    203: 'الدوري السعودي',
    233: 'الدوري المصري',
    2: 'دوري أبطال أوروبا',
  };
  
  return arabicNames[id] || fallbackName;
};

// Use placeholder data as default export (for backward compatibility)
export const tournaments = placeholderTournaments;
