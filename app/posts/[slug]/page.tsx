import { notFound } from 'next/navigation';
import Link from 'next/link';
import { marked } from 'marked';
import { getAllPosts, getPostMarkdown } from '@/lib/posts';
import { Calendar, Clock, User, ArrowLeft } from 'lucide-react';
import PostClientActions from '@/components/PostClientActions';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TickerRibbon from '@/components/TickerRibbon';
import Sidebar from '@/components/Sidebar';
import AdSlot from '@/components/AdSlot';

function getCategoryColor(cat: string) {
  const lower = cat.toLowerCase();
  if (lower === 'crypto') return { bg: 'bg-amber-500/10', border: 'border-amber-500/25', text: 'text-amber-400' };
  if (lower === 'investing') return { bg: 'bg-emerald-500/10', border: 'border-emerald-500/25', text: 'text-emerald-400' };
  if (lower === 'trading') return { bg: 'bg-blue-500/10', border: 'border-blue-500/25', text: 'text-blue-400' };
  if (lower === 'finance') return { bg: 'bg-purple-500/10', border: 'border-purple-500/25', text: 'text-purple-400' };
  return { bg: 'bg-gray-500/10', border: 'border-gray-500/25', text: 'text-gray-400' };
}

export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostMarkdown(slug);
  if (!post) return {};
  return {
    title: `${post.metadata.title || slug} | btcjbzynews`,
    description: post.metadata.description || 'Financial market analysis.',
    openGraph: {
      title: post.metadata.title || slug,
      description: post.metadata.description || '',
      images: post.metadata.image ? [post.metadata.image] : [],
    },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const postData = getPostMarkdown(slug);
  if (!postData) notFound();

  const { metadata, body } = postData;
  const htmlContent = await marked.parse(body);

  const posts = getAllPosts();
  const category = metadata.category || 'All';
  const relatedPosts = posts
    .filter(p => p.category.toLowerCase() === category.toLowerCase() && p.slug !== slug)
    .slice(0, 2);

  const colors = getCategoryColor(category);

  return (
    <div className="min-h-screen bg-[#060a13] text-gray-100 flex flex-col font-sans">
      <TickerRibbon />

      <header className="sticky top-0 bg-[#060a13]/90 backdrop-blur-xl border-b border-white/5 z-40 px-4 md:px-8 py-3 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-2xl font-extrabold tracking-tight text-white flex items-center gap-0.5 select-none" style={{ fontFamily: 'var(--font-display)' }} title="btcjbzynews Home">
            <span className="text-amber-400">BTC</span>
            <span className="text-gray-500">JBZY</span>
            <span className="text-amber-500 bg-amber-500/10 px-1.5 py-0.5 rounded-md border border-amber-500/20 ml-0.5">NEWS</span>
          </Link>
          <Link href="/" className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-white transition-all rounded-lg hover:bg-white/5">
            &larr; Back
          </Link>
        </div>
      </header>

      <section className="max-w-7xl mx-auto w-full px-4 md:px-8 pt-6 select-none">
        <AdSlot id="ad-header-banner" type="header" />
      </section>

      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-8 py-4 sm:py-8 flex-1 w-full grid grid-cols-12 gap-3 sm:gap-6 md:gap-8">
        <main className="col-span-7 sm:col-span-8 lg:col-span-8 flex flex-col">
          <article className="w-full">
            <Link
              href={`/?category=${encodeURIComponent(category)}`}
              className="flex items-center gap-2 text-gray-500 hover:text-amber-400 transition-all text-xs font-semibold mb-6 group bg-white/[0.02] px-3.5 py-2 rounded-full border border-white/5 w-fit"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to {category}
            </Link>

            <div className="space-y-6">
              <span className={`inline-block text-xs font-bold font-mono tracking-wider px-3 py-1 rounded-full border ${colors.bg} ${colors.border} ${colors.text}`}>
                {category}
              </span>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]" style={{ fontFamily: 'var(--font-display)' }}>
                {metadata.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 border-b border-white/5 pb-5">
                <span className="flex items-center gap-1.5 font-medium">
                  <Calendar className="h-3.5 w-3.5" />
                  {metadata.date || '2026-07-16'}
                </span>
                <span className="hidden sm:inline text-gray-700">&bull;</span>
                <span className="flex items-center gap-1.5 font-medium">
                  <Clock className="h-3.5 w-3.5" />
                  {metadata.read_time || '5 min read'}
                </span>
                <span className="hidden sm:inline text-gray-700">&bull;</span>
                <span className="flex items-center gap-1.5 font-medium">
                  <User className="h-3.5 w-3.5" />
                  btcjbzynews Intelligence
                </span>
              </div>

              {metadata.image && (
                <div className="relative rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
                  <img
                    src={metadata.image}
                    alt={metadata.title || ''}
                    className="w-full max-h-[460px] object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060a13]/40 via-transparent to-transparent" />
                </div>
              )}

              <div
                className="markdown-body text-gray-300 font-sans leading-relaxed tracking-normal"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />

              <PostClientActions />

              {relatedPosts.length > 0 && (
                <section className="border-t border-white/5 pt-10 mt-12">
                  <h3 className="text-xl font-bold text-white mb-6">Related Reports</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {relatedPosts.map(p => (
                      <Link
                        key={p.slug}
                        href={`/posts/${p.slug}`}
                        className="bg-[#0a1020] border border-white/5 rounded-xl overflow-hidden flex flex-col group hover:border-amber-500/15 transition-all"
                      >
                        {p.image && (
                          <img src={p.image} alt={p.title} className="h-36 w-full object-cover group-hover:scale-[1.02] transition-transform duration-300" referrerPolicy="no-referrer" />
                        )}
                        <div className="p-4 flex-1 flex flex-col justify-between">
                          <div>
                            <h4 className="text-sm font-bold text-gray-100 line-clamp-1 mb-2 group-hover:text-amber-400 transition-colors">{p.title}</h4>
                            <p className="text-xs text-gray-500 line-clamp-2 mb-4">{p.description}</p>
                          </div>
                          <span className="text-xs text-amber-400 font-bold flex items-center gap-1">Read &rarr;</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </article>
        </main>

        <aside className="col-span-5 sm:col-span-4 lg:col-span-4 space-y-4 sm:space-y-6">
          <AdSlot id="ad-sidebar-top" type="sidebar" />
          <Sidebar posts={posts} />
        </aside>
      </div>

      <Footer />
    </div>
  );
}
