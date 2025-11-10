import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://wpcore-l.tooling-hub.com/wp-json/wp/v2';

// Axiosインスタンスの作成（User-Agentヘッダーを追加）
const api = axios.create({
  headers: {
    'User-Agent': 'Mozilla/5.0 (compatible; NextJS/16.0; +https://core-l.tooling-hub.com)',
    'Accept': 'application/json',
  },
});

export interface Post {
  id: number;
  date: string;
  modified: string;
  slug: string;
  status: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  author: number;
  featured_media: number;
  categories: number[];
  tags: number[];
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
    }>;
    'wp:term'?: Array<Array<{
      id: number;
      name: string;
      slug: string;
    }>>;
    author?: Array<{
      id: number;
      name: string;
      avatar_urls: {
        [key: string]: string;
      };
    }>;
  };
}

export interface Category {
  id: number;
  count: number;
  description: string;
  name: string;
  slug: string;
}

/**
 * 記事一覧を取得
 */
export async function getPosts(params: {
  page?: number;
  perPage?: number;
  categories?: number[];
  search?: string;
} = {}): Promise<{ posts: Post[]; total: number; totalPages: number }> {
  try {
    const { page = 1, perPage = 10, categories, search } = params;

    const queryParams = new URLSearchParams({
      page: page.toString(),
      per_page: perPage.toString(),
      _embed: 'true',
    });

    if (categories && categories.length > 0) {
      queryParams.append('categories', categories.join(','));
    }

    if (search) {
      queryParams.append('search', search);
    }

    // URLにすでに?が含まれている場合は&、そうでなければ?を使う
    const separator = API_URL.includes('?') ? '&' : '?';
    const response = await api.get(`${API_URL}/posts${separator}${queryParams.toString()}`);

    return {
      posts: response.data,
      total: parseInt(response.headers['x-wp-total'] || '0'),
      totalPages: parseInt(response.headers['x-wp-totalpages'] || '0'),
    };
  } catch (error) {
    console.error('Error fetching posts:', error);
    console.error('API URL:', API_URL);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
    }
    return { posts: [], total: 0, totalPages: 0 };
  }
}

/**
 * 記事をスラッグで取得
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const separator = API_URL.includes('?') ? '&' : '?';
    const response = await api.get(`${API_URL}/posts${separator}slug=${slug}&_embed=true`);

    if (response.data && response.data.length > 0) {
      return response.data[0];
    }

    return null;
  } catch (error) {
    console.error('Error fetching post by slug:', slug, error);
    console.error('API URL:', API_URL);
    return null;
  }
}

/**
 * 記事をIDで取得
 */
export async function getPostById(id: number): Promise<Post | null> {
  try {
    const separator = API_URL.includes('?') ? '&' : '?';
    const response = await api.get(`${API_URL}/posts/${id}${separator}_embed=true`);
    return response.data;
  } catch (error) {
    console.error('Error fetching post by ID:', id, error);
    console.error('API URL:', API_URL);
    return null;
  }
}

/**
 * カテゴリー一覧を取得
 */
export async function getCategories(): Promise<Category[]> {
  try {
    const separator = API_URL.includes('?') ? '&' : '?';
    const response = await api.get(`${API_URL}/categories${separator}per_page=100`);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    console.error('API URL:', API_URL);
    return [];
  }
}

/**
 * 人気記事を取得（最新順）
 */
export async function getPopularPosts(limit: number = 5): Promise<Post[]> {
  try {
    const { posts } = await getPosts({ perPage: limit });
    return posts;
  } catch (error) {
    console.error('Error fetching popular posts:', error);
    return [];
  }
}
