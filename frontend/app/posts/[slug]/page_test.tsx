import { describe, it, expect, vi } from 'vitest';

vi.mock('@/lib/wordpress', async () => {
  return {
    getPostBySlug: vi.fn().mockResolvedValue({ title: 'T', excerpt: 'ex', content: 'c' }),
  };
});

// Mock components to avoid resolving actual React components in the test env
vi.mock('@/components/Header', () => ({ default: () => 'Header' }));
vi.mock('@/components/Footer', () => ({ default: () => 'Footer' }));
vi.mock('@/components/ArticleCard', () => ({ default: () => 'ArticleCard' }));

import { generateMetadata } from './page';

describe('posts/[slug]/page', () => {
  it('generateMetadata returns title when post exists', async () => {
    const params = { params: Promise.resolve({ slug: 's' }) } as any;
    const md = await generateMetadata(params);
    expect(md.title).toBe('T');
  });
});
