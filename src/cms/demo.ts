import type { CmsComponent } from './types.ts'
import type { ContentData } from '../types.ts'
import { PATH_MENUS, PATH_TAXONOMIES_CATEGORIES } from '../constants.ts'

/** ダミー（モック）コーポレートサイトのデータを挿入する mixin。
 *
 *  方針（WordPress 風）:
 *  - 凝ったレイアウト（ヒーロー・カード等）は「テーマ」(home.hbs / styles.hbs) に記述する。
 *  - ページ本文は Editor.js（ブロックエディタ）で編集・保存しても壊れない要素だけで構成する
 *    （見出し h2/h3・段落 p・リスト ul/ol のみ。<style>/<div>/<table> は保存時に平坦化されるため使わない）。
 *  - トップページの本文は空（デザインは home.hbs 側）。 */

const ABOUT = `<p>サンプル株式会社は、お客様と社会の課題解決に取り組む総合ITソリューション企業です。</p>
<h2>会社概要</h2>
<ul>
<li>会社名：サンプル株式会社</li>
<li>設立：2010年4月1日</li>
<li>所在地：〒100-0001 東京都千代田区サンプル1-2-3 サンプルビル7F</li>
<li>資本金：5,000万円</li>
<li>代表者：代表取締役社長 山田 太郎</li>
<li>事業内容：ITコンサルティング／システム開発／クラウド導入支援</li>
<li>従業員数：120名（2024年4月現在）</li>
</ul>
<h2>私たちのミッション</h2>
<p>テクノロジーを通じて、人々の暮らしと企業活動をより豊かにする。それが私たちの使命です。お客様一人ひとりの課題に真摯に向き合い、最適な解決策を共に創り上げます。</p>
<h2>沿革</h2>
<ul>
<li>2010年：東京都千代田区にサンプル株式会社を設立</li>
<li>2014年：クラウド事業部を新設</li>
<li>2018年：大阪支社を開設</li>
<li>2022年：従業員数100名を突破</li>
<li>2024年：本社を移転、新オフィスを開設</li>
</ul>`

const SERVICES = `<p>お客様のビジネスを成長に導く、3つのサービスをご提供しています。</p>
<h2>ITコンサルティング</h2>
<p>経営課題の整理からDX戦略の立案、実行支援までを一貫してサポート。豊富な実績に基づき、最適なロードマップをご提案します。</p>
<h2>システム開発</h2>
<p>要件定義・設計・開発・テスト・運用保守までワンストップで対応。アジャイル開発にも柔軟に対応します。</p>
<h2>クラウド導入支援</h2>
<p>セキュアでスケーラブルなクラウド基盤の構築から移行、運用最適化までをご支援します。</p>`

const MESSAGE = `<p>このたびは当社のウェブサイトをご覧いただき、誠にありがとうございます。</p>
<p>私たちは創業以来、「テクノロジーで社会に貢献する」という理念のもと、お客様と共に歩んでまいりました。変化の激しい時代だからこそ、本質的な価値の提供にこだわり続けます。</p>
<p>これからも社員一同、誠実に、そして挑戦を恐れずに歩んでまいります。今後とも変わらぬご支援を賜りますようお願い申し上げます。</p>
<p>代表取締役社長 山田 太郎</p>`

const RECRUIT = `<p>私たちは、共に未来をつくる仲間を募集しています。</p>
<h2>募集要項</h2>
<ul>
<li>職種：ソフトウェアエンジニア／ITコンサルタント</li>
<li>雇用形態：正社員</li>
<li>勤務地：東京本社（リモート勤務可）</li>
<li>給与：経験・能力を考慮の上、当社規定により決定</li>
<li>待遇・福利厚生：各種社会保険完備／交通費支給／資格取得支援</li>
<li>休日休暇：完全週休2日制（土日）／祝日／年末年始／有給休暇</li>
</ul>
<p>ご応募・お問い合わせは、お問い合わせフォームよりお願いいたします。</p>`

const CONTACT = `<p>サービスに関するご相談・お見積もり・採用に関するお問い合わせはこちらから承ります。</p>
<h2>連絡先</h2>
<ul>
<li>電話：03-1234-5678（平日 9:00〜18:00）</li>
<li>メール：info@example.com</li>
<li>所在地：〒100-0001 東京都千代田区サンプル1-2-3</li>
</ul>
<p>お問い合わせフォームの設置は、外部フォームサービス等との連携をご検討ください。</p>`

const ACCESS = `<h2>アクセス</h2>
<ul>
<li>所在地：〒100-0001 東京都千代田区サンプル1-2-3 サンプルビル7F</li>
<li>最寄り駅：サンプル駅 A1出口より徒歩5分</li>
<li>受付時間：平日 9:00〜18:00</li>
</ul>`

const PRIVACY = `<p>サンプル株式会社（以下「当社」）は、お客様の個人情報を適切に保護することを社会的責務と考え、以下の方針に基づき個人情報の取り扱いを行います。</p>
<h2>1. 個人情報の取得</h2>
<p>当社は、適法かつ公正な手段によって個人情報を取得します。</p>
<h2>2. 利用目的</h2>
<p>取得した個人情報は、お問い合わせへの対応、サービスのご提供および改善のために利用します。</p>
<h2>3. 第三者提供</h2>
<p>当社は、法令に定める場合を除き、ご本人の同意なく個人情報を第三者に提供しません。</p>
<h2>4. 安全管理</h2>
<p>当社は、個人情報の漏えい・滅失・毀損の防止に努め、適切な安全管理措置を講じます。</p>
<h2>5. お問い合わせ</h2>
<p>個人情報の取り扱いに関するお問い合わせは、お問い合わせフォームよりご連絡ください。</p>
<p>※これはサンプルのプライバシーポリシーです。実際の運用に合わせて内容を修正してください。</p>`

/** ニュース本文（編集で壊れない段落のみ） */
const newsBody = (lead: string): string =>
  `<p>${lead}</p><p>詳細につきましては、本ページまたはお問い合わせ窓口までご確認ください。今後とも当社をよろしくお願いいたします。</p>`

export const demoMixin: Partial<CmsComponent> & ThisType<CmsComponent> = {
  /** ダミーのコーポレートサイト一式を挿入する。
   *  デザインはテーマ（home.hbs 等）側。本文は編集で壊れない単純コンテンツ。
   *  既存の同名ページ（ホーム・会社概要など）は上書きされる。 */
  async insertDummyData() {
    if (!this.fs || this.demoInserting) return
    if (!(await this.showConfirm(this.t('demo.confirm')))) return
    this.demoInserting = true
    try {
      const lang = this.languages.default || 'ja'
      const author = this.authorName || ''
      const meta = (date: string) => ({ createdAt: date, updatedAt: date, author })
      const page = (
        id: string,
        title: string,
        body: string,
        menuOrder: number,
      ): [string, ContentData] => [
        id,
        {
          id,
          title,
          body,
          status: 'published',
          menuOrder,
          _meta: meta('2024-04-01'),
        } as ContentData,
      ]

      // --- 固定ページ（トップ本文は空。デザインは home.hbs 側に記述） ---
      const pages: Array<[string, ContentData]> = [
        page('index', 'ホーム', '', 1),
        page('about', '会社概要', ABOUT, 2),
        page('services', '事業内容', SERVICES, 3),
        page('message', '代表挨拶', MESSAGE, 4),
        page('recruit', '採用情報', RECRUIT, 5),
        page('contact', 'お問い合わせ', CONTACT, 6),
        page('access', 'アクセス', ACCESS, 7),
        page('privacy', 'プライバシーポリシー', PRIVACY, 8),
      ]
      for (const [id, data] of pages) {
        await this.fs.savePage(id, lang, data)
      }

      // --- お知らせ（news） ---
      const news: Array<[string, string, string, string]> = [
        [
          'renewal',
          'コーポレートサイトをリニューアルしました',
          '2024-06-01',
          'このたび当社コーポレートサイトを全面リニューアルいたしました。',
        ],
        [
          'new-service',
          '新サービスの提供を開始しました',
          '2024-05-20',
          'クラウド導入支援サービスの提供を開始いたしました。',
        ],
        [
          'media',
          'メディアに掲載されました',
          '2024-05-08',
          '当社の取り組みが業界メディアにて紹介されました。',
        ],
        [
          'relocation',
          '本社移転のお知らせ',
          '2024-04-15',
          'このたび本社を移転し、新オフィスでの業務を開始いたしました。',
        ],
        [
          'recruit-open',
          '2025年度 新卒採用を開始しました',
          '2024-04-02',
          '2025年度の新卒採用エントリーの受付を開始いたしました。',
        ],
        [
          'holiday',
          'ゴールデンウィーク休業のお知らせ',
          '2024-04-01',
          '誠に勝手ながら、下記の期間を休業とさせていただきます。',
        ],
      ]
      for (const [id, title, date, lead] of news) {
        const data = {
          id,
          title,
          body: newsBody(lead),
          status: 'published',
          publishedAt: date,
          category: 'info',
          _meta: meta(date),
        } as ContentData
        await this.fs.saveContent('news', id, lang, data)
      }

      // --- メニュー（メイン） ---
      const mi = (id: string, label: string, url: string, order: number) => ({
        id,
        label,
        type: 'custom',
        url,
        order,
        parent: '',
      })
      await this.fs.writeJson(PATH_MENUS, {
        menus: [
          {
            id: 'main',
            name: 'メインメニュー',
            items: [
              mi('m1', 'ホーム', '/', 1),
              mi('m2', '会社概要', '/about/', 2),
              mi('m3', '事業内容', '/services/', 3),
              mi('m4', '採用情報', '/recruit/', 4),
              mi('m5', 'お知らせ', '/news/', 5),
              mi('m6', 'お問い合わせ', '/contact/', 6),
            ],
          },
        ],
      })

      // --- カテゴリ（お知らせ用） ---
      await this.fs.writeJson(PATH_TAXONOMIES_CATEGORIES, {
        items: [
          { id: 'press', label: 'プレスリリース' },
          { id: 'info', label: 'お知らせ' },
          { id: 'event', label: 'イベント' },
        ],
      })

      // データを再読込して反映し、サイト全体プレビューで結果を表示
      await this.loadSiteData()
      this.showToast(this.t('demo.inserted'), 5000)
      await this.openSitePreview()
    } catch (e) {
      console.error('ダミーデータ挿入エラー:', e)
      this.showToast(this.t('demo.failed'))
    } finally {
      this.demoInserting = false
    }
  },
}
