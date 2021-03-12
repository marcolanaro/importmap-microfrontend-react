import { defineConfig } from 'vite'
const path = require('path');

export default defineConfig({
  server: {
    cors: {
      origin: '*',
    },
    port: 5002,
  },
  build: {
    cssCodeSplit: true,
    lib: {
      entry: path.resolve(__dirname, 'src/index.js'),
      formats: ['system'],
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          'react': 'react',
          'react-dom': 'react-dom',
        }
      }
    }
  },
});
