
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import MatchesSection from '@/components/LiveScores/MatchesSection';
import NewsSection from '@/components/News/NewsSection';
import LeagueTable from '@/components/Standings/LeagueTable';
import { liveMatches, upcomingMatches, finishedMatches } from '@/data/matchesData';
import { featuredNews, latestNews } from '@/data/newsData';
import { egyptianLeagueStandings, laLigaStandings, premierLeagueStandings } from '@/data/standingsData';
import { fetchLiveMatches, fetchTodayMatches, fetchFinishedMatches, groupMatchesByLeague } from '@/services/matchesApi';
import { MatchInfo } from '@/components/LiveScores/MatchCard';
import ApiKeyModal from '@/components/Settings/ApiKeyModal';
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

const Index = () => {
  const [apiLiveMatches, setApiLiveMatches] = useState<MatchInfo[]>(liveMatches);
  const [apiUpcomingMatches, setApiUpcomingMatches] = useState<MatchInfo[]>(upcomingMatches);
  const [apiFinishedMatches, setApiFinishedMatches] = useState<MatchInfo[]>(finishedMatches);
  const [isLoading, setIsLoading] = useState(true);
  const [liveMatchesByLeague, setLiveMatchesByLeague] = useState<Record<string, MatchInfo[]>>({});
  const [showApiKeyAlert, setShowApiKeyAlert] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const loadMatchData = async () => {
      setIsLoading(true);
      try {
        // Try to fetch data from API
        const [liveData, upcomingData, finishedData] = await Promise.all([
          fetchLiveMatches(),
          fetchTodayMatches(),
          fetchFinishedMatches()
        ]);
        
        // If we have API data, use it. Otherwise, fall back to static data
        if (liveData.length > 0) {
          setApiLiveMatches(liveData);
          // Group live matches by league
          setLiveMatchesByLeague(groupMatchesByLeague(liveData));
        }
        if (upcomingData.length > 0) setApiUpcomingMatches(upcomingData);
        if (finishedData.length > 0) setApiFinishedMatches(finishedData);
      } catch (error) {
        console.error("Error loading match data:", error);
        // Already using fallback data from initial state
        setLiveMatchesByLeague(groupMatchesByLeague(liveMatches));
        
        // Check if error is related to missing API key
        if (error instanceof Error && error.message.includes('No API key provided')) {
          setShowApiKeyAlert(true);
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadMatchData();
  }, []);

  const handleApiKeyChange = () => {
    setShowApiKeyAlert(false);
    window.location.reload();
  };

  // Render live matches by league
  const renderLiveMatchesByLeague = () => {
    if (Object.keys(liveMatchesByLeague).length === 0) {
      return (
        <MatchesSection 
          title="المباريات المباشرة" 
          matches={apiLiveMatches} 
          showMore={true}
          link="/matches?status=live"
        />
      );
    }

    return Object.entries(liveMatchesByLeague).map(([leagueId, leagueMatches]) => {
      // Get league info from the first match
      const { name } = leagueMatches[0].league;
      
      return (
        <div key={leagueId} className="mb-6">
          <MatchesSection
            title={name}
            matches={leagueMatches}
            showMore={true}
            link={`/matches?status=live&league=${leagueId}`}
            horizontal={true}
          />
        </div>
      );
    });
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-kooora-dark to-kooora-primary rounded-lg p-8 mb-8 text-white">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">كورة ماتش - عالم كرة القدم</h1>
            <p className="text-lg mb-6">
              أحدث أخبار كرة القدم، النتائج المباشرة، مواعيد المباريات، وترتيب الدوريات المحلية والعالمية في مكان واحد.
            </p>
            <div className="flex justify-end">
              <ApiKeyModal onApiKeyChange={handleApiKeyChange} />
            </div>
          </div>
        </div>

        {/* API Key Alert */}
        {showApiKeyAlert && (
          <Alert className="mb-8 bg-amber-50 border-amber-200">
            <InfoIcon className="h-5 w-5 text-amber-500" />
            <AlertDescription className="flex items-center justify-between">
              <span>تم استخدام بيانات افتراضية. أضف مفتاح API للحصول على بيانات المباريات الحقيقية.</span>
              <ApiKeyModal onApiKeyChange={handleApiKeyChange} />
            </AlertDescription>
          </Alert>
        )}

        {/* Live Matches Section */}
        <div className="mb-12">
          {renderLiveMatchesByLeague()}
        </div>

        {/* Featured News Section */}
        <div className="mb-12">
          <NewsSection 
            title="أهم الأخبار" 
            newsItems={featuredNews} 
            showMore={true}
            featured={true}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Upcoming Matches Section */}
          <div className="lg:col-span-2">
            <MatchesSection 
              title="مباريات اليوم" 
              matches={apiUpcomingMatches.slice(0, 4)} 
              showMore={true}
              link="/matches?status=upcoming"
            />
          </div>

          {/* Latest News Section */}
          <div>
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="section-title">آخر الأخبار</h2>
              <div className="space-y-4">
                {latestNews.map((news) => (
                  <div key={news.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                    <h3 className="font-semibold mb-1 line-clamp-2">
                      <a href={`/news/${news.id}`} className="hover:text-kooora-primary">
                        {news.title}
                      </a>
                    </h3>
                    <div className="flex items-center text-xs text-kooora-gray">
                      <span className="bg-gray-100 text-kooora-primary px-2 py-0.5 rounded-full mr-2">
                        {news.category}
                      </span>
                      <span>{news.date}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-4">
                <a 
                  href="/news" 
                  className="text-kooora-primary hover:underline font-medium"
                >
                  عرض جميع الأخبار
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Finished Matches */}
        <div className="mb-12">
          <MatchesSection 
            title="نتائج آخر المباريات" 
            matches={apiFinishedMatches} 
            showMore={true}
            link="/matches?status=finished"
          />
        </div>

        {/* League Standings */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div>
            <LeagueTable 
              title="الدوري المصري" 
              standings={egyptianLeagueStandings} 
            />
          </div>
          <div>
            <LeagueTable 
              title="الدوري الإسباني" 
              standings={laLigaStandings} 
            />
          </div>
          <div>
            <LeagueTable 
              title="الدوري الإنجليزي" 
              standings={premierLeagueStandings} 
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
