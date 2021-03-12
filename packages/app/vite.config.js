import { defineConfig } from 'vite'
const path = require('path');

export default defineConfig({
  server: {
    cors: {
      origin: '*',
    },
    port: 5001,
  },
  build: {
    cssCodeSplit: true,
    lib: {
      entry: path.resolve(__dirname, 'src/main.jsx'),
      formats: ['system'],
    },
    rollupOptions: {
      external: ['react', 'react-dom', '@foo/ui'],
      output: {
        globals: {
          'react': 'react',
          'react-dom': 'react-dom',
        }
      }
    }
  },
});
