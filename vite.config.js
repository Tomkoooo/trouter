import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts'; // DTS generálása

export default defineConfig({
  plugins: [dts()],
  build: {
    lib: {
      entry: 'src/index.ts', // A belépési pont
      name: 'DynamicRouter', // Az exportált objektum neve
      fileName: (format) => `index.${format}.js`, // Output fájlok neve
    },
    rollupOptions: {
      external: ['react', 'react-dom'], // Azokat a könyvtárakat nem bundleráljuk
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
        format: ['cjs', 'esm'], // CJS és ESM formátumok
      },
    },
    sourcemap: true, // Forrás térkép engedélyezése
    clean: true, // Az output mappa törlésének engedélyezése
  },
});
