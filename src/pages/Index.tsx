
import React from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import MatchesSection from '@/components/LiveScores/MatchesSection';
import NewsSection from '@/components/News/NewsSection';
import LeagueTable from '@/components/Standings/LeagueTable';
import { liveMatches, upcomingMatches, finishedMatches } from '@/data/matchesData';
import { featuredNews, latestNews } from '@/data/newsData';
import { egyptianLeagueStandings, laLigaStandings, premierLeagueStandings } from '@/data/standingsData';

const Index = () => {
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
          </div>
        </div>

        {/* Live Matches Section */}
        <div className="mb-12">
          <MatchesSection 
            title="المباريات المباشرة" 
            matches={liveMatches} 
            showMore={true}
            link="/matches?status=live"
          />
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
              matches={upcomingMatches.slice(0, 4)} 
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
            matches={finishedMatches} 
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
