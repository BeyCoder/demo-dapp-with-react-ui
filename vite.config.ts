import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'

// https://vitejs.dev/config/

export default defineConfig({
  base: process.env.GH_PAGES ? '/demo-dapp-with-react-ui/' : './',
  build: {
    outDir: 'docs'
  },
  // @ts-ignore
  plugins: [react()],
  server: {
    fs: {
      allow: ['../sdk', './'],
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis'
      },
      // Enable esbuild polyfill plugins
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true
        })
      ]
    }
  }
})
