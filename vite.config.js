import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'
import { renameSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

export default defineConfig({
  plugins: [
    tailwindcss(),
    viteSingleFile(),
    {
      // ビルド成果物（単一ファイル）を build/index.html → build/onecms.html にリネーム。
      // 開発サーバー（vite dev）では closeBundle が呼ばれないため影響なし。
      name: 'rename-build-output',
      closeBundle() {
        const src = resolve('build/index.html')
        const dest = resolve('build/onecms.html')
        if (existsSync(src)) renameSync(src, dest)
      },
    },
  ],
  build: {
    outDir: 'build',
    emptyOutDir: true,
  },
})
