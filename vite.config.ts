/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

/**
 * Vite configuration for Drey.
 *
 * The app ships as an installable, offline-capable PWA. All user data lives
 * on-device (IndexedDB); the build serves only static assets, so a single
 * deployment reaches every install without a per-user backend.
 */
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.svg'],
      manifest: {
        name: 'Drey',
        short_name: 'Drey',
        description: 'Holds your projects. Holds its tongue.',
        // Off-white surface and near-black ink from DESIGN.md.
        background_color: '#f8f6f6',
        theme_color: '#f8f6f6',
        display: 'standalone',
        start_url: '/',
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
          {
            src: 'icon-512-maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
  test: {
    environment: 'node',
    globals: true,
    include: ['src/**/*.test.ts'],
  },
});
