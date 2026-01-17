import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock next/server NextResponse
vi.mock('next/server', () => ({
  NextResponse: {
    json: (payload: any, init?: any) => ({ payload, status: init?.status ?? 200 }),
  },
}));

// Mock PrismaClient
vi.mock('@prisma/client', () => ({
  PrismaClient: class {
    newsletter = { upsert: vi.fn().mockResolvedValue({ id: 'mock-id' }) };
    $disconnect = vi.fn().mockResolvedValue(undefined);
  },
}));

import * as route from './route';

describe('POST /api/newsletter', () => {
  it('returns success for valid email', async () => {
    const req = { json: async () => ({ email: 'test@example.com' }) } as any;
    const res = await route.POST(req);
    expect(res.payload.message).toBe('メルマガ登録が完了しました');
    expect(res.payload.id).toBe('mock-id');
  });

  it('returns 400 for empty email', async () => {
    const req = { json: async () => ({}) } as any;
    const res = await route.POST(req);
    expect(res.status).toBe(400);
    expect(res.payload).toHaveProperty('error');
  });
});
