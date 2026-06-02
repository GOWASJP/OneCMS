# Pro オーバーレイ開発ガイド

Pro 版を **無料コア（この公開リポジトリ）をフォークせず**、別の **非公開リポジトリ** で「上積み（オーバーレイ）」して開発・ビルドするための手順。

## 方針

- 無料コア = この公開リポ（MIT）。Pro のソースは **一切ここに置かない**。
- Pro = 非公開リポ。無料コアを **git submodule**（または依存）として取り込み、拡張ポイントに Pro 実装を差し込んでビルドする。
- 成果物は `cms-pro.html`（単一ファイル・オフライン動作は無料版と同じ）。

## 無料コア側に用意した拡張ポイント

`src/cms/extensions.ts`（無料コアでは中身が空）。Pro はこの内容を差し替える。

| エクスポート            | 役割                                                                            |
| ----------------------- | ------------------------------------------------------------------------------- |
| `extensionMixin`        | コンポーネントへ合成される追加メソッド・状態（`main.ts` が spread）             |
| `extensionNavItems`     | サイドバーに追加するナビ項目（`{ id, label, icon, view }[]`）                   |
| `runExtensionInit(cms)` | 起動時に一度呼ばれる初期化フック（Handlebars ヘルパー登録・追加データ読込など） |

加えて、エディション/ライセンスの仕組みは無料コアに実装済み:

- `EDITION`（`VITE_EDITION=pro`）/ `LICENSE_ID`（`VITE_LICENSE_ID=<顧客ID>`）
- 書き出し HTML への generator メタ + ライセンスID + カナリア注入（`src/export.ts`）

## 非公開 Pro リポの構成例

```
onecms-pro/                （非公開）
├── core/                  ← 無料コアを git submodule で取り込み（この公開リポ）
├── pro/
│   ├── extensions.ts      ← extensionMixin / extensionNavItems / runExtensionInit の Pro 実装
│   ├── views/             ← Pro 機能の Alpine UI 部分（HTML 断片）
│   └── ...                ← アクセシビリティ点検・CSV 入出力 等の Pro 機能本体
├── index.html             ← core の UI に Pro ビューを足したもの（後述）
├── vite.config.js
└── package.json
```

## ビルド手順（オーバーレイ）

Pro リポのビルド前処理で、無料コアの 2 つの「差し込み口」を上書きする。

```jsonc
// package.json (Pro リポ)
{
  "scripts": {
    "prebuild": "cp pro/extensions.ts core/src/cms/extensions.ts && cp index.html core/index.html",
    "build": "cross-env VITE_EDITION=pro VITE_LICENSE_ID=$LICENSE_ID vite build",
    "dist": "npm run prebuild && npm run build",
  },
}
```

- `pro/extensions.ts` → `core/src/cms/extensions.ts` を上書き（振る舞いの差し込み）
- `index.html`（Pro 版 UI）→ `core/index.html` を上書き（画面の差し込み）
- `VITE_EDITION=pro` でエディション、`VITE_LICENSE_ID` で顧客 ID を埋め込む
- vite はコアの `vite.config.js`（singlefile）を使うため、出力は単一ファイル

> submodule を汚さない運用にしたい場合は、`prebuild` で core を一時ディレクトリへコピーしてから上書き・ビルドするとよい。

## UI（画面）の追加方法

`index.html` は単一の静的ファイルのため、Pro 画面は次のいずれかで足す:

1. **index.html を Pro 版として保持**（推奨・確実）
   - core の `index.html` をベースに、Pro ビューの `<template x-if="view === 'pro-xxx'">…</template>` を追記したものを Pro リポで管理。
   - サイドバー項目は `extensionNavItems` に `{ id, label, icon, view: 'pro-xxx' }` を追加すれば自動でボタンが出る（core 側で対応済み）。
2. **runExtensionInit で DOM を注入**（UI が小さい場合）
   - 起動時にコンテナへ Pro 用の要素を差し込む。

## 振る舞いの追加方法

`pro/extensions.ts` で実装する。`this` は `CmsComponent` 型。

```ts
import type { CmsComponent } from '../core/src/cms/types.ts'

export const extensionMixin: Partial<CmsComponent> & ThisType<CmsComponent> = {
  // 例: Pro 機能のメソッド・状態を追加
  async runAccessibilityCheck() {
    /* 生成 HTML を解析して JIS X 8341 観点でチェック … */
  },
}

export const extensionNavItems = [
  { id: 'a11y', label: 'アクセシビリティ点検', icon: 'shield-check', view: 'pro-a11y' },
]

export async function runExtensionInit(_cms: CmsComponent): Promise<void> {
  // Handlebars ヘルパー登録・追加データ読込など
}
```

> 注意: 追加で使う Lucide アイコンは、core の `src/icons.ts` に export がある名前を使うか、Pro 側で同様に用意する（無いと描画されない）。

## 配布・ライセンス

- Pro ビルド時に **顧客ごとに `VITE_LICENSE_ID` を変えて**ビルド → 書き出し HTML に透かしが入り、流出元を特定できる。
- 配布は購入者限定（署名付き）。詳細は `docs/EDITIONS.md` を参照。
