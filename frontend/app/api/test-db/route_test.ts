import { describe, it, expect, vi } from 'vitest';

vi.mock('@prisma/client', () => ({
  PrismaClient: vi.fn().mockImplementation(() => ({
    $connect: vi.fn().mockResolvedValue(undefined),
    $disconnect: vi.fn().mockResolvedValue(undefined),
    newsletter: {
      count: vi.fn().mockResolvedValue(2),
      findMany: vi.fn().mockResolvedValue([{ id: 'a', email: 'a@example.com' }]),
    },
  })),
}));

vi.mock('next/server', () => ({ NextResponse: { json: (payload: any) => payload } }));

import * as route from './route';

describe('GET /api/test-db', () => {
  it('returns success and newsletters list', async () => {
    const res = await route.GET();
    expect(res).toHaveProperty('success', true);
    expect(res).toHaveProperty('count', 2);
    expect(res).toHaveProperty('newsletters');
    expect(res.newsletters[0].email).toBe('a@example.com');
  });
});
