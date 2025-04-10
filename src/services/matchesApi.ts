
import { MatchInfo } from "@/components/LiveScores/MatchCard";
import { toast } from "@/components/ui/use-toast";

// API configuration
const API_URL = "https://api.football-data.org/v4";
const API_KEY_STORAGE_KEY = "football_api_key";

// Default API key as fallback
const DEFAULT_API_KEY = "e8bccb552ecaed0a24a791db83129298";

// Get API key from localStorage or use default
const getApiKey = (): string => {
  return localStorage.getItem(API_KEY_STORAGE_KEY) || DEFAULT_API_KEY;
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
      score: apiMatch.score?.fullTime?.home !== null ? apiMatch.score?.fullTime?.home : apiMatch.score?.halfTime?.home
    },
    awayTeam: {
      id: apiMatch.awayTeam?.id?.toString() || "unknown",
      name: apiMatch.awayTeam?.name || "Unknown Team",
      logo: apiMatch.awayTeam?.crest || "/placeholder.svg",
      score: apiMatch.score?.fullTime?.away !== null ? apiMatch.score?.fullTime?.away : apiMatch.score?.halfTime?.away
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

// Generic API fetch function with error handling
const fetchFromAPI = async (endpoint: string): Promise<any> => {
  const apiKey = getApiKey();
  
  try {
    console.log(`Fetching from ${API_URL}${endpoint} with API key ${apiKey.substring(0, 5)}...`);
    
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        "X-Auth-Token": apiKey
      }
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error("API Error:", response.status, errorData);
      
      if (response.status === 403 || response.status === 401) {
        throw new Error("مفتاح API غير صالح. الرجاء التحقق من المفتاح وإعادة المحاولة.");
      } else {
        throw new Error(`خطأ في الاتصال بواجهة API: ${response.status}`);
      }
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// Fetch today's matches
export const fetchTodayMatches = async (): Promise<MatchInfo[]> => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const data = await fetchFromAPI(`/matches?dateFrom=${today}&dateTo=${today}`);
    return data.matches.map(convertToMatchInfo);
  } catch (error: any) {
    console.error("Error fetching today's matches:", error);
    toast({
      title: "خطأ في تحميل مباريات اليوم",
      description: error.message || "تعذر تحميل مباريات اليوم. جاري استخدام بيانات تجريبية.",
      variant: "destructive",
    });
    return [];
  }
};

// Fetch live matches
export const fetchLiveMatches = async (): Promise<MatchInfo[]> => {
  try {
    const data = await fetchFromAPI(`/matches?status=LIVE`);
    return data.matches.map(convertToMatchInfo);
  } catch (error: any) {
    console.error("Error fetching live matches:", error);
    toast({
      title: "خطأ في تحميل المباريات المباشرة",
      description: error.message || "تعذر تحميل المباريات المباشرة. جاري استخدام بيانات تجريبية.",
      variant: "destructive",
    });
    return [];
  }
};

// Fetch finished matches (last 2 days)
export const fetchFinishedMatches = async (): Promise<MatchInfo[]> => {
  try {
    const today = new Date();
    const twoDaysAgo = new Date(today);
    twoDaysAgo.setDate(today.getDate() - 2);
    
    const fromDate = twoDaysAgo.toISOString().split('T')[0];
    const toDate = today.toISOString().split('T')[0];
    
    const data = await fetchFromAPI(`/matches?dateFrom=${fromDate}&dateTo=${toDate}&status=FINISHED`);
    return data.matches.map(convertToMatchInfo);
  } catch (error: any) {
    console.error("Error fetching finished matches:", error);
    toast({
      title: "خطأ في تحميل نتائج المباريات",
      description: error.message || "تعذر تحميل نتائج المباريات. جاري استخدام بيانات تجريبية.",
      variant: "destructive",
    });
    return [];
  }
};
