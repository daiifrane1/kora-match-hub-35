
import React from 'react';
import { Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  image: string;
  date: string;
  category: string;
}

interface NewsCardProps {
  news: NewsItem;
  featured?: boolean;
}

const NewsCard: React.FC<NewsCardProps> = ({ news, featured = false }) => {
  if (featured) {
    return (
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative h-64">
          <img 
            src={news.image} 
            alt={news.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <div className="flex items-center text-xs mb-2">
              <span className="bg-kooora-primary px-2 py-0.5 rounded-full mr-2">
                {news.category}
              </span>
              <div className="flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                <span>{news.date}</span>
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2">{news.title}</h3>
            <p className="text-sm text-gray-200 line-clamp-2">{news.summary}</p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
      <div className="relative h-40">
        <img 
          src={news.image} 
          alt={news.title} 
          className="w-full h-full object-cover"
        />
      </div>
      <CardContent className="p-4 flex-grow">
        <div className="flex items-center text-xs text-kooora-gray mb-2">
          <span className="bg-gray-100 text-kooora-primary px-2 py-0.5 rounded-full mr-2">
            {news.category}
          </span>
          <div className="flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            <span>{news.date}</span>
          </div>
        </div>
        <h3 className="font-bold mb-2 line-clamp-2">{news.title}</h3>
        <p className="text-sm text-kooora-gray line-clamp-2">{news.summary}</p>
      </CardContent>
    </Card>
  );
};

export default NewsCard;
