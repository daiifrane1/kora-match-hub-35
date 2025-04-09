
import React, { useState } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import MatchesSection from '@/components/LiveScores/MatchesSection';
import { liveMatches, upcomingMatches, finishedMatches } from '@/data/matchesData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Check } from 'lucide-react';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

const Matches = () => {
  const [activeTab, setActiveTab] = useState("live");

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-2xl font-bold mb-6 text-kooora-dark">جدول المباريات</h1>
          
          <Tabs defaultValue="live" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="w-full flex mb-6 bg-gray-100 p-1 rounded-md">
              <TabsTrigger 
                value="live" 
                className="flex-1 data-[state=active]:bg-kooora-primary data-[state=active]:text-white"
              >
                <div className="flex items-center justify-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>مباريات مباشرة</span>
                </div>
              </TabsTrigger>
              <TabsTrigger 
                value="upcoming" 
                className="flex-1 data-[state=active]:bg-kooora-primary data-[state=active]:text-white"
              >
                <div className="flex items-center justify-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>مباريات اليوم</span>
                </div>
              </TabsTrigger>
              <TabsTrigger 
                value="finished" 
                className="flex-1 data-[state=active]:bg-kooora-primary data-[state=active]:text-white"
              >
                <div className="flex items-center justify-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>نتائج المباريات</span>
                </div>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="live" className="mt-2">
              {liveMatches.length > 0 ? (
                <div className="bg-white rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {liveMatches.map((match) => (
                      <div key={match.id} className="match-item">
                        <MatchesSection
                          title=""
                          matches={[match]}
                          showMore={false}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-10 text-kooora-gray">
                  <p className="text-lg">لا توجد مباريات مباشرة حالياً</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="upcoming" className="mt-2">
              <div className="bg-white rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {upcomingMatches.map((match) => (
                    <div key={match.id} className="match-item">
                      <MatchesSection
                        title=""
                        matches={[match]}
                        showMore={false}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="finished" className="mt-2">
              <div className="bg-white rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {finishedMatches.map((match) => (
                    <div key={match.id} className="match-item">
                      <MatchesSection
                        title=""
                        matches={[match]}
                        showMore={false}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {activeTab !== "live" && (
          <div className="mt-6 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" className="rtl:rotate-180" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" className="rtl:rotate-180" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Matches;
