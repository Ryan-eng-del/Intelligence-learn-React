import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import externalGlobals from 'rollup-plugin-external-globals'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    externalGlobals({
      Aliplayer: 'Aliplayer',
      OSS: 'OSS',
      AliyunUpload: 'AliyunUpload'
    })
  ]
})
