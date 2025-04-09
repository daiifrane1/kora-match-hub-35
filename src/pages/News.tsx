
import React, { useState } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import NewsCard from '@/components/News/NewsCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { featuredNews, latestNews } from '@/data/newsData';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

// Combine news data and add categories
const allNews = [...featuredNews, ...latestNews].map(news => {
  if (!news.category) {
    return { ...news, category: 'أخبار عامة' };
  }
  return news;
});

const categories = [
  { id: 'all', name: 'جميع الأخبار' },
  { id: 'local', name: 'أخبار محلية' },
  { id: 'international', name: 'أخبار عالمية' },
  { id: 'transfers', name: 'انتقالات' },
  { id: 'analysis', name: 'تحليلات' },
];

const News = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const filteredNews = selectedCategory === 'all' 
    ? allNews 
    : allNews.filter(news => news.category === selectedCategory);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-2xl font-bold mb-6 text-kooora-dark">أخبار كرة القدم</h1>
          
          <Tabs defaultValue="all" className="w-full" onValueChange={setSelectedCategory}>
            <TabsList className="w-full flex flex-wrap mb-6 bg-gray-100 p-1 rounded-md">
              {categories.map((category) => (
                <TabsTrigger 
                  key={category.id}
                  value={category.id} 
                  className="flex-1 data-[state=active]:bg-kooora-primary data-[state=active]:text-white"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          
          {/* Featured News */}
          {selectedCategory === 'all' && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-kooora-dark">أهم الأخبار</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="lg:col-span-2">
                  <NewsCard news={featuredNews[0]} featured={true} />
                </div>
                {featuredNews.slice(1, 3).map(news => (
                  <NewsCard key={news.id} news={news} />
                ))}
              </div>
            </div>
          )}
          
          {/* News List */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-kooora-dark">
              {selectedCategory === 'all' ? 'آخر الأخبار' : categories.find(c => c.id === selectedCategory)?.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {filteredNews.length > 0 ? (
                (selectedCategory === 'all' ? filteredNews.slice(3) : filteredNews).map(news => (
                  <NewsCard key={news.id} news={news} />
                ))
              ) : (
                <div className="col-span-full text-center py-10 text-kooora-gray">
                  <p className="text-lg">لا توجد أخبار متاحة في هذا القسم</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Pagination */}
          {filteredNews.length > 0 && (
            <div className="flex justify-center">
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
      </div>
    </MainLayout>
  );
};

export default News;
