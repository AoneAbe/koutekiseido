// WordPress REST API 設定
// 本番環境では実際のWordPressドメインに変更してください

// 開発モード: true = モックデータ使用, false = WordPress API使用
export const USE_MOCK_DATA = false;

// WordPress REST API ベースURL
// 例: https://yourdomain.com/wp-json/wp/v2
export const WP_API_BASE_URL = 'https://koutekiseido-japan.com/wp-json/wp/v2';

// カスタム投稿タイプのエンドポイント
export const API_ENDPOINTS = {
  news: `${WP_API_BASE_URL}/news`,
  members: `${WP_API_BASE_URL}/members`,
};

// APIリクエスト設定
export const API_CONFIG = {
  // 1ページあたりの取得件数
  perPage: 100,
  // タイムアウト（ミリ秒）
  timeout: 10000,
};
