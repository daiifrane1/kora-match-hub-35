
import React from 'react';
import NewsCard, { NewsItem } from './NewsCard';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

interface NewsSectionProps {
  title: string;
  newsItems: NewsItem[];
  showMore?: boolean;
  featured?: boolean;
}

const NewsSection: React.FC<NewsSectionProps> = ({ 
  title, 
  newsItems, 
  showMore = false,
  featured = false
}) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="section-title">{title}</h2>
        {showMore && (
          <Button variant="link" className="text-kooora-primary" asChild>
            <a href="/news" className="flex items-center">
              المزيد
              <ChevronLeft className="h-4 w-4 mr-1 rtl:rotate-180" />
            </a>
          </Button>
        )}
      </div>
      
      {featured ? (
        <div className="mb-8">
          <NewsCard news={newsItems[0]} featured={true} />
        </div>
      ) : null}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {(featured ? newsItems.slice(1) : newsItems).map((item) => (
          <NewsCard key={item.id} news={item} />
        ))}
      </div>
    </div>
  );
};

export default NewsSection;
