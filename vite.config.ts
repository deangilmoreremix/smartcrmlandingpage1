import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({ 
      open: false, // Set to true if you want it to open automatically
      filename: 'bundle-analysis.html',
      gzipSize: true,
      brotliSize: true
    })
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
