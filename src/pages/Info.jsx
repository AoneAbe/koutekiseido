import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../components/ui/Section';
import { useNews } from '../hooks/useWordPressApi';

// ページヒーロー
const PageHero = () => (
  <section className="relative py-16 bg-background-secondary text-center">
    <Container>
      <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-2 font-en">Information</h1>
      <p className="text-text-secondary text-lg font-bold">お知らせ</p>
    </Container>
  </section>
);

// カテゴリーボタン
const CategoryButton = ({ category, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`px-6 py-2 rounded-md font-medium text-sm transition-all ${
      isActive
        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
        : 'bg-gradient-to-r from-gray-200 to-gray-300 text-text-secondary hover:from-gray-300 hover:to-gray-400'
    }`}
  >
    {category.label}
  </button>
);

// お知らせアイテム
const NewsItem = ({ news }) => {
  if (!news.title) return null;

  // カテゴリーの色を設定（グラデーション）
  const getCategoryColor = (category) => {
    switch (category) {
      case 'プレスリリース':
        return 'bg-gradient-to-r from-blue-500 to-blue-600';
      case 'お知らせ':
        return 'bg-gradient-to-r from-cyan-500 to-blue-500';
      case 'ニュース':
        return 'bg-gradient-to-r from-green-500 to-emerald-600';
      case 'セミナー':
        return 'bg-gradient-to-r from-purple-500 to-pink-500';
      case 'メディア':
        return 'bg-gradient-to-r from-orange-500 to-red-500';
      default:
        return 'bg-gradient-to-r from-gray-500 to-gray-600';
    }
  };

  return (
    <Link
      to={`/info/${news.id}`}
      className="block py-8 hover:bg-gray-50 transition-colors"
    >
      <div className="flex items-start gap-8">
        {/* 左側: News NO（区切り線なし） */}
        <div className="flex-shrink-0 w-24">
          <div className="text-xs text-text-tertiary mb-2">News</div>
          <div className="text-4xl font-bold text-text-primary">{news.id}</div>
        </div>

        {/* 右側: 日付、カテゴリー、タイトル（区切り線あり） */}
        <div className="flex-grow border-b border-border-light pb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-sm font-medium text-blue-600">{news.date}</span>
            <span
              className={`px-3 py-1 rounded text-white text-xs font-medium ${getCategoryColor(
                news.category
              )}`}
            >
              {news.category}
            </span>
          </div>
          <h3 className="text-lg font-medium text-text-primary">{news.title}</h3>
        </div>
      </div>
    </Link>
  );
};

// ページネーション
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-end gap-2 mt-12">
      {currentPage > 1 && (
        <button
          onClick={() => onPageChange(currentPage - 1)}
          className="w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm bg-white border border-border-light text-text-secondary hover:bg-gray-100"
        >
          &lt;
        </button>
      )}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm transition-all ${
            currentPage === page
              ? 'bg-primary text-white'
              : 'bg-white border border-border-light text-text-secondary hover:bg-gray-100'
          }`}
        >
          {page}
        </button>
      ))}
      {currentPage < totalPages && (
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className="w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm bg-white border border-border-light text-text-secondary hover:bg-gray-100"
        >
          &gt;
        </button>
      )}
    </div>
  );
};

// ローディングスピナー
const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-20">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);

export const Info = () => {
  const { news: newsData, categories, loading, error } = useNews();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // フィルタリングされたお知らせ
  const filteredNews = useMemo(() => {
    if (selectedCategory === 'all') {
      return newsData;
    }
    return newsData.filter((news) => news.category === selectedCategory);
  }, [selectedCategory, newsData]);

  // ページネーション
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNews = filteredNews.slice(startIndex, endIndex);

  // カテゴリー変更時にページをリセット
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  return (
    <>
      <PageHero />

      {/* メインコンテンツ */}
      <section className="relative py-20 bg-white overflow-hidden">
        {/* 背景画像（左側固定、大きく表示） */}
        <div
          className="fixed w-full h-screen bg-no-repeat opacity-20"
          style={{
            backgroundImage: `url(${import.meta.env.BASE_URL}info-fixbgi.png)`,
            backgroundSize: 'contain',
            backgroundPosition: 'left center',
            top: '20%',
            left: '-10%'
          }}
        />

        <Container className="relative z-10">
          {/* ローディング表示 */}
          {loading ? (
            <LoadingSpinner />
          ) : (
            <>
              {/* カテゴリーボタン */}
              <div className="flex flex-wrap gap-4 mb-12 mt-8 justify-center">
                {categories.map((category) => (
                  <CategoryButton
                    key={category.id}
                    category={category}
                    isActive={selectedCategory === category.id}
                    onClick={() => handleCategoryChange(category.id)}
                  />
                ))}
              </div>

              {/* お知らせリスト */}
              <div className="max-w-4xl mx-auto">
                {currentNews.length > 0 ? (
                  <>
                    {currentNews.map((news) => (
                      <NewsItem key={news.id} news={news} />
                    ))}

                    {/* ページネーション */}
                    {totalPages > 1 && (
                      <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                      />
                    )}
                  </>
                ) : (
                  <div className="text-center py-12 text-text-secondary">
                    お知らせがありません
                  </div>
                )}
              </div>
            </>
          )}
        </Container>
      </section>
    </>
  );
};
