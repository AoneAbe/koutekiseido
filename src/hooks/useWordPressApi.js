import { useState, useEffect } from 'react';
import { USE_MOCK_DATA, API_ENDPOINTS, API_CONFIG } from '../config/api';
import { mockNewsData, mockMembersData, mockCategories } from '../data/mockData';

/**
 * WordPress REST APIからお知らせデータを取得するフック
 */
export const useNews = () => {
  const [news, setNews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);

        if (USE_MOCK_DATA) {
          // モックデータを使用
          await new Promise(resolve => setTimeout(resolve, 300)); // 擬似的な遅延
          setNews(mockNewsData);
          setCategories(mockCategories);
        } else {
          // WordPress APIからデータ取得
          const response = await fetch(
            `${API_ENDPOINTS.news}?per_page=${API_CONFIG.perPage}&_embed`,
            { signal: AbortSignal.timeout(API_CONFIG.timeout) }
          );

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();

          // 日付でソート（新しい順）
          const sortedData = [...data].sort((a, b) => {
            const dateA = a.acf?.date || a.date;
            const dateB = b.acf?.date || b.date;
            return dateB.localeCompare(dateA);
          });

          // WordPress APIレスポンスを変換（001から順番に番号を振る）
          const totalCount = sortedData.length;
          const transformedNews = sortedData.map((item, index) => ({
            id: String(totalCount - index).padStart(3, '0'),
            wpId: item.id, // WordPress内部ID（詳細ページ用）
            date: formatDate(item.acf?.date || item.date),
            category: item.acf?.category || 'お知らせ',
            title: item.title?.rendered || item.acf?.title || '',
            content: item.content?.rendered || item.acf?.content || '',
          }));

          setNews(transformedNews);

          // カテゴリーを抽出
          const uniqueCategories = [...new Set(transformedNews.map(n => n.category))];
          setCategories([
            { id: 'all', label: 'すべてのニュース' },
            ...uniqueCategories.map(cat => ({ id: cat, label: cat }))
          ]);
        }
      } catch (err) {
        console.error('Failed to fetch news:', err);
        setError(err.message);
        // エラー時はモックデータにフォールバック
        setNews(mockNewsData);
        setCategories(mockCategories);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return { news, categories, loading, error };
};

/**
 * WordPress REST APIからメンバーデータを取得するフック
 */
export const useMembers = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        setError(null);

        if (USE_MOCK_DATA) {
          // モックデータを使用
          await new Promise(resolve => setTimeout(resolve, 300)); // 擬似的な遅延
          setMembers(mockMembersData);
        } else {
          // WordPress APIからデータ取得
          const response = await fetch(
            `${API_ENDPOINTS.members}?per_page=${API_CONFIG.perPage}&_embed`,
            { signal: AbortSignal.timeout(API_CONFIG.timeout) }
          );

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();

          // WordPress APIレスポンスを変換
          const transformedMembers = data.map(item => {
            // 画像の取得（文字列URL、オブジェクト、またはID）
            let imageUrl = '';
            const imgField = item.acf?.image;
            if (typeof imgField === 'string') {
              // 「画像URL」形式：直接URLが文字列で返る
              imageUrl = imgField;
            } else if (imgField?.url) {
              // 「画像配列」形式：オブジェクトのurlプロパティ
              imageUrl = imgField.url;
            } else if (item._embedded?.['wp:featuredmedia']?.[0]?.source_url) {
              // アイキャッチ画像
              imageUrl = item._embedded['wp:featuredmedia'][0].source_url;
            }

            return {
              id: item.id,
              nameEn: item.acf?.name_en || '',
              nameJp: item.acf?.name_jp || '',
              role: item.acf?.role || '',
              description: item.acf?.description || '',
              img: imageUrl,
              order: item.acf?.display_order || 0,
            };
          });

          // 表示順でソート
          transformedMembers.sort((a, b) => a.order - b.order);
          setMembers(transformedMembers);
        }
      } catch (err) {
        console.error('Failed to fetch members:', err);
        setError(err.message);
        // エラー時はモックデータにフォールバック
        setMembers(mockMembersData);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  return { members, loading, error };
};

/**
 * 単一のお知らせ記事を取得するフック
 */
export const useNewsDetail = (id) => {
  const [newsItem, setNewsItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        setLoading(true);
        setError(null);

        if (USE_MOCK_DATA) {
          await new Promise(resolve => setTimeout(resolve, 200));
          const item = mockNewsData.find(n => n.id === id);
          setNewsItem(item || null);
        } else {
          // WordPress APIでは記事IDで検索
          const response = await fetch(
            `${API_ENDPOINTS.news}?per_page=100&_embed`,
            { signal: AbortSignal.timeout(API_CONFIG.timeout) }
          );

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();

          // 日付でソート（新しい順）して番号を振り直す
          const sortedData = [...data].sort((a, b) => {
            const dateA = a.acf?.date || a.date;
            const dateB = b.acf?.date || b.date;
            return dateB.localeCompare(dateA);
          });

          const totalCount = sortedData.length;
          const itemIndex = sortedData.findIndex((_, index) =>
            String(totalCount - index).padStart(3, '0') === id
          );

          if (itemIndex !== -1) {
            const item = sortedData[itemIndex];
            setNewsItem({
              id: String(totalCount - itemIndex).padStart(3, '0'),
              date: formatDate(item.acf?.date || item.date),
              category: item.acf?.category || 'お知らせ',
              title: item.title?.rendered || item.acf?.title || '',
              content: item.content?.rendered || item.acf?.content || '',
            });
          } else {
            setNewsItem(null);
          }
        }
      } catch (err) {
        console.error('Failed to fetch news detail:', err);
        setError(err.message);
        // エラー時はモックデータにフォールバック
        const item = mockNewsData.find(n => n.id === id);
        setNewsItem(item || null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchNewsDetail();
    }
  }, [id]);

  return { newsItem, loading, error };
};

/**
 * 日付フォーマット変換
 * WordPress/ACF形式 → 表示形式 (2025.01.15)
 * 対応形式: "20250115", "2025-01-15", "2025-01-15T00:00:00", "2025.01.15"
 */
const formatDate = (dateString) => {
  if (!dateString) return '';

  // すでに "2025.01.15" 形式の場合はそのまま返す
  if (/^\d{4}\.\d{2}\.\d{2}$/.test(dateString)) {
    return dateString;
  }

  // ACF日付ピッカー形式 "20250115" の場合
  if (/^\d{8}$/.test(dateString)) {
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);
    return `${year}.${month}.${day}`;
  }

  try {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  } catch {
    return dateString;
  }
};
