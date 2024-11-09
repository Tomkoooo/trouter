import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'DynamicRouter',
      fileName: (format) => `dynamic-router.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom'], // Ezektől nem fogunk bundle-t készíteni
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        }
      }
    }
  }
});
