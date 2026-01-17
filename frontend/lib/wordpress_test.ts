import { describe, it, expect, vi } from 'vitest';

// Mock GraphQL client
vi.mock('graphql-request', () => ({
  gql: (s: any) => s,
  GraphQLClient: class {
    request = vi.fn().mockResolvedValue({ categories: { nodes: [{ id: '1', databaseId: 1, count: 2, description: '', name: 'Cat', slug: 'cat' }] } });
  },
}));

import { getCategories } from './wordpress';

describe('lib/wordpress', () => {
  it('getCategories returns categories array', async () => {
    const cats = await getCategories();
    expect(Array.isArray(cats)).toBe(true);
    expect(cats[0].slug).toBe('cat');
  });
});
