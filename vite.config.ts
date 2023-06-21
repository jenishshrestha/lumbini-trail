import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';

svgr({
  //  A minimatch pattern, or array of patterns, which specifies the files in the build the plugin should include. By default all svg files will be included.
  include: 'src/assets/svgIcons/**/*.svg',
});

export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    watch: {
      usePolling: true,
    },
    host: true, // needed for the Docker Container port mapping to work
    strictPort: true,
    port: 3000, // you can replace this port with any port
  },
  define: {
    'process.env': {
      MAP_BOX_ACCESS_TOKEN:
        'pk.eyJ1IjoiamVycnlzaHJlc3RoYSIsImEiOiJjbGozdXJhcjAwcGp2M2pvMGNpZ3Z5cHp2In0.nNhUtM8bSN4oCgDNvXdz2A',
    },
  },
  envDir: 'env',
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
  build: {
    target: 'esnext',
  },
});
