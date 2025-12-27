import { describe, it, expect, vi } from 'vitest';

// Ensure prisma export exists and has $disconnect
vi.mock('@prisma/client', () => ({
  PrismaClient: vi.fn().mockImplementation(() => ({
    $disconnect: vi.fn().mockResolvedValue(undefined),
  })),
}));

import { prisma } from './prisma';

describe('lib/prisma', () => {
  it('exports prisma with $disconnect', async () => {
    expect(prisma).toBeDefined();
    expect(typeof (prisma as any).$disconnect).toBe('function');
    await (prisma as any).$disconnect();
  });
});
