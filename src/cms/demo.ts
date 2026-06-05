import type { CmsComponent } from './types.ts'
import type { ContentData } from '../types.ts'
import { PATH_MENUS, PATH_TAXONOMIES_CATEGORIES } from '../constants.ts'

/** ダミー（モック）コーポレートサイトのデータを挿入する mixin。
 *  画像は使わず、スケルトン（グレーのプレースホルダ）で表現する。 */

/** 各ページ本文の先頭に1度だけ差し込むスケルトン用スタイル。テーマに依存せず見た目が出るよう自己完結。 */
const SK = `<style>
.sk-img{background:#eef2f7;border:1px dashed #cbd5e1;border-radius:12px;width:100%;aspect-ratio:16/9;display:flex;align-items:center;justify-content:center}
.sk-img::after{content:attr(data-label);color:#94a3b8;font-size:.8em;letter-spacing:.15em}
.sk-img.sq{aspect-ratio:1/1}
.sk-img.wide{aspect-ratio:24/9}
.sk-hero{background:#f1f5f9;border-radius:16px;padding:3.5em 1.5em;text-align:center;margin-bottom:2.5em}
.sk-lead{color:#475569;font-size:1.05em}
.sk-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1.5em;margin:1.5em 0}
.sk-card{border:1px solid #e5e7eb;border-radius:12px;padding:1.25em 1.4em;background:#fff}
.sk-num{font-size:2.2em;font-weight:800;color:#bfdbfe;line-height:1;margin-bottom:.2em}
.sk-cta{background:#1d4ed8;color:#fff;border-radius:16px;padding:2.5em 1.5em;text-align:center;margin:2.5em 0}
.sk-cta h2{color:#fff}
.sk-cta a{display:inline-block;background:#fff;color:#1d4ed8;padding:.7em 1.7em;border-radius:8px;font-weight:700;margin-top:1em}
.sk-table{width:100%;border-collapse:collapse;margin:1em 0}
.sk-table th{width:32%;background:#f8fafc;text-align:left;padding:.8em 1em;border:1px solid #e5e7eb;white-space:nowrap;vertical-align:top}
.sk-table td{padding:.8em 1em;border:1px solid #e5e7eb}
.sk-media{display:grid;grid-template-columns:1fr 1.4fr;gap:1.5em;align-items:center;margin:1.5em 0}
.sk-form{display:grid;gap:1em;max-width:560px}
.sk-input{height:2.6em;background:#f1f5f9;border:1px solid #e5e7eb;border-radius:8px}
.sk-input.area{height:7em}
.sk-btn{display:inline-block;background:#cbd5e1;color:#fff;border-radius:8px;padding:.7em 2em;text-align:center;font-weight:700;width:max-content}
.sk-note{color:#94a3b8;font-size:.85em}
@media(max-width:640px){.sk-media{grid-template-columns:1fr}}
</style>`

// 画像プレースホルダ。ラベルは data-label + CSS ::after で表示し、本文テキスト（抜粋）には含めない。
const img = (label = 'IMAGE', cls = ''): string =>
  `<div class="sk-img ${cls}" data-label="${label}"></div>`

/** ホーム（フロントページ）本文。home.hbs が末尾にお知らせ一覧を自動付与する。 */
const HOME = `${SK}
<div class="sk-hero">
  <h1>未来を、確かなかたちに。</h1>
  <p class="sk-lead">私たちはテクノロジーとデザインの力で、お客様のビジネスの成長を支援します。</p>
</div>
<div class="sk-grid">
  <div class="sk-card"><div class="sk-num">01</div><h3>確かな技術力</h3><p>長年培った知見と最新技術で、最適なソリューションをご提供します。</p></div>
  <div class="sk-card"><div class="sk-num">02</div><h3>伴走するサポート</h3><p>導入から運用まで、専任チームが一貫してサポートします。</p></div>
  <div class="sk-card"><div class="sk-num">03</div><h3>柔軟な対応力</h3><p>お客様の課題に合わせて、最適なプランをご提案します。</p></div>
</div>
<h2>事業内容</h2>
<div class="sk-grid">
  <div class="sk-card">${img()}<h3 style="margin-top:.7em">ITコンサルティング</h3><p>経営課題に寄り添い、DX戦略の立案から実行までを支援します。</p></div>
  <div class="sk-card">${img()}<h3 style="margin-top:.7em">システム開発</h3><p>要件定義から運用保守まで、ワンストップで対応します。</p></div>
  <div class="sk-card">${img()}<h3 style="margin-top:.7em">クラウド導入支援</h3><p>セキュアでスケーラブルな基盤構築をご支援します。</p></div>
</div>
<div class="sk-cta">
  <h2>お気軽にご相談ください</h2>
  <p>サービスに関するご質問・お見積もりはお問い合わせフォームから承ります。</p>
  <a href="/contact/">お問い合わせ</a>
</div>`

const ABOUT = `${SK}
<p class="sk-lead">サンプル株式会社は、お客様と社会の課題解決に取り組む総合ITソリューション企業です。</p>
<h2>会社概要</h2>
<table class="sk-table">
  <tr><th>会社名</th><td>サンプル株式会社</td></tr>
  <tr><th>設立</th><td>2010年4月1日</td></tr>
  <tr><th>所在地</th><td>〒100-0001 東京都千代田区サンプル1-2-3 サンプルビル7F</td></tr>
  <tr><th>資本金</th><td>5,000万円</td></tr>
  <tr><th>代表者</th><td>代表取締役社長 山田 太郎</td></tr>
  <tr><th>事業内容</th><td>ITコンサルティング／システム開発／クラウド導入支援</td></tr>
  <tr><th>従業員数</th><td>120名（2024年4月現在）</td></tr>
</table>
<h2>私たちのミッション</h2>
<p>テクノロジーを通じて、人々の暮らしと企業活動をより豊かにする。それが私たちの使命です。お客様一人ひとりの課題に真摯に向き合い、最適な解決策を共に創り上げます。</p>
<h2>沿革</h2>
<table class="sk-table">
  <tr><th>2010年</th><td>東京都千代田区にサンプル株式会社を設立</td></tr>
  <tr><th>2014年</th><td>クラウド事業部を新設</td></tr>
  <tr><th>2018年</th><td>大阪支社を開設</td></tr>
  <tr><th>2022年</th><td>従業員数100名を突破</td></tr>
  <tr><th>2024年</th><td>本社を移転、新オフィスを開設</td></tr>
</table>`

const SERVICES = `${SK}
<p class="sk-lead">お客様のビジネスを成長に導く、3つのサービスをご提供しています。</p>
<div class="sk-media">${img()}<div><h2>ITコンサルティング</h2><p>経営課題の整理からDX戦略の立案、実行支援までを一貫してサポート。豊富な実績に基づき、最適なロードマップをご提案します。</p></div></div>
<div class="sk-media"><div><h2>システム開発</h2><p>要件定義・設計・開発・テスト・運用保守までワンストップで対応。アジャイル開発にも柔軟に対応します。</p></div>${img()}</div>
<div class="sk-media">${img()}<div><h2>クラウド導入支援</h2><p>セキュアでスケーラブルなクラウド基盤の構築から移行、運用最適化までをご支援します。</p></div></div>
<div class="sk-cta"><h2>サービスの詳細はお問い合わせください</h2><a href="/contact/">お問い合わせ</a></div>`

const MESSAGE = `${SK}
<div class="sk-media" style="grid-template-columns:220px 1fr">
  ${img('代表写真', 'sq')}
  <div>
    <p>このたびは当社のウェブサイトをご覧いただき、誠にありがとうございます。</p>
    <p>私たちは創業以来、「テクノロジーで社会に貢献する」という理念のもと、お客様と共に歩んでまいりました。変化の激しい時代だからこそ、本質的な価値の提供にこだわり続けます。</p>
    <p>これからも社員一同、誠実に、そして挑戦を恐れずに歩んでまいります。今後とも変わらぬご支援を賜りますようお願い申し上げます。</p>
    <p style="text-align:right;margin-top:1.5em">代表取締役社長&#12288;山田 太郎</p>
  </div>
</div>`

const RECRUIT = `${SK}
<p class="sk-lead">私たちは、共に未来をつくる仲間を募集しています。</p>
<h2>募集要項</h2>
<table class="sk-table">
  <tr><th>職種</th><td>ソフトウェアエンジニア／ITコンサルタント</td></tr>
  <tr><th>雇用形態</th><td>正社員</td></tr>
  <tr><th>勤務地</th><td>東京本社（リモート勤務可）</td></tr>
  <tr><th>給与</th><td>経験・能力を考慮の上、当社規定により決定</td></tr>
  <tr><th>待遇・福利厚生</th><td>各種社会保険完備／交通費支給／書籍購入支援／資格取得支援</td></tr>
  <tr><th>休日休暇</th><td>完全週休2日制（土日）／祝日／年末年始／有給休暇</td></tr>
</table>
<div class="sk-cta"><h2>エントリーはこちら</h2><p>まずはお気軽にご応募ください。</p><a href="/contact/">応募する</a></div>`

const CONTACT = `${SK}
<p class="sk-lead">サービスに関するご相談・お見積もり・採用に関するお問い合わせはこちらから。</p>
<table class="sk-table">
  <tr><th>電話</th><td>03-1234-5678（平日 9:00〜18:00）</td></tr>
  <tr><th>メール</th><td>info@example.com</td></tr>
  <tr><th>所在地</th><td>〒100-0001 東京都千代田区サンプル1-2-3</td></tr>
</table>
<h2>お問い合わせフォーム</h2>
<div class="sk-form">
  <div><label>お名前</label><div class="sk-input"></div></div>
  <div><label>メールアドレス</label><div class="sk-input"></div></div>
  <div><label>お問い合わせ内容</label><div class="sk-input area"></div></div>
  <div class="sk-btn">送信する</div>
</div>
<p class="sk-note">※これはモックの入力フォームです。実際の送信機能は外部フォームサービス等と連携してください。</p>`

const ACCESS = `${SK}
<table class="sk-table">
  <tr><th>所在地</th><td>〒100-0001 東京都千代田区サンプル1-2-3 サンプルビル7F</td></tr>
  <tr><th>最寄り駅</th><td>サンプル駅 A1出口より徒歩5分</td></tr>
  <tr><th>受付時間</th><td>平日 9:00〜18:00</td></tr>
</table>
<div class="sk-img wide" style="margin-top:1.5em" data-label="MAP"></div>`

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
<p class="sk-note">※これはサンプルのプライバシーポリシーです。実際の運用に合わせて内容を修正してください。</p>`

/** ニュース本文（スケルトン画像＋本文） */
const newsBody = (lead: string): string =>
  `${SK}<div class="sk-img" style="margin-bottom:1.5em" data-label="IMAGE"></div><p>${lead}</p><p>詳細につきましては、本ページまたはお問い合わせ窓口までご確認ください。今後とも当社をよろしくお願いいたします。</p>`

export const demoMixin: Partial<CmsComponent> & ThisType<CmsComponent> = {
  /** ダミーのコーポレートサイト一式を挿入する。画像は使わずスケルトンで表現。
   *  既存の同名ページ（ホーム・会社概要など）は上書きされる。 */
  async insertDummyData() {
    if (!this.fs || this.demoInserting) return
    if (!(await this.showConfirm(this.t('demo.confirm')))) return
    this.demoInserting = true
    try {
      const lang = this.languages.default || 'ja'
      const author = this.authorName || ''
      const meta = (date: string) => ({ createdAt: date, updatedAt: date, author })

      // --- 固定ページ ---
      const pages: Array<[string, ContentData]> = [
        [
          'index',
          {
            id: 'index',
            title: 'ホーム',
            body: HOME,
            status: 'published',
            menuOrder: 1,
            _meta: meta('2024-04-01'),
          } as ContentData,
        ],
        [
          'about',
          {
            id: 'about',
            title: '会社概要',
            body: ABOUT,
            status: 'published',
            menuOrder: 2,
            _meta: meta('2024-04-01'),
          } as ContentData,
        ],
        [
          'services',
          {
            id: 'services',
            title: '事業内容',
            body: SERVICES,
            status: 'published',
            menuOrder: 3,
            _meta: meta('2024-04-01'),
          } as ContentData,
        ],
        [
          'message',
          {
            id: 'message',
            title: '代表挨拶',
            body: MESSAGE,
            status: 'published',
            menuOrder: 4,
            _meta: meta('2024-04-01'),
          } as ContentData,
        ],
        [
          'recruit',
          {
            id: 'recruit',
            title: '採用情報',
            body: RECRUIT,
            status: 'published',
            menuOrder: 5,
            _meta: meta('2024-04-01'),
          } as ContentData,
        ],
        [
          'contact',
          {
            id: 'contact',
            title: 'お問い合わせ',
            body: CONTACT,
            status: 'published',
            menuOrder: 6,
            _meta: meta('2024-04-01'),
          } as ContentData,
        ],
        [
          'access',
          {
            id: 'access',
            title: 'アクセス',
            body: ACCESS,
            status: 'published',
            menuOrder: 7,
            _meta: meta('2024-04-01'),
          } as ContentData,
        ],
        [
          'privacy',
          {
            id: 'privacy',
            title: 'プライバシーポリシー',
            body: PRIVACY,
            status: 'published',
            menuOrder: 8,
            _meta: meta('2024-04-01'),
          } as ContentData,
        ],
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
