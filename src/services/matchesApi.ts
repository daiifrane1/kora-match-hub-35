import { MatchInfo } from "@/components/LiveScores/MatchCard";

// API configuration
const API_URL = "https://v3.football.api-sports.io";
const API_KEY_STORAGE_KEY = "football_api_key";

// Get API key from localStorage
const getApiKey = (): string => {
  return localStorage.getItem(API_KEY_STORAGE_KEY) || '';
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
    time: apiMatch.fixture?.date ? new Date(apiMatch.fixture.date).toLocaleTimeString('FR-EG', {
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
    
    if (!apiKey) {
      throw new Error('No API key provided');
    }

    const today = new Date().toISOString().split('T')[0];
    const response = await fetch(`${API_URL}/fixtures?date=${today}&status=NS`, {
      headers: {
        "x-rapidapi-key": apiKey,
        "x-rapidapi-host": "v3.football.api-sports.io"
      }
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.errors && Object.keys(data.errors).length > 0) {
      throw new Error(Object.values(data.errors)[0] as string);
    }

    return data.response ? data.response.map(convertToMatchInfo) : [];
  } catch (error) {
    console.error("Error fetching matches:", error);
    throw error;
  }
};

// Fetch live matches
export const fetchLiveMatches = async (): Promise<MatchInfo[]> => {
  try {
    const apiKey = getApiKey();
    
    if (!apiKey) {
      throw new Error('No API key provided');
    }

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
    
    if (data.errors && Object.keys(data.errors).length > 0) {
      throw new Error(Object.values(data.errors)[0] as string);
    }

    return data.response ? data.response.map(convertToMatchInfo) : [];
  } catch (error) {
    console.error("Error fetching live matches:", error);
    throw error;
  }
};

// Fetch finished matches
export const fetchFinishedMatches = async (): Promise<MatchInfo[]> => {
  try {
    const apiKey = getApiKey();
    
    if (!apiKey) {
      throw new Error('No API key provided');
    }

    const today = new Date();
    const fromDate = today.toISOString().split('T')[0];
    
    const response = await fetch(`${API_URL}/fixtures?date=${fromDate}&status=FT`, {
      headers: {
        "x-rapidapi-key": apiKey,
        "x-rapidapi-host": "v3.football.api-sports.io"
      }
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.errors && Object.keys(data.errors).length > 0) {
      throw new Error(Object.values(data.errors)[0] as string);
    }

    return data.response ? data.response.map(convertToMatchInfo) : [];
  } catch (error) {
    console.error("Error fetching finished matches:", error);
    throw error;
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
