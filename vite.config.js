import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      includeAssets: ['fonts/*.ttf', 'site.webmanifest', 'favicon.ico', 'favicon-32x32.png', 'favicon-16x16.png'],
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import './src/style/main.scss';@import './src/style/components.scss';@import './src/style/fonts.scss';`,
      },
    },
  },
});
