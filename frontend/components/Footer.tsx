import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-300 bg-gray-100 mt-12">
      <div className="mx-auto max-w-[1200px] px-4">
        {/* メインフッター */}
        <div className="grid grid-cols-2 gap-8 py-8 text-xs md:grid-cols-4">
          {/* コンテンツ */}
          <div>
            <h3 className="mb-3 font-bold text-gray-900">カテゴリー</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/category/business-management" className="text-gray-600 hover:text-red-600">
                  経営・事業推進
                </Link>
              </li>
              <li>
                <Link href="/category/ai-deep-learning" className="text-gray-600 hover:text-red-600">
                  生成AI・コア技術
                </Link>
              </li>
              <li>
                <Link href="/category/backend-devops" className="text-gray-600 hover:text-red-600">
                  Backend & DevOps
                </Link>
              </li>
              <li>
                <Link href="/category/data-engineering" className="text-gray-600 hover:text-red-600">
                  Data Engineering
                </Link>
              </li>
              <li>
                <Link href="/category/modern-frontend" className="text-gray-600 hover:text-red-600">
                  Modern Frontend
                </Link>
              </li>
              <li>
                <Link href="/category/infrastructure-network" className="text-gray-600 hover:text-red-600">
                  インフラ・ネットワーク
                </Link>
              </li>
              <li>
                <Link href="/category/data-science" className="text-gray-600 hover:text-red-600">
                  Data Science
                </Link>
              </li>
              <li>
                <Link href="/category/creative-domain" className="text-gray-600 hover:text-red-600">
                  クリエイティブ・ドメイン
                </Link>
              </li>
            </ul>
          </div>

          {/* サービス */}
          <div>
            <h3 className="mb-3 font-bold text-gray-900">サービス</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/diagnosis" className="text-gray-600 hover:text-red-600">
                  事業診断
                </Link>
              </li>
              <li>
                <Link href="/report" className="text-gray-600 hover:text-red-600">
                  レポート作成
                </Link>
              </li>
              <li>
                <Link href="/consulting" className="text-gray-600 hover:text-red-600">
                  コンサルティング
                </Link>
              </li>
            </ul>
          </div>

          {/* 会社案内 */}
          <div>
            <h3 className="mb-3 font-bold text-gray-900">運営について</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-red-600">
                  このサイトについて
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-red-600">
                  お問い合わせ
                </Link>
              </li>
              <li>
                <Link href="/company" className="text-gray-600 hover:text-red-600">
                  運営会社
                </Link>
              </li>
            </ul>
          </div>

          {/* 利用規約等 */}
          <div>
            <h3 className="mb-3 font-bold text-gray-900">規約・ポリシー</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-red-600">
                  プライバシーポリシー
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-red-600">
                  利用規約
                </Link>
              </li>
              <li>
                <Link href="/law" className="text-gray-600 hover:text-red-600">
                  特定商取引法
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* ソーシャルメディア & コピーライト */}
        <div className="border-t border-gray-300 py-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex gap-4">
              <a href="#" className="text-gray-500 hover:text-gray-700">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
            </div>
            <p className="text-xs text-gray-500">
              &copy; {currentYear} コア・ランゲージ・ハブ. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
