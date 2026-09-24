import Link from 'next/link';
import { Calendar } from 'lucide-react';
import { Post } from '@/lib/posts';

function getCategoryColor(cat: string) {
  const lower = cat.toLowerCase();
  if (lower === 'crypto') return { bg: 'bg-amber-500/10', border: 'border-amber-500/25', text: 'text-amber-400' };
  if (lower === 'investing') return { bg: 'bg-emerald-500/10', border: 'border-emerald-500/25', text: 'text-emerald-400' };
  if (lower === 'trading') return { bg: 'bg-blue-500/10', border: 'border-blue-500/25', text: 'text-blue-400' };
  if (lower === 'finance') return { bg: 'bg-purple-500/10', border: 'border-purple-500/25', text: 'text-purple-400' };
  return { bg: 'bg-gray-500/10', border: 'border-gray-500/25', text: 'text-gray-400' };
}

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const colors = getCategoryColor(post.category);

  return (
    <Link
      href={`/posts/${post.slug}`}
      className="bg-[#0a1020] border border-white/5 hover:border-amber-500/15 rounded-xl overflow-hidden group shadow-lg hover:shadow-amber-500/[0.03] flex flex-col h-full transition-all duration-300"
    >
      <div className="relative h-44 overflow-hidden bg-[#080d1a]">
        {post.image && (
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
        )}
        <span className={`absolute top-3 left-3 text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-md border ${colors.bg} ${colors.border} ${colors.text} shadow-lg backdrop-blur-md`}>
          {post.category}
        </span>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-2 leading-snug">
            {post.title}
          </h3>
          <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
            {post.description}
          </p>
        </div>

        <div className="pt-4 border-t border-white/5 mt-5 flex items-center justify-between text-[10px] text-gray-600 font-mono">
          <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {post.date}</span>
          <span className="text-amber-400 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-0.5">Read &rarr;</span>
        </div>
      </div>
    </Link>
  );
}
