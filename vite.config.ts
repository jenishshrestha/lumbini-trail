import { defineConfig, loadEnv } from 'vite';
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
    port: 3006, // you can replace this port with any port
  },
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
  build: {
    target: 'esnext',
  },
});
