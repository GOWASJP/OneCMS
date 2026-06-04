import type { FileSystem } from './fs.ts'
import type { ImageOptions, ImageSaveResult } from './types.ts'
import {
  IMAGE_MAX_WIDTH,
  IMAGE_QUALITY,
  IMAGE_FORMAT,
  PATH_ASSETS_ORIGINALS,
  PATH_ASSETS_IMAGES,
} from './constants.ts'

const DEFAULTS: Required<ImageOptions> = {
  maxWidth: IMAGE_MAX_WIDTH,
  quality: IMAGE_QUALITY,
  format: IMAGE_FORMAT,
}

interface OptimizeResult {
  blob: Blob
  filename: string
  original: File
  width: number
  height: number
}

/** アセット用に ASCII 安全な（URL/FTP/ZIP で文字化けしない）ベース名へ変換する。
 *  日本語などの非ASCII文字はファイル名・URL・一部のFTP/ZIPツールで文字化けの原因に
 *  なるため除去し、何も残らない場合は衝突しにくいフォールバック名を使う。 */
export function sanitizeAssetBaseName(name: string): string {
  const base = name.replace(/\.[^.]+$/, '')
  const slug = base
    .normalize('NFKD') // アクセント付きラテン文字などをASCII化しやすく分解
    .replace(/[^\x20-\x7E]/g, '') // 非ASCII（日本語など）を除去
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, '-') // 安全な文字以外は - に置換
    .replace(/-+/g, '-')
    .replace(/^[-._]+|[-._]+$/g, '')
  return slug || `image-${Date.now().toString(36)}`
}

/** 拡張子を ASCII 小文字の安全な形に正規化（取得できなければ空文字） */
function sanitizeExt(name: string): string {
  const m = name.match(/\.([^.]+)$/)
  if (!m) return ''
  const ext = m[1].toLowerCase().replace(/[^a-z0-9]/g, '')
  return ext ? `.${ext}` : ''
}

/** アップロードファイル名を ASCII 安全なファイル名（ベース名＋拡張子）に変換 */
export function safeAssetFilename(name: string): string {
  return sanitizeAssetBaseName(name) + sanitizeExt(name)
}

/** 画像ファイルを最適化 */
export async function optimizeImage(
  file: File,
  options: ImageOptions = {},
): Promise<OptimizeResult> {
  const opts = { ...DEFAULTS, ...options }

  const bitmap = await createImageBitmap(file)

  let { width, height } = bitmap
  if (width > opts.maxWidth) {
    height = Math.round(height * (opts.maxWidth / width))
    width = opts.maxWidth
  }

  const canvas = new OffscreenCanvas(width, height)
  const ctx = canvas.getContext('2d')!
  ctx.drawImage(bitmap, 0, 0, width, height)
  bitmap.close()

  const blob = await canvas.convertToBlob({
    type: opts.format,
    quality: opts.quality,
  })

  const baseName = sanitizeAssetBaseName(file.name)
  const ext = opts.format === 'image/webp' ? 'webp' : 'png'
  const filename = `${baseName}.${ext}`

  return { blob, filename, original: file, width, height }
}

/** 画像をCMSに保存（最適化 + 元画像バックアップ） */
export async function saveImage(
  fs: FileSystem,
  file: File,
  options: ImageOptions = {},
): Promise<ImageSaveResult> {
  const result = await optimizeImage(file, options)
  // 最適化画像と同じ安全なベース名＋元拡張子で元画像をバックアップ（文字化け防止）
  const safeBase = result.filename.replace(/\.[^.]+$/, '')
  const originalBuffer = await file.arrayBuffer()
  await fs.writeBlob(
    `${PATH_ASSETS_ORIGINALS}/${safeBase}${sanitizeExt(file.name)}`,
    new Blob([originalBuffer]),
  )

  const savePath = `${PATH_ASSETS_IMAGES}/${result.filename}`
  await fs.writeBlob(savePath, result.blob)

  const dataUrl = await blobToDataUrl(result.blob)

  return {
    path: savePath,
    filename: result.filename,
    width: result.width,
    height: result.height,
    size: result.blob.size,
    originalSize: file.size,
    blobUrl: dataUrl,
  }
}

/** BlobをBase64 Data URLに変換 */
function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}
