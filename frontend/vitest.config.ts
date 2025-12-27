import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['**/*_test.{ts,tsx,js,mjs}'],
    environment: 'node',
    globals: true,
  },
});
