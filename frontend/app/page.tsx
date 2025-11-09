import { getPosts, getCategories } from '@/lib/wordpress';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArticleCard from '@/components/ArticleCard';

export const revalidate = 60; // ISR: 60秒ごとに再生成

export default async function Home() {
  // 記事とカテゴリーを取得
  const { posts } = await getPosts({ perPage: 30 });
  const categories = await getCategories();

  // トップ記事（1件）
  const topPost = posts[0];

  // 特集記事（2-4件目）
  const featuredPosts = posts.slice(1, 4);

  // メイン記事（5-16件目）
  const mainPosts = posts.slice(4, 16);

  // ランキング記事（17-26件目）
  const rankingPosts = posts.slice(16, 26);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="mx-auto max-w-[1200px] px-4 py-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* メインコンテンツエリア */}
          <div className="lg:col-span-9">
            {/* トップ記事 */}
            {topPost && (
              <section className="mb-6">
                <ArticleCard post={topPost} layout="large" priority />
              </section>
            )}

            {/* 特集記事 */}
            <section className="mb-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {featuredPosts.map((post) => (
                  <ArticleCard key={post.id} post={post} layout="small" />
                ))}
              </div>
            </section>

            {/* セクション見出し */}
            <div className="mb-4 border-b-2 border-red-600 pb-2">
              <h2 className="text-lg font-bold text-gray-900">最新記事</h2>
            </div>

            {/* メイン記事グリッド */}
            <section className="mb-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {mainPosts.map((post) => (
                  <ArticleCard key={post.id} post={post} layout="medium" />
                ))}
              </div>
            </section>
          </div>

          {/* サイドバー */}
          <aside className="lg:col-span-3">
            <div className="space-y-6">
              {/* ランキング */}
              <div className="border border-gray-200 bg-white">
                <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
                  <h3 className="text-base font-bold text-gray-900">アクセスランキング</h3>
                </div>
                <div className="p-4 space-y-4">
                  {rankingPosts.slice(0, 10).map((post, index) => (
                    <ArticleCard
                      key={post.id}
                      post={post}
                      layout="list"
                      showImage={false}
                      rank={index + 1}
                    />
                  ))}
                </div>
              </div>

              {/* カテゴリー */}
              <div className="border border-gray-200 bg-white">
                <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
                  <h3 className="text-base font-bold text-gray-900">カテゴリー</h3>
                </div>
                <div className="p-4">
                  <ul className="space-y-2">
                    {categories.slice(0, 10).map((category) => (
                      <li key={category.id}>
                        <a
                          href={`/category/${category.slug}`}
                          className="flex items-center justify-between text-sm text-gray-700 hover:text-red-600 transition-colors"
                        >
                          <span>{category.name}</span>
                          <span className="text-xs text-gray-400">({category.count})</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* CTA */}
              <div className="border-2 border-red-600 bg-red-50 p-6">
                <h3 className="mb-2 text-base font-bold text-gray-900">
                  事業診断を受けてみる
                </h3>
                <p className="mb-4 text-sm text-gray-700 leading-relaxed">
                  15分で完了する無料診断で、あなたのビジネスを可視化。専用レポートをお届けします。
                </p>
                <a
                  href="/diagnosis"
                  className="block bg-red-600 py-3 text-center text-sm font-bold text-white hover:bg-red-700 transition-colors"
                >
                  無料診断を始める
                </a>
              </div>

              {/* バナー広告エリア */}
              <div className="border border-gray-200 bg-gray-100 p-4">
                <div className="aspect-[300/250] flex items-center justify-center bg-white text-gray-400 text-sm">
                  広告枠
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
