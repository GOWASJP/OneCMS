/**
 * 初回起動時に書き出される既定テーマ（themes/default/）一式。
 *
 * すべて themes/default/ ディレクトリの実ファイルを Vite の ?raw で取り込んでいるので、
 * 開発時にファイルを編集すればそのままバンドルに反映される。テーマは「差し替え可能な
 * パッケージ」で、既定テーマもその 1 つ（特別扱いしない）。製作者は新規インストール後に
 * サイドバーの「テンプレート」から編集でき、themes/ に別フォルダを置けば切り替えられる。
 */

import themeJson from '../themes/default/theme.json?raw'
import baseHbs from '../themes/default/_base.hbs?raw'
import pageHbs from '../themes/default/page.hbs?raw'
import listHbs from '../themes/default/list.hbs?raw'
import detailHbs from '../themes/default/detail.hbs?raw'
import homeHbs from '../themes/default/home.hbs?raw'

import headHbs from '../themes/default/_components/head.hbs?raw'
import headerHbs from '../themes/default/_components/header.hbs?raw'
import footerHbs from '../themes/default/_components/footer.hbs?raw'
import navHbs from '../themes/default/_components/nav.hbs?raw'
import breadcrumbHbs from '../themes/default/_components/breadcrumb.hbs?raw'
import paginationHbs from '../themes/default/_components/pagination.hbs?raw'
import stylesHbs from '../themes/default/_components/styles.hbs?raw'
import accordionHbs from '../themes/default/_components/accordion.hbs?raw'
import cardListHbs from '../themes/default/_components/card-list.hbs?raw'
import galleryHbs from '../themes/default/_components/gallery.hbs?raw'
import heroHbs from '../themes/default/_components/hero.hbs?raw'
import tabsHbs from '../themes/default/_components/tabs.hbs?raw'
import timelineHbs from '../themes/default/_components/timeline.hbs?raw'
import seoHbs from '../themes/default/_components/seo.hbs?raw'

/** 既定テーマのフォルダ id（プロジェクトフォルダ内 themes/<id>/） */
export const DEFAULT_THEME_ID = 'default'

/** 相対パス → 内容 のマップ。ensureInitialData でそのまま書き出される */
export const INITIAL_TEMPLATES: Record<string, string> = {
  'themes/default/theme.json': themeJson,
  'themes/default/_base.hbs': baseHbs,
  'themes/default/page.hbs': pageHbs,
  'themes/default/list.hbs': listHbs,
  'themes/default/detail.hbs': detailHbs,
  'themes/default/home.hbs': homeHbs,

  'themes/default/_components/head.hbs': headHbs,
  'themes/default/_components/header.hbs': headerHbs,
  'themes/default/_components/footer.hbs': footerHbs,
  'themes/default/_components/nav.hbs': navHbs,
  'themes/default/_components/breadcrumb.hbs': breadcrumbHbs,
  'themes/default/_components/pagination.hbs': paginationHbs,
  'themes/default/_components/styles.hbs': stylesHbs,
  'themes/default/_components/accordion.hbs': accordionHbs,
  'themes/default/_components/card-list.hbs': cardListHbs,
  'themes/default/_components/gallery.hbs': galleryHbs,
  'themes/default/_components/hero.hbs': heroHbs,
  'themes/default/_components/tabs.hbs': tabsHbs,
  'themes/default/_components/timeline.hbs': timelineHbs,
  'themes/default/_components/seo.hbs': seoHbs,
}
