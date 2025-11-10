import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getPostBySlug, getPosts, getPopularPosts } from '@/lib/wordpress';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArticleCard from '@/components/ArticleCard';

export const revalidate = 60; // ISR: 60秒ごとに再生成

// 静的パス生成
export async function generateStaticParams() {
  const { posts } = await getPosts({ perPage: 100 });

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// パラメータの型定義
type PageParams = Promise<{ slug: string }>;

// メタデータ生成
export async function generateMetadata({ params }: { params: PageParams }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: '記事が見つかりません',
    };
  }

  return {
    title: post.title,
    description: post.excerpt.replace(/<[^>]*>/g, '').substring(0, 160),
  };
}

export default async function PostPage({ params }: { params: PageParams }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // 関連記事（人気記事）
  const relatedPosts = await getPopularPosts(3);

  // GraphQL形式のデータから取得
  const imageUrl = post.featuredImage?.node?.sourceUrl || '/placeholder-image.jpg';
  const categories = post.categories?.nodes || [];
  const mainCategory = categories[0];

  const formattedDate = new Date(post.date).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="mx-auto max-w-[1200px] px-4 py-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* メインコンテンツエリア */}
          <article className="lg:col-span-9">
            {/* パンくずリスト */}
            <nav className="mb-4 text-xs text-gray-500">
              <a href="/" className="hover:text-red-600">ホーム</a>
              {mainCategory && (
                <>
                  <span className="mx-2">›</span>
                  <a href={`/category/${mainCategory.slug}`} className="hover:text-red-600">
                    {mainCategory.name}
                  </a>
                </>
              )}
              <span className="mx-2">›</span>
              <span className="text-gray-900">{post.title}</span>
            </nav>

            {/* カテゴリーバッジ */}
            {mainCategory && (
              <span className="inline-block mb-3 rounded bg-red-600 px-3 py-1 text-xs font-bold text-white">
                {mainCategory.name}
              </span>
            )}

            {/* タイトル */}
            <h1 className="mb-4 text-2xl font-bold leading-tight text-gray-900 md:text-3xl">
              {post.title}
            </h1>

            {/* 公開日 */}
            <time className="mb-6 block text-sm text-gray-500">{formattedDate}</time>

            {/* アイキャッチ画像 */}
            <div className="relative mb-6 aspect-[16/9] overflow-hidden rounded">
              <Image
                src={imageUrl}
                alt={post.featuredImage?.node?.altText || post.title}
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                priority
                className="object-cover"
              />
            </div>

            {/* 記事本文 */}
            <div
              className="prose prose-lg max-w-none prose-headings:font-bold prose-h2:text-xl prose-h2:border-b prose-h2:border-gray-200 prose-h2:pb-2 prose-h2:mb-4 prose-p:mb-4 prose-p:leading-relaxed prose-a:text-red-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* CTA */}
            <div className="my-8 border-2 border-red-600 bg-red-50 p-6 text-center">
              <h3 className="mb-2 text-lg font-bold text-gray-900">
                メルマガ登録で最新情報をお届けします
              </h3>
              <p className="mb-4 text-sm text-gray-700">
                ビジネスに役立つフレームワークやマーケティングの知識を定期配信。今なら登録特典付き！
              </p>
              <a
                href="/newsletter"
                className="inline-block bg-red-600 px-8 py-3 text-sm font-bold text-white hover:bg-red-700 transition-colors"
              >
                メルマガに登録する
              </a>
            </div>

            {/* 関連記事 */}
            {relatedPosts.length > 0 && (
              <section className="mt-8">
                <h2 className="mb-4 border-b-2 border-red-600 pb-2 text-lg font-bold text-gray-900">
                  関連記事
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {relatedPosts.map((relatedPost) => (
                    <ArticleCard key={relatedPost.databaseId} post={relatedPost} layout="small" />
                  ))}
                </div>
              </section>
            )}
          </article>

          {/* サイドバー */}
          <aside className="lg:col-span-3">
            {/* 同じカテゴリーの記事や広告など */}
            <div className="border border-gray-200 bg-gray-100 p-4">
              <div className="aspect-[300/250] flex items-center justify-center bg-white text-gray-400 text-sm">
                広告枠
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
