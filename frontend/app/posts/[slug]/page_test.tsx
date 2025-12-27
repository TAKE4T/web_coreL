import { describe, it, expect, vi } from 'vitest';

vi.mock('@/lib/wordpress', async () => {
  return {
    getPostBySlug: vi.fn().mockResolvedValue({ title: 'T', excerpt: 'ex', content: 'c' }),
  };
});

import { generateMetadata } from './page';

describe('posts/[slug]/page', () => {
  it('generateMetadata returns title when post exists', async () => {
    const params = { params: Promise.resolve({ slug: 's' }) } as any;
    const md = await generateMetadata(params);
    expect(md.title).toBe('T');
  });
});
