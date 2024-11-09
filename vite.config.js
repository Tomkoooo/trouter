import { defineConfig } from 'vite';
import dts from 'rollup-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'DynamicRouter',
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
      plugins: [
        dts(),  // Add this to generate the .d.ts file
      ]
    }
  }
});
