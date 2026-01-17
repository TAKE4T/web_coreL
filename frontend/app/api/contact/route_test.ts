import { describe, it, expect, vi } from 'vitest';

// Set required env vars for the contact API
process.env.EMAIL_USER = 'test@example.com';
process.env.EMAIL_PASS = 'pass';
process.env.EMAIL_TO = 'test@example.com';

// Mock nodemailer
vi.mock('nodemailer', () => ({
  default: {
    createTransport: vi.fn().mockReturnValue({
      sendMail: vi.fn().mockResolvedValue({ messageId: 'm-id' }),
    }),
  },
}));

vi.mock('next/server', () => ({
  NextResponse: {
    json: (payload: any, init?: any) => ({ payload, status: init?.status ?? 200 }),
  },
}));

import * as route from './route';

describe('POST /api/contact', () => {
  it('succeeds with valid payload', async () => {
    const req = { json: async () => ({ name: 'Taro', email: 'taro@example.com', message: 'Hi' }) } as any;
    const res = await route.POST(req);
    const data = (res as any).payload ?? res;
    expect(data.success).toBe(true);
    expect(data).toHaveProperty('messageId');
  });

  it('returns 400 if required fields missing', async () => {
    const req = { json: async () => ({ name: '', email: '', message: '' }) } as any;
    const res = await route.POST(req);
    const data = (res as any).payload ?? res;
    expect((res as any).status).toBe(400);
    expect(data).toHaveProperty('error');
  });
});
