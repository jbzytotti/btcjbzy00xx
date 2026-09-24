import Link from 'next/link';
import { ArrowLeft, User, Mail, Facebook, Twitter } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | BTCJBZY News',
  description: 'Meet BTCJBZY News — an independent editorial desk covering digital assets, global markets, and personal finance with a clear, beginner-friendly voice.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#060a13] text-gray-100 flex flex-col font-sans">
      <header className="sticky top-0 bg-[#060a13]/90 backdrop-blur-xl border-b border-white/5 z-40 px-4 md:px-8 py-3">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="text-2xl font-extrabold tracking-tight text-white flex items-center gap-0.5 select-none" style={{ fontFamily: 'var(--font-display)' }}>
            <span className="text-amber-400">BTC</span>
            <span className="text-gray-500">JBZY</span>
            <span className="text-amber-500 bg-amber-500/10 px-1.5 py-0.5 rounded-md border border-amber-500/20 ml-0.5">NEWS</span>
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 md:px-8 py-12 flex-1">
        <section className="bg-[#0a1020] border border-white/5 rounded-2xl p-6 md:p-10 shadow-xl space-y-6">
          <Link href="/" className="flex items-center gap-2 text-gray-500 hover:text-amber-400 transition-all text-xs font-semibold">
            <ArrowLeft className="h-4 w-4" /> Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-2" style={{ fontFamily: 'var(--font-display)' }}>
            <User className="h-7 w-7 text-amber-400" /> About BTCJBZY News
          </h1>
          <div className="text-gray-300 space-y-4 text-sm leading-relaxed">
            <p>
              BTCJBZY News is an independent editorial publication focused on the stories behind the numbers. We cover digital currencies, global stock markets, real estate, and everyday personal finance — written so that newcomers and experienced readers alike can follow along without a finance degree.
            </p>
            <p>
              Our mission is simple: explain what is moving markets, why it matters, and what it might mean for your own decisions. Every article is researched, clearly structured, and grounded in the fundamentals rather than hype.
            </p>
            <p>
              We do not sell investment advice. We publish education, context, and analysis to help you think for yourself.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/15 text-gray-300 space-y-2 text-xs">
            <p className="font-bold text-amber-400 flex items-center gap-1.5">
              <Mail className="h-4 w-4" /> Support & Inquiries
            </p>
            <p className="text-gray-400">
              Questions, corrections, or feedback? Reach the editorial team at: <span className="text-amber-300 font-mono font-semibold">xwqisao8erzi.me@hotmail.com</span>
            </p>
            <p className="text-gray-500 text-[11px]" dir="rtl">
              لديك سؤال أو ملاحظة أو اقتراح تصحيح؟ راسل فريق التحرير مباشرة على: <span className="text-amber-300 font-mono font-semibold">xwqisao8erzi.me@hotmail.com</span>
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/15 text-gray-300 space-y-3 text-xs">
            <p className="font-bold text-amber-400 flex items-center gap-1.5">
              <ShareIcon /> Official Social Media / الحسابات الرسمية
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="https://www.facebook.com/profile.php?id=100077375229120" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-between p-3 rounded-lg bg-[#060a13] border border-white/5 hover:border-amber-500/20 text-gray-300 hover:text-white transition-all">
                <span className="flex items-center gap-2">
                  <Facebook className="h-4 w-4" /> Facebook Page
                </span>
                <span className="text-[10px] text-amber-400">Visit &rarr;</span>
              </a>
              <a href="https://x.com/jbzy2tech" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-between p-3 rounded-lg bg-[#060a13] border border-white/5 hover:border-amber-500/20 text-gray-300 hover:text-white transition-all">
                <span className="flex items-center gap-2">
                  <Twitter className="h-4 w-4" /> Twitter (X)
                </span>
                <span className="text-[10px] text-amber-400">Visit &rarr;</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#080d1a] border-t border-white/5 mt-20 py-8 px-4 md:px-8 text-center text-xs text-gray-600 font-mono">
        &copy; 2026 BTCJBZY News. All rights reserved.
      </footer>
    </div>
  );
}

function ShareIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3"></circle>
      <circle cx="6" cy="12" r="3"></circle>
      <circle cx="18" cy="19" r="3"></circle>
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
    </svg>
  );
}
