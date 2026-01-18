import React from 'react';
import { Link } from 'react-router-dom';
import { Section, Container } from '../ui/Section';
import { ArrowRight } from 'lucide-react';
import { useNews } from '../../hooks/useWordPressApi';

const NewsItem = ({ id, date, category, title }) => (
  <Link to={`/info/${id}`} className="group block border-b border-border-light py-6 hover:bg-background-secondary/50 transition-colors px-4 -mx-4 rounded-lg">
    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
      <div className="flex items-center gap-4 shrink-0">
        <span className="text-text-tertiary font-en text-sm">{date}</span>
        <span className="px-3 py-1 bg-primary-pale text-primary-dark text-xs font-bold rounded-full">
          {category}
        </span>
      </div>
      <h3 className="text-text-primary group-hover:text-primary transition-colors font-medium flex-grow">
        {title}
      </h3>
      <ArrowRight className="w-5 h-5 text-text-tertiary group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100 shrink-0 hidden md:block" />
    </div>
  </Link>
);

// ローディングスケルトン
const LoadingSkeleton = () => (
  <div className="space-y-6">
    {[1, 2, 3].map((i) => (
      <div key={i} className="animate-pulse border-b border-border-light py-6">
        <div className="flex items-center gap-4 mb-2">
          <div className="h-4 w-24 bg-gray-200 rounded"></div>
          <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
        </div>
        <div className="h-5 w-3/4 bg-gray-200 rounded"></div>
      </div>
    ))}
  </div>
);

export const News = () => {
  const { news, loading } = useNews();

  // 最新3件を取得
  const newsItems = news.slice(0, 3);

  return (
    <Section id="news" background="white">
      <Container>
        <div className="flex justify-between items-end mb-10">
          <div>
            <span className="block text-text-tertiary font-bold tracking-widest text-sm mb-4 font-en">NEWS</span>
            <h2 className="text-3xl font-bold text-text-primary">お知らせ</h2>
          </div>
          <Link to="/info" className="hidden md:flex items-center text-primary font-bold hover:underline">
            すべてのお知らせを見る
            <ArrowRight className="ml-1 w-4 h-4" />
          </Link>
        </div>

        <div className="mb-8">
          {loading ? (
            <LoadingSkeleton />
          ) : (
            newsItems.map((item) => (
              <NewsItem key={item.id} {...item} />
            ))
          )}
        </div>

        <div className="md:hidden text-center">
          <Link to="/info" className="inline-flex items-center text-primary font-bold hover:underline">
            すべてのお知らせを見る
            <ArrowRight className="ml-1 w-4 h-4" />
          </Link>
        </div>
      </Container>
    </Section>
  );
};




