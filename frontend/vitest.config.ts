import { defineConfig } from 'vitest/config';

export default defineConfig({
  root: '.',
  test: {
    include: ['**/*_test.{ts,tsx,js,mjs}', '**/*.test.{ts,tsx,js,mjs}'],
    environment: 'node',
    globals: true,
  },
});
