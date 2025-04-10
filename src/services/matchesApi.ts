import { MatchInfo } from "@/components/LiveScores/MatchCard";

// API configuration
const API_URL = "https://api.football-data.org/v4";
const API_KEY_STORAGE_KEY = "football_api_key";

// Get API key from localStorage
const getApiKey = (): string => {
  return localStorage.getItem(API_KEY_STORAGE_KEY) || "";
};

// Fetch matches interface
interface ApiResponse {
  matches: any[];
  // other response fields
}

// Convert API response to our app's MatchInfo format
const convertToMatchInfo = (apiMatch: any): MatchInfo => {
  return {
    id: apiMatch.id.toString(),
    homeTeam: {
      id: apiMatch.homeTeam?.id?.toString() || "unknown",
      name: apiMatch.homeTeam?.name || "Unknown Team",
      logo: apiMatch.homeTeam?.crest || "/placeholder.svg",
      score: apiMatch.score?.fullTime?.home
    },
    awayTeam: {
      id: apiMatch.awayTeam?.id?.toString() || "unknown",
      name: apiMatch.awayTeam?.name || "Unknown Team",
      logo: apiMatch.awayTeam?.crest || "/placeholder.svg",
      score: apiMatch.score?.fullTime?.away
    },
    time: apiMatch.utcDate ? new Date(apiMatch.utcDate).toLocaleTimeString('ar-EG', {
      hour: '2-digit',
      minute: '2-digit'
    }) : "00:00",
    status: getMatchStatus(apiMatch.status),
    league: {
      id: apiMatch.competition?.id?.toString() || "unknown",
      name: apiMatch.competition?.name || "Unknown League",
      logo: apiMatch.competition?.emblem || "/placeholder.svg"
    },
    matchDay: `الجولة ${apiMatch.matchday || "?"}`
  };
};

// Helper to determine match status
const getMatchStatus = (apiStatus: string): "upcoming" | "live" | "finished" => {
  switch (apiStatus) {
    case "SCHEDULED":
    case "TIMED":
    case "POSTPONED":
      return "upcoming";
    case "LIVE":
    case "IN_PLAY":
    case "PAUSED":
      return "live";
    case "FINISHED":
    case "COMPLETED":
    case "SUSPENDED":
    case "CANCELED":
      return "finished";
    default:
      return "upcoming";
  }
};

// Fetch today's matches
export const fetchTodayMatches = async (): Promise<MatchInfo[]> => {
  try {
    const apiKey = getApiKey();
    // Return empty array if no API key
    if (!apiKey) {
      console.warn("No API key provided");
      return [];
    }

    const today = new Date().toISOString().split('T')[0];
    const response = await fetch(`${API_URL}/matches?dateFrom=${today}&dateTo=${today}`, {
      headers: {
        "X-Auth-Token": apiKey
      }
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data: ApiResponse = await response.json();
    return data.matches.map(convertToMatchInfo);
  } catch (error) {
    console.error("Error fetching matches:", error);
    return [];
  }
};

// Fetch live matches
export const fetchLiveMatches = async (): Promise<MatchInfo[]> => {
  try {
    const apiKey = getApiKey();
    if (!apiKey) {
      console.warn("No API key provided");
      return [];
    }

    const response = await fetch(`${API_URL}/matches?status=LIVE`, {
      headers: {
        "X-Auth-Token": apiKey
      }
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data: ApiResponse = await response.json();
    return data.matches.map(convertToMatchInfo);
  } catch (error) {
    console.error("Error fetching live matches:", error);
    return [];
  }
};

// Fetch finished matches (last 2 days)
export const fetchFinishedMatches = async (): Promise<MatchInfo[]> => {
  try {
    const apiKey = getApiKey();
    if (!apiKey) {
      console.warn("No API key provided");
      return [];
    }
    
    const today = new Date();
    const twoDaysAgo = new Date(today);
    twoDaysAgo.setDate(today.getDate() - 2);
    
    const fromDate = twoDaysAgo.toISOString().split('T')[0];
    const toDate = today.toISOString().split('T')[0];
    
    const response = await fetch(`${API_URL}/matches?dateFrom=${fromDate}&dateTo=${toDate}&status=FINISHED`, {
      headers: {
        "X-Auth-Token": apiKey
      }
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data: ApiResponse = await response.json();
    return data.matches.map(convertToMatchInfo);
  } catch (error) {
    console.error("Error fetching finished matches:", error);
    return [];
  }
};
