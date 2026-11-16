import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { resolve } from 'node:path'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, resolve(process.cwd(), 'src'), '')
  const apiKey = env.VITE_OMDB_API_KEY

  if (mode === 'development' && !apiKey) {
    throw new Error('Missing VITE_OMDB_API_KEY in src/.env.local')
  }

  return {
    plugins: [
      react(),
      babel({ presets: [reactCompilerPreset()] })
    ],
    server: {
      proxy: {
        '/api/omdb': {
          target: 'https://www.omdbapi.com',
          changeOrigin: true,
          configure(proxy) {
            proxy.on('proxyReq', (proxyReq, req) => {
              const requestUrl = new URL(req.url, 'http://localhost')
              requestUrl.searchParams.set('apikey', apiKey)
              proxyReq.path = `/?${requestUrl.searchParams.toString()}`
            })
          }
        }
      }
    }
  }
})
