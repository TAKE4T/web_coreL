import { defineConfig } from '"'"'vitest/config'"'"';
import { resolve } from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname),
    },
  },
  test: {
    include: ['**/*_test.{ts,tsx,js,mjs}', '**/*.test.{ts,tsx,js,mjs}'],
    environment: 'node',
    globals: true,
  },
});
