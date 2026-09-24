import Link from 'next/link';
import { Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#080d1a] border-t border-white/5 mt-20 py-14 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
        <div className="md:col-span-5 space-y-5">
          <Link href="/" className="text-2xl font-extrabold tracking-tight text-white flex items-center gap-0.5" style={{ fontFamily: 'var(--font-display)' }}>
            <span className="text-amber-400">BTC</span>
            <span className="text-gray-500">JBZY</span>
            <span className="text-amber-500">NEWS</span>
          </Link>
          <p className="text-xs text-gray-500 leading-relaxed max-w-sm">
            Independent educational coverage of digital assets, global markets, real estate, and personal finance — written in plain language for beginners.
          </p>
          <div className="flex gap-2.5 pt-1 select-none">
            <a href="https://www.facebook.com/profile.php?id=100077375229120" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-gray-500 hover:text-white hover:border-amber-500/20 hover:bg-amber-500/5 transition-all flex items-center gap-1.5 text-xs font-semibold" title="Follow our Facebook Page">
              <Facebook className="h-4 w-4" />
              <span>Facebook</span>
            </a>
            <a href="https://x.com/jbzy2tech" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-gray-500 hover:text-white hover:border-amber-500/20 hover:bg-amber-500/5 transition-all flex items-center gap-1.5 text-xs font-semibold" title="Follow our Twitter (X)">
              <Twitter className="h-4 w-4" />
              <span>Twitter</span>
            </a>
          </div>
        </div>
        <div className="md:col-span-7 grid grid-cols-2 gap-6 md:justify-items-end">
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-gray-400 uppercase tracking-wider font-mono text-[10px]">Navigation</h4>
            <ul className="space-y-2.5 text-gray-500">
              <li><Link href="/" className="hover:text-amber-400 transition-colors">Market Watch</Link></li>
              <li><Link href="/about" className="hover:text-amber-400 transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-amber-400 transition-colors font-semibold">Contact Us</Link></li>
            </ul>
          </div>
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-gray-400 uppercase tracking-wider font-mono text-[10px]">Legal</h4>
            <ul className="space-y-2.5 text-gray-500">
              <li><Link href="/privacy" className="hover:text-amber-400 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto border-t border-white/5 pt-8 flex flex-wrap items-center justify-between gap-4 text-xs text-gray-600 font-mono select-none">
        <p>&copy; 2026 btcjbzynews. All rights reserved.</p>
        <div className="flex gap-4">
          <span>Powered by Next.js + Cloudflare</span>
        </div>
      </div>
    </footer>
  );
}
