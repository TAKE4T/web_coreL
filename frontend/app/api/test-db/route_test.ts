import { describe, it, expect, vi } from 'vitest';

vi.mock('@prisma/client', () => ({
  PrismaClient: class {
    $connect = vi.fn().mockResolvedValue(undefined);
    $disconnect = vi.fn().mockResolvedValue(undefined);
    newsletter = {
      count: vi.fn().mockResolvedValue(2),
      findMany: vi.fn().mockResolvedValue([{ id: 'a', email: 'a@example.com' }]),
    };
  },
}));

vi.mock('next/server', () => ({ NextResponse: { json: (payload: any) => payload } }));

import * as route from './route';

describe('GET /api/test-db', () => {
  it('returns success and newsletters list', async () => {
    const res = await route.GET();
    const data = (res as any).payload ?? res;
    expect(data).toHaveProperty('success', true);
    expect(data).toHaveProperty('count', 2);
    expect(data).toHaveProperty('newsletters');
    expect(data.newsletters[0].email).toBe('a@example.com');
  });
});
