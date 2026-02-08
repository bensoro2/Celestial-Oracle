import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
        proxy: {
          '/api/chat': {
            target: 'https://router.huggingface.co',
            changeOrigin: true,
            rewrite: () => '/v1/chat/completions',
            timeout: 120000,
            proxyTimeout: 120000,
          }
        }
      },
      plugins: [react()],
      define: {
        'process.env.HF_TOKEN': JSON.stringify(env.HF_TOKEN)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
