
import { MatchInfo } from "@/components/LiveScores/MatchCard";

// API configuration
const API_URL = "https://v3.football.api-sports.io";
const API_KEY_STORAGE_KEY = "football_api_key";
const DEFAULT_API_KEY = "e8bccb552ecaed0a24a791db83129298"; // Default key provided

// Get API key from localStorage or use default
const getApiKey = (): string => {
  return localStorage.getItem(API_KEY_STORAGE_KEY) || DEFAULT_API_KEY;
};

// Convert API response to our app's MatchInfo format
const convertToMatchInfo = (apiMatch: any): MatchInfo => {
  return {
    id: apiMatch.fixture?.id?.toString() || "unknown",
    homeTeam: {
      id: apiMatch.teams?.home?.id?.toString() || "unknown",
      name: apiMatch.teams?.home?.name || "Unknown Team",
      logo: apiMatch.teams?.home?.logo || "/placeholder.svg",
      score: apiMatch.goals?.home
    },
    awayTeam: {
      id: apiMatch.teams?.away?.id?.toString() || "unknown",
      name: apiMatch.teams?.away?.name || "Unknown Team",
      logo: apiMatch.teams?.away?.logo || "/placeholder.svg",
      score: apiMatch.goals?.away
    },
    time: apiMatch.fixture?.date ? new Date(apiMatch.fixture.date).toLocaleTimeString('ar-EG', {
      hour: '2-digit',
      minute: '2-digit'
    }) : "00:00",
    status: getMatchStatus(apiMatch.fixture?.status?.short),
    league: {
      id: apiMatch.league?.id?.toString() || "unknown",
      name: apiMatch.league?.name || "Unknown League",
      logo: apiMatch.league?.logo || "/placeholder.svg"
    },
    matchDay: apiMatch.league?.round || "الجولة ?"
  };
};

// Helper to determine match status
const getMatchStatus = (apiStatus: string): "upcoming" | "live" | "finished" => {
  switch (apiStatus) {
    case "NS": // Not Started
    case "TBD": // Time To Be Defined
    case "PST": // Postponed
    case "SUSP": // Suspended
    case "INT": // Interrupted
    case "CANC": // Cancelled
      return "upcoming";
    case "1H": // First Half
    case "HT": // Half Time
    case "2H": // Second Half
    case "ET": // Extra Time
    case "P": // Penalty
    case "BT": // Break Time
      return "live";
    case "FT": // Full-Time
    case "AET": // After Extra Time
    case "PEN": // Penalty Shootout
    case "WO": // Walk Over
    case "AWD": // Technical Loss
      return "finished";
    default:
      return "upcoming";
  }
};

// Fetch today's matches
export const fetchTodayMatches = async (): Promise<MatchInfo[]> => {
  try {
    const apiKey = getApiKey();
    
    const today = new Date().toISOString().split('T')[0];
    const response = await fetch(`${API_URL}/fixtures?date=${today}`, {
      headers: {
        "x-rapidapi-key": apiKey,
        "x-rapidapi-host": "v3.football.api-sports.io"
      }
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Group matches by league
    const matchesByLeague: Record<string, MatchInfo[]> = {};
    
    if (data.response && Array.isArray(data.response)) {
      data.response.forEach((match: any) => {
        const matchInfo = convertToMatchInfo(match);
        const leagueId = matchInfo.league.id;
        
        if (!matchesByLeague[leagueId]) {
          matchesByLeague[leagueId] = [];
        }
        
        matchesByLeague[leagueId].push(matchInfo);
      });
    }
    
    // Return all matches for now, we'll handle grouping in the component
    return data.response ? data.response.map(convertToMatchInfo) : [];
  } catch (error) {
    console.error("Error fetching matches:", error);
    return [];
  }
};

// Fetch live matches
export const fetchLiveMatches = async (): Promise<MatchInfo[]> => {
  try {
    const apiKey = getApiKey();
    
    const response = await fetch(`${API_URL}/fixtures?live=all`, {
      headers: {
        "x-rapidapi-key": apiKey,
        "x-rapidapi-host": "v3.football.api-sports.io"
      }
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.response ? data.response.map(convertToMatchInfo) : [];
  } catch (error) {
    console.error("Error fetching live matches:", error);
    return [];
  }
};

// Fetch finished matches (last 2 days)
export const fetchFinishedMatches = async (): Promise<MatchInfo[]> => {
  try {
    const apiKey = getApiKey();
    
    const today = new Date();
    const twoDaysAgo = new Date(today);
    twoDaysAgo.setDate(today.getDate() - 2);
    
    const fromDate = twoDaysAgo.toISOString().split('T')[0];
    const toDate = today.toISOString().split('T')[0];
    
    const response = await fetch(`${API_URL}/fixtures?from=${fromDate}&to=${toDate}&status=FT`, {
      headers: {
        "x-rapidapi-key": apiKey,
        "x-rapidapi-host": "v3.football.api-sports.io"
      }
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.response ? data.response.map(convertToMatchInfo) : [];
  } catch (error) {
    console.error("Error fetching finished matches:", error);
    return [];
  }
};

// New function to group matches by league
export const groupMatchesByLeague = (matches: MatchInfo[]): Record<string, MatchInfo[]> => {
  const matchesByLeague: Record<string, MatchInfo[]> = {};
  
  matches.forEach(match => {
    const leagueId = match.league.id;
    
    if (!matchesByLeague[leagueId]) {
      matchesByLeague[leagueId] = [];
    }
    
    matchesByLeague[leagueId].push(match);
  });
  
  return matchesByLeague;
};
