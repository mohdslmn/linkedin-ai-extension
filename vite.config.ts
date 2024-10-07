import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'src/manifest.json',
          dest: '.',  // Copies manifest to the dist folder
        },
        {
          src: 'public/icon.png', // Copy the specific icon file to the dist
          dest: '.', 
        },
        {
          src: 'public/*', // Ensure all other assets are also copied
          dest: '.',
        },
        {
          src: 'src/content.ts', // Copy content.js to the dist folder
          dest: '.', 
          rename: 'content.js'
        },
        {
          src: 'src/background.ts', // Copy content.js to the dist folder
          dest: '.', 
          rename: 'background.js'
        },
      ],
    }),
  ],
});
