'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, FormEvent } from 'react';

export default function Header() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="border-b border-gray-200 bg-white shadow-sm sticky top-0 z-50">
      <div className="mx-auto max-w-[1200px] px-4">
        {/* トップバー */}
        <div className="flex h-10 items-center justify-end border-b border-gray-100 text-xs gap-4">
          <Link href="/about" className="text-gray-600 hover:text-gray-900">
            このサイトについて
          </Link>
          <Link href="/contact" className="text-gray-600 hover:text-gray-900">
            お問い合わせ
          </Link>
          <Link href="/newsletter" className="text-red-600 hover:text-red-700 font-bold">
            メルマガ登録
          </Link>
        </div>

        {/* メインヘッダー */}
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center">
            <h1 className="text-xl font-bold tracking-tight text-gray-900 md:text-2xl">
              コア・ランゲージ・ハブ
            </h1>
          </Link>

          {/* 検索バー */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-sm mx-6">
            <div className="relative w-full">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="キーワードで記事を検索"
                className="w-full rounded border border-gray-300 px-3 py-1.5 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </form>

          {/* 右側ボタン */}
          <div className="flex items-center gap-2 text-xs">
            {/* 削除: 重複リンクのため */}
          </div>
        </div>

        {/* ナビゲーションメニュー */}
        <nav className="flex h-11 items-center gap-0 overflow-x-auto border-t border-gray-100 text-sm font-medium">
          <Link href="/" className="whitespace-nowrap px-4 py-3 text-gray-700 hover:text-red-600 hover:bg-gray-50 transition-colors">
            トップ
          </Link>
          <Link href="/category/business-management" className="whitespace-nowrap px-4 py-3 text-gray-700 hover:text-red-600 hover:bg-gray-50 transition-colors">
            経営・事業推進
          </Link>
          <Link href="/category/ai-deep-learning" className="whitespace-nowrap px-4 py-3 text-gray-700 hover:text-red-600 hover:bg-gray-50 transition-colors">
            生成AI・コア技術
          </Link>
          <Link href="/category/backend-devops" className="whitespace-nowrap px-4 py-3 text-gray-700 hover:text-red-600 hover:bg-gray-50 transition-colors">
            Backend & DevOps
          </Link>
          <Link href="/category/data-engineering" className="whitespace-nowrap px-4 py-3 text-gray-700 hover:text-red-600 hover:bg-gray-50 transition-colors">
            Data Engineering
          </Link>
          <Link href="/category/modern-frontend" className="whitespace-nowrap px-4 py-3 text-gray-700 hover:text-red-600 hover:bg-gray-50 transition-colors">
            Modern Frontend
          </Link>
          <Link href="/category/infrastructure-network" className="whitespace-nowrap px-4 py-3 text-gray-700 hover:text-red-600 hover:bg-gray-50 transition-colors">
            インフラ・ネットワーク
          </Link>
          <Link href="/category/data-science" className="whitespace-nowrap px-4 py-3 text-gray-700 hover:text-red-600 hover:bg-gray-50 transition-colors">
            Data Science
          </Link>
          <Link href="/category/creative-domain" className="whitespace-nowrap px-4 py-3 text-gray-700 hover:text-red-600 hover:bg-gray-50 transition-colors">
            クリエイティブ・ドメイン
          </Link>
        </nav>
      </div>
    </header>
  );
}
