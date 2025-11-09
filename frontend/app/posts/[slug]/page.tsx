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

// メタデータ生成
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return {
      title: '記事が見つかりません',
    };
  }

  return {
    title: post.title.rendered,
    description: post.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 160),
  };
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  // 関連記事（人気記事）
  const relatedPosts = await getPopularPosts(3);

  const imageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder-image.jpg';
  const categories = post._embedded?.['wp:term']?.[0] || [];
  const mainCategory = categories[0];

  const formattedDate = new Date(post.date).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <article className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* パンくずリスト */}
        <nav className="mb-6 text-sm text-gray-600">
          <a href="/" className="hover:text-blue-600">
            ホーム
          </a>
          {mainCategory && (
            <>
              <span className="mx-2">&gt;</span>
              <a href={`/category/${mainCategory.slug}`} className="hover:text-blue-600">
                {mainCategory.name}
              </a>
            </>
          )}
          <span className="mx-2">&gt;</span>
          <span className="text-gray-900">記事</span>
        </nav>

        {/* 記事ヘッダー */}
        <header className="mb-8">
          {/* カテゴリーバッジ */}
          {mainCategory && (
            <span className="mb-3 inline-block rounded bg-blue-600 px-3 py-1 text-sm font-bold text-white">
              {mainCategory.name}
            </span>
          )}

          {/* タイトル */}
          <h1
            className="mb-4 text-3xl font-bold leading-tight text-gray-900 md:text-4xl"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />

          {/* メタ情報 */}
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <time>{formattedDate}</time>
          </div>
        </header>

        {/* アイキャッチ画像 */}
        <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-lg">
          <Image src={imageUrl} alt={post.title.rendered} fill priority className="object-cover" />
        </div>

        {/* 記事本文 */}
        <div className="mb-12 rounded-lg bg-white p-6 shadow-sm md:p-8">
          <div
            className="prose prose-lg max-w-none
              prose-headings:font-bold prose-headings:text-gray-900
              prose-h2:mb-4 prose-h2:mt-8 prose-h2:text-2xl prose-h2:border-b prose-h2:border-gray-200 prose-h2:pb-2
              prose-h3:mb-3 prose-h3:mt-6 prose-h3:text-xl
              prose-p:mb-4 prose-p:leading-relaxed prose-p:text-gray-700
              prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
              prose-strong:font-bold prose-strong:text-gray-900
              prose-ul:my-4 prose-ul:list-disc prose-ul:pl-6
              prose-ol:my-4 prose-ol:list-decimal prose-ol:pl-6
              prose-li:mb-2
              prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:italic
              prose-img:rounded-lg prose-img:shadow-md
              prose-code:rounded prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:text-sm prose-code:text-pink-600
              prose-pre:rounded-lg prose-pre:bg-gray-900 prose-pre:p-4"
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />
        </div>

        {/* CTA */}
        <div className="mb-12 rounded-lg border-2 border-blue-600 bg-blue-50 p-8 text-center">
          <h2 className="mb-2 text-2xl font-bold text-gray-900">あなたの事業を診断してみませんか?</h2>
          <p className="mb-6 text-gray-700">
            15分で完了する無料診断で、事業の現状を可視化し、オリジナルのリーンキャンバスを作成します。
          </p>
          <a
            href="/diagnosis"
            className="inline-block rounded-full bg-blue-600 px-8 py-4 text-lg font-bold text-white transition-transform hover:scale-105 hover:bg-blue-700"
          >
            無料診断を始める →
          </a>
        </div>

        {/* 関連記事 */}
        {relatedPosts.length > 0 && (
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">関連記事</h2>
            <div className="grid gap-6 sm:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <ArticleCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          </section>
        )}
      </article>

      <Footer />
    </div>
  );
}
