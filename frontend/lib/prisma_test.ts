import { describe, it, expect, vi } from 'vitest';

// Ensure prisma export exists and has $disconnect
vi.mock('@prisma/client', () => {
  return {
    PrismaClient: class {
      $disconnect = vi.fn().mockResolvedValue(undefined);
      $connect = vi.fn().mockResolvedValue(undefined);
      newsletter = { upsert: vi.fn().mockResolvedValue({ id: 'mock-id' }) };
    },
  };
});

import { prisma } from './prisma';

describe('lib/prisma', () => {
  it('exports prisma with $disconnect', async () => {
    expect(prisma).toBeDefined();
    expect(typeof (prisma as any).$disconnect).toBe('function');
    await (prisma as any).$disconnect();
  });
});
