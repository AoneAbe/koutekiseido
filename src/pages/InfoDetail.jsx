import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container } from '../components/ui/Section';
import { newsData } from '../data/newsData';

// ページヒーロー
const PageHero = () => (
  <section className="relative py-16 bg-background-secondary text-center">
    <Container>
      <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-2 font-en">Information</h1>
      <p className="text-text-secondary text-lg font-bold">お知らせ詳細</p>
    </Container>
  </section>
);

export const InfoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // IDに該当するお知らせを取得
  const news = newsData.find((item) => item.id === id);

  // カテゴリーの色を設定
  const getCategoryColor = (category) => {
    switch (category) {
      case 'プレスリリース':
        return 'bg-blue-500';
      case 'お知らせ':
        return 'bg-primary';
      default:
        return 'bg-gray-500';
    }
  };

  // お知らせが見つからない場合
  if (!news) {
    return (
      <>
        <PageHero />
        <section className="relative py-20 bg-white">
          <Container>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-text-primary mb-4">
                お知らせが見つかりませんでした
              </h2>
              <p className="text-text-secondary mb-8">
                指定されたお知らせは存在しないか、削除された可能性があります。
              </p>
              <Link
                to="/info"
                className="inline-block px-8 py-3 bg-primary text-white rounded-md font-medium hover:bg-primary-dark transition-colors"
              >
                お知らせ一覧に戻る
              </Link>
            </div>
          </Container>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero />

      {/* メインコンテンツ */}
      <section className="relative py-20 bg-white overflow-hidden">
        {/* 背景画像（左側固定、大きく表示） */}
        {/* <div
          className="absolute left-0 top-0 bottom-0 w-2/3 bg-no-repeat opacity-20"
          style={{
            backgroundImage: 'url(/info-fixbgi.png)',
            backgroundSize: 'cover',
            backgroundPosition: '-30% center'
          }}
        /> */}

        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* 戻るボタン */}
            <button
              onClick={() => navigate('/info')}
              className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors mb-12"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span className="font-medium">一覧に戻る</span>
            </button>

            {/* タイトルセクション */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-sm font-medium text-blue-600">{news.date}</span>
                <span
                  className={`px-3 py-1 rounded text-white text-xs font-medium ${getCategoryColor(
                    news.category
                  )}`}
                >
                  {news.category}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-2">
                {news.title}
              </h1>
            </div>

            {/* コンテンツ */}
            <div className="prose max-w-none mb-12">
              <div className="text-text-secondary text-lg leading-relaxed whitespace-pre-wrap">
                {news.content}
              </div>
            </div>

            {/* 戻るボタン（下部） */}
            <div className="border-t border-border-light pt-8">
              <Link
                to="/info"
                className="inline-block px-8 py-3 bg-primary text-white rounded-md font-medium hover:bg-primary-dark transition-colors"
              >
                お知らせ一覧に戻る
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};
